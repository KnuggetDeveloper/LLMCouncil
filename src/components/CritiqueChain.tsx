"use client";

import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
  useTransition,
  memo,
} from "react";
import { useModels } from "@/context/ModelsContext";
import { FileAttachment } from "../../types";
import FollowUpInput from "./FollowUpInput";
import FileUpload from "./FileUpload";
import { MemoizedMarkdown } from "./VirtualizedConversation";
import {
  reconstructCritiqueChainHistory,
  Message,
  getLatestTurnNumber,
} from "@/lib/conversation-utils";

// Convert FileAttachment to API format
function convertAttachmentsForAPI(attachments: FileAttachment[]) {
  return attachments.map((att) => {
    if (att.type === "image") {
      return {
        type: "image" as const,
        data: att.data,
        mimeType: att.mimeType,
      };
    } else {
      return {
        type: "pdf" as const,
        data: att.base64 || att.data,
        name: att.name,
      };
    }
  });
}

interface StepResponse {
  content: string;
  isLoading: boolean;
  error?: string;
}

interface ConversationTurn {
  question: string;
  primaryResponse: StepResponse;
  critiqueResponses: Record<string, StepResponse>;
  reviewResponse: StepResponse | null;
  turnNumber?: number;
}

type WorkflowStep = "idle" | "primary" | "critique" | "review" | "complete";

interface CritiqueChainProps {
  projectContext?: string;
  onSaveMessage?: (
    role: string,
    content: string,
    modelUsed?: string,
    metadata?: Record<string, unknown>,
    turnNumber?: number
  ) => Promise<void>;
  threadId?: string;
}

// Debounce hook for streaming updates
function useStreamingDebounce<T>(initialValue: T, debounceMs: number = 50) {
  const [value, setValue] = useState<T>(initialValue);
  const [displayValue, setDisplayValue] = useState<T>(initialValue);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const latestValueRef = useRef<T>(initialValue);

  const setValueDebounced = useCallback(
    (newValue: T | ((prev: T) => T)) => {
      const resolvedValue =
        typeof newValue === "function"
          ? (newValue as (prev: T) => T)(latestValueRef.current)
          : newValue;

      latestValueRef.current = resolvedValue;
      setValue(resolvedValue);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setDisplayValue(resolvedValue);
      }, debounceMs);
    },
    [debounceMs]
  );

  const flush = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setDisplayValue(latestValueRef.current);
  }, []);

  const reset = useCallback((newValue: T) => {
    latestValueRef.current = newValue;
    setValue(newValue);
    setDisplayValue(newValue);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { value, displayValue, setValue: setValueDebounced, flush, reset };
}

// Memoized Response Card
const ResponseCard = memo(
  function ResponseCard({
    title,
    subtitle,
    response,
    colorClass,
    stepNumber,
    compact,
  }: {
    title: string;
    subtitle: string;
    response: StepResponse | undefined;
    colorClass: "blue" | "amber" | "purple";
    stepNumber?: number;
    compact?: boolean;
  }) {
    const colors = {
      blue: {
        bg: "from-blue-900/30 to-blue-800/20",
        border: "border-blue-500/30",
        header: "bg-blue-900/20",
        accent: "text-blue-400",
        step: "bg-blue-600",
      },
      amber: {
        bg: "from-amber-900/30 to-amber-800/20",
        border: "border-amber-500/30",
        header: "bg-amber-900/20",
        accent: "text-amber-400",
        step: "bg-amber-600",
      },
      purple: {
        bg: "from-purple-900/30 to-purple-800/20",
        border: "border-purple-500/30",
        header: "bg-purple-900/20",
        accent: "text-purple-400",
        step: "bg-purple-600",
      },
    };
    const c = colors[colorClass];
    if (!response) return null;

    return (
      <div
        className={`bg-linear-to-br ${c.bg} rounded-2xl border ${c.border} overflow-hidden`}
      >
        <div
          className={`flex items-center gap-3 px-4 py-3 ${c.header} border-b ${c.border}`}
        >
          {stepNumber && (
            <span
              className={`w-6 h-6 rounded-full ${c.step} flex items-center justify-center text-xs font-bold text-white`}
            >
              {stepNumber}
            </span>
          )}
          <div className="flex-1 min-w-0">
            <span className="font-semibold text-white truncate">{title}</span>
            <span className={`ml-2 text-xs ${c.accent}`}>{subtitle}</span>
          </div>
          {response.isLoading && (
            <div className="flex gap-1">
              <div
                className={`w-2 h-2 ${c.step} rounded-full animate-bounce [animation-delay:-0.3s]`}
              />
              <div
                className={`w-2 h-2 ${c.step} rounded-full animate-bounce [animation-delay:-0.15s]`}
              />
              <div
                className={`w-2 h-2 ${c.step} rounded-full animate-bounce`}
              />
            </div>
          )}
        </div>
        <div
          className={`p-4 ${
            compact ? "max-h-[250px]" : "max-h-[500px]"
          } overflow-y-auto`}
        >
          {response.error ? (
            <div className="flex items-start gap-3 text-red-400">
              <svg
                className="w-5 h-5 mt-0.5 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-sm">{response.error}</span>
            </div>
          ) : response.content ? (
            <MemoizedMarkdown content={response.content} />
          ) : response.isLoading ? (
            <div className="text-gray-500 text-sm italic">Thinking...</div>
          ) : (
            <div className="text-gray-600 text-sm italic">Waiting...</div>
          )}
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison for memoization
    return (
      prevProps.title === nextProps.title &&
      prevProps.subtitle === nextProps.subtitle &&
      prevProps.colorClass === nextProps.colorClass &&
      prevProps.stepNumber === nextProps.stepNumber &&
      prevProps.compact === nextProps.compact &&
      prevProps.response?.content === nextProps.response?.content &&
      prevProps.response?.isLoading === nextProps.response?.isLoading &&
      prevProps.response?.error === nextProps.response?.error
    );
  }
);

// Memoized history turn
const MemoizedHistoryTurn = memo(
  function MemoizedHistoryTurn({
    turn,
    index,
    primaryModel,
    reviewerModel,
    getModelDisplayName,
  }: {
    turn: ConversationTurn;
    index: number;
    primaryModel: string;
    reviewerModel: string;
    getModelDisplayName: (modelId: string) => string;
  }) {
    const respondedCritiqueModels = useMemo(
      () => Object.keys(turn.critiqueResponses),
      [turn.critiqueResponses]
    );

    return (
      <div className="mb-8 pb-6 border-b border-gray-800">
        <div className="mb-4 px-4 py-2 bg-purple-900/30 rounded-lg inline-block">
          <span className="text-xs text-purple-400">
            Turn {turn.turnNumber || index + 1}:
          </span>
          <span className="ml-2 text-gray-300">{turn.question}</span>
        </div>
        <ResponseCard
          title="Primary Response"
          subtitle={getModelDisplayName(primaryModel)}
          response={turn.primaryResponse}
          colorClass="blue"
          stepNumber={1}
          compact
        />
        {respondedCritiqueModels.length > 0 && (
          <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-3">
            {respondedCritiqueModels.map((modelId) => (
              <ResponseCard
                key={modelId}
                title={getModelDisplayName(modelId)}
                subtitle={modelId.split("/")[0]}
                response={turn.critiqueResponses[modelId]}
                colorClass="amber"
                compact
              />
            ))}
          </div>
        )}
        {turn.reviewResponse && (
          <div className="mt-4">
            <ResponseCard
              title="Final Review"
              subtitle={getModelDisplayName(reviewerModel)}
              response={turn.reviewResponse}
              colorClass="purple"
              stepNumber={3}
              compact
            />
          </div>
        )}
      </div>
    );
  },
  (prevProps, nextProps) => {
    const prevTurn = prevProps.turn;
    const nextTurn = nextProps.turn;

    if (prevTurn.question !== nextTurn.question) return false;
    if (prevTurn.primaryResponse.content !== nextTurn.primaryResponse.content)
      return false;
    if (prevTurn.reviewResponse?.content !== nextTurn.reviewResponse?.content)
      return false;

    const prevCritiqueKeys = Object.keys(prevTurn.critiqueResponses);
    const nextCritiqueKeys = Object.keys(nextTurn.critiqueResponses);
    if (prevCritiqueKeys.length !== nextCritiqueKeys.length) return false;

    for (const key of prevCritiqueKeys) {
      if (
        prevTurn.critiqueResponses[key]?.content !==
        nextTurn.critiqueResponses[key]?.content
      )
        return false;
    }

    return true;
  }
);

// Collapsed history turn for windowing
const CollapsedHistoryTurn = memo(function CollapsedHistoryTurn({
  turn,
  index,
  onExpand,
}: {
  turn: ConversationTurn;
  index: number;
  onExpand: (index: number) => void;
}) {
  const critiqueCount = Object.keys(turn.critiqueResponses).length;

  return (
    <div
      className="mb-2 px-4 py-3 bg-gray-800/30 rounded-lg cursor-pointer hover:bg-gray-800/50 transition-colors border border-gray-700/50"
      onClick={() => onExpand(index)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <span className="text-xs text-gray-500">
            Turn {turn.turnNumber || index + 1}
          </span>
          <span className="text-gray-400 truncate">{turn.question}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-gray-500">
            {critiqueCount} critiques
          </span>
          <svg
            className="w-4 h-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
});

function Step({
  label,
  active,
  complete,
}: {
  label: string;
  active: boolean;
  complete: boolean;
}) {
  return (
    <div
      className={`px-3 py-1 rounded-full text-xs font-medium ${
        complete
          ? "bg-green-600/20 text-green-400 border border-green-500/30"
          : active
          ? "bg-purple-600/20 text-purple-400 border border-purple-500/30 animate-pulse"
          : "bg-gray-800 text-gray-500 border border-gray-700"
      }`}
    >
      {complete ? "✓ " : active ? "● " : ""}
      {label}
    </div>
  );
}

function Arrow() {
  return (
    <svg
      className="w-4 h-4 text-gray-600"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  );
}

export default function CritiqueChain({
  projectContext = "",
  onSaveMessage,
  threadId,
}: CritiqueChainProps) {
  const { apiKey, primaryModel, critiqueModels, reviewerModel } = useModels();
  const [question, setQuestion] = useState("");
  const [attachments, setAttachments] = useState<FileAttachment[]>([]);
  const [currentStep, setCurrentStep] = useState<WorkflowStep>("idle");
  const [completedCritiques, setCompletedCritiques] = useState<Set<string>>(
    new Set()
  );
  const [conversationHistory, setConversationHistory] = useState<
    ConversationTurn[]
  >([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [currentTurnNumber, setCurrentTurnNumber] = useState(0);
  const [expandedTurns, setExpandedTurns] = useState<Set<number>>(new Set());
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isPending, startTransition] = useTransition();

  // Debounced streaming states
  const {
    value: primaryResponse,
    displayValue: displayPrimaryResponse,
    setValue: setPrimaryResponse,
    flush: flushPrimary,
    reset: resetPrimary,
  } = useStreamingDebounce<StepResponse | null>(null, 50);

  const {
    value: critiqueResponses,
    displayValue: displayCritiqueResponses,
    setValue: setCritiqueResponses,
    flush: flushCritiques,
    reset: resetCritiques,
  } = useStreamingDebounce<Record<string, StepResponse>>({}, 50);

  const {
    value: reviewResponse,
    displayValue: displayReviewResponse,
    setValue: setReviewResponse,
    flush: flushReview,
    reset: resetReview,
  } = useStreamingDebounce<StepResponse | null>(null, 50);

  // Window size for history virtualization
  const WINDOW_SIZE = 10;

  // Load messages when thread changes
  useEffect(() => {
    const loadThreadMessages = async () => {
      if (!threadId) {
        setConversationHistory([]);
        resetPrimary(null);
        resetCritiques({});
        resetReview(null);
        setCurrentQuestion("");
        setQuestion("");
        setAttachments([]);
        setCurrentTurnNumber(0);
        setCurrentStep("idle");
        return;
      }

      setIsLoadingHistory(true);
      try {
        const response = await fetch(`/api/threads/${threadId}/messages`);
        if (response.ok) {
          const data = await response.json();
          const messages: Message[] = data.messages.map(
            (m: Record<string, unknown>) => ({
              ...m,
              createdAt: new Date(m.createdAt as string | number),
            })
          );

          if (messages.length > 0) {
            const history = reconstructCritiqueChainHistory(messages);
            const latestTurn = getLatestTurnNumber(messages);
            setCurrentTurnNumber(latestTurn);

            const convertedHistory: ConversationTurn[] = history.map(
              (turn) => ({
                question: turn.question,
                primaryResponse: turn.primaryResponse,
                critiqueResponses: turn.critiqueResponses,
                reviewResponse: turn.reviewResponse,
                turnNumber: turn.turnNumber,
              })
            );

            if (convertedHistory.length > 0) {
              startTransition(() => {
                setConversationHistory(convertedHistory);
              });
              resetPrimary(null);
              resetCritiques({});
              resetReview(null);
              setCurrentQuestion("");
              setCurrentStep("idle");
            }
          } else {
            setConversationHistory([]);
            setCurrentTurnNumber(0);
          }
        }
      } catch (error) {
        console.error("Failed to load thread messages:", error);
      }
      setIsLoadingHistory(false);
    };

    loadThreadMessages();
  }, [threadId, resetPrimary, resetCritiques, resetReview]);

  const adjustTextareaHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  }, []);

  useEffect(() => {
    adjustTextareaHeight();
  }, [question, adjustTextareaHeight]);

  // Memoized conversation context builder
  const conversationContextMemo = useMemo(() => {
    if (conversationHistory.length === 0) return "";

    let context = "## Previous Conversation\n\n";
    // Limit to last N turns for context
    const recentHistory = conversationHistory.slice(-5);

    recentHistory.forEach((turn, index) => {
      const actualIndex =
        conversationHistory.length - recentHistory.length + index;
      context += `### Turn ${actualIndex + 1}\n`;
      context += `**Question:** ${turn.question}\n\n`;

      // Truncate long responses
      const primaryTruncated =
        turn.primaryResponse.content.length > 1500
          ? turn.primaryResponse.content.slice(0, 1500) + "... [truncated]"
          : turn.primaryResponse.content;
      context += `**Primary Response (${primaryModel}):** ${primaryTruncated}\n\n`;

      Object.entries(turn.critiqueResponses).forEach(([modelId, response]) => {
        if (response.content && !response.error) {
          const truncated =
            response.content.length > 1000
              ? response.content.slice(0, 1000) + "... [truncated]"
              : response.content;
          context += `**Critique from ${modelId}:** ${truncated}\n\n`;
        }
      });

      if (turn.reviewResponse?.content) {
        const truncated =
          turn.reviewResponse.content.length > 1000
            ? turn.reviewResponse.content.slice(0, 1000) + "... [truncated]"
            : turn.reviewResponse.content;
        context += `**Final Review:** ${truncated}\n\n`;
      }
      context += "---\n\n";
    });
    return context;
  }, [conversationHistory, primaryModel]);

  const streamResponse = useCallback(
    async (
      prompt: string,
      modelId: string,
      onUpdate: (content: string, isLoading: boolean) => void,
      onComplete: (content: string) => void,
      onError: (error: string) => void,
      queryAttachments?: FileAttachment[]
    ) => {
      try {
        const apiAttachments =
          queryAttachments && queryAttachments.length > 0
            ? convertAttachmentsForAPI(queryAttachments)
            : undefined;

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: prompt,
            modelId,
            apiKey,
            attachments: apiAttachments,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          onError(errorData.error || "Request failed");
          return;
        }

        const reader = response.body?.getReader();
        if (!reader) throw new Error("No response reader");

        const decoder = new TextDecoder();
        let fullContent = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") continue;
              try {
                const parsed = JSON.parse(data);
                const content = parsed.choices?.[0]?.delta?.content || "";
                if (content) {
                  fullContent += content;
                  onUpdate(fullContent, true);
                }
              } catch {
                /* Skip */
              }
            }
          }
        }

        onComplete(fullContent);
      } catch (error) {
        onError(error instanceof Error ? error.message : "Unknown error");
      }
    },
    [apiKey]
  );

  const runCritiques = useCallback(
    async (
      originalQuestion: string,
      primaryAnswer: string,
      conversationContext: string,
      turnNumber: number
    ) => {
      setCurrentStep("critique");
      setCompletedCritiques(new Set());

      const critiquePrompt = () =>
        `You are a critical reviewer.

${projectContext}
${conversationContext}

**Question:** ${originalQuestion}

**Response from ${primaryModel}:**
${primaryAnswer}

---

Please provide a thorough critique:
1. **Accuracy**: Is the information factually correct?
2. **Completeness**: Does it fully address the question?
3. **Reasoning**: Is the logic sound?
4. **Clarity**: Is it well-explained?
5. **Overall Assessment**: Rate and summarize.`;

      const initialResponses: Record<string, StepResponse> = {};
      critiqueModels.forEach((model) => {
        initialResponses[model.id] = { content: "", isLoading: true };
      });
      resetCritiques(initialResponses);

      critiqueModels.forEach((model) => {
        streamResponse(
          critiquePrompt(),
          model.id,
          (content) => {
            setCritiqueResponses((prev) => ({
              ...prev,
              [model.id]: { ...prev[model.id], content, isLoading: true },
            }));
          },
          async (content) => {
            setCritiqueResponses((prev) => ({
              ...prev,
              [model.id]: { ...prev[model.id], content, isLoading: false },
            }));
            flushCritiques();
            setCompletedCritiques((prev) => new Set([...prev, model.id]));
            if (onSaveMessage)
              await onSaveMessage(
                "critique",
                content,
                model.id,
                undefined,
                turnNumber
              );
          },
          (error) => {
            setCritiqueResponses((prev) => ({
              ...prev,
              [model.id]: { content: "", isLoading: false, error },
            }));
            flushCritiques();
            setCompletedCritiques((prev) => new Set([...prev, model.id]));
          }
        );
      });
    },
    [
      critiqueModels,
      primaryModel,
      projectContext,
      streamResponse,
      onSaveMessage,
      setCritiqueResponses,
      resetCritiques,
      flushCritiques,
    ]
  );

  const runReview = useCallback(
    async (
      originalQuestion: string,
      primaryAnswer: string,
      conversationContext: string,
      turnNumber: number
    ) => {
      if (!reviewerModel) {
        setCurrentStep("complete");
        return;
      }

      setCurrentStep("review");
      resetReview({ content: "", isLoading: true });

      const critiqueSummary = Object.entries(critiqueResponses)
        .filter(([, r]) => r.content && !r.error)
        .map(([modelId, r]) => `### Critique from ${modelId}\n${r.content}`)
        .join("\n\n---\n\n");

      const reviewPrompt = `You are a senior reviewer synthesizing multiple critiques.

${projectContext}
${conversationContext}

**Question:** ${originalQuestion}

**Primary Response from ${primaryModel}:**
${primaryAnswer}

---

**Critiques:**

${critiqueSummary}

---

Please provide:
1. **Consensus Points**: What do critics agree on?
2. **Key Disagreements**: Where do they differ?
3. **Validity**: Are critiques fair?
4. **Final Verdict**: Your assessment.
5. **Improvements**: What should change?`;

      streamResponse(
        reviewPrompt,
        reviewerModel,
        (content) => {
          setReviewResponse((prev) =>
            prev ? { ...prev, content, isLoading: true } : null
          );
        },
        async (content) => {
          setReviewResponse((prev) =>
            prev ? { ...prev, content, isLoading: false } : null
          );
          flushReview();
          setCurrentStep("complete");
          if (onSaveMessage)
            await onSaveMessage(
              "review",
              content,
              reviewerModel,
              undefined,
              turnNumber
            );
        },
        (error) => {
          setReviewResponse({ content: "", isLoading: false, error });
          flushReview();
          setCurrentStep("complete");
        }
      );
    },
    [
      reviewerModel,
      critiqueResponses,
      primaryModel,
      projectContext,
      streamResponse,
      onSaveMessage,
      setReviewResponse,
      resetReview,
      flushReview,
    ]
  );

  useEffect(() => {
    if (
      currentStep === "critique" &&
      critiqueModels.length > 0 &&
      completedCritiques.size === critiqueModels.length &&
      primaryResponse?.content
    ) {
      runReview(
        currentQuestion,
        primaryResponse.content,
        conversationContextMemo,
        currentTurnNumber
      );
    }
  }, [
    currentStep,
    completedCritiques.size,
    critiqueModels.length,
    primaryResponse,
    currentQuestion,
    runReview,
    conversationContextMemo,
    currentTurnNumber,
  ]);

  const runCritiqueChain = useCallback(
    async (
      queryQuestion: string,
      isFollowUp: boolean = false,
      queryAttachments: FileAttachment[] = []
    ) => {
      if (!queryQuestion.trim() || !apiKey || !primaryModel) return;

      const newTurnNumber = currentTurnNumber + 1;

      if (isFollowUp && currentQuestion && primaryResponse?.content) {
        startTransition(() => {
          setConversationHistory((prev) => [
            ...prev,
            {
              question: currentQuestion,
              primaryResponse: { ...primaryResponse },
              critiqueResponses: { ...critiqueResponses },
              reviewResponse: reviewResponse ? { ...reviewResponse } : null,
              turnNumber: currentTurnNumber,
            },
          ]);
        });
      }

      setCurrentStep("primary");
      resetPrimary({ content: "", isLoading: true });
      resetCritiques({});
      resetReview(null);
      setCompletedCritiques(new Set());
      setCurrentQuestion(queryQuestion);
      setCurrentTurnNumber(newTurnNumber);

      if (onSaveMessage)
        await onSaveMessage(
          "user",
          queryQuestion,
          undefined,
          undefined,
          newTurnNumber
        );

      let conversationContext = isFollowUp ? conversationContextMemo : "";

      if (isFollowUp && currentQuestion && primaryResponse?.content) {
        conversationContext += `### Current Turn\n`;
        conversationContext += `**Question:** ${currentQuestion}\n\n`;
        conversationContext += `**Primary Response (${primaryModel}):** ${primaryResponse.content}\n\n`;
        Object.entries(critiqueResponses).forEach(([modelId, response]) => {
          if (response.content && !response.error) {
            conversationContext += `**Critique from ${modelId}:** ${response.content}\n\n`;
          }
        });
        if (reviewResponse?.content) {
          conversationContext += `**Final Review:** ${reviewResponse.content}\n\n`;
        }
        conversationContext += "---\n\n";
      }

      const messageWithContext = `${projectContext}${conversationContext}${
        isFollowUp ? "**Follow-up Question:** " : "**Question:** "
      }${queryQuestion}\n\nPlease answer the question.`;

      // Pass attachments only to primary model (critics and reviewers analyze text)
      streamResponse(
        messageWithContext,
        primaryModel,
        (content) => {
          setPrimaryResponse((prev) =>
            prev ? { ...prev, content, isLoading: true } : null
          );
        },
        async (content) => {
          setPrimaryResponse((prev) =>
            prev ? { ...prev, content, isLoading: false } : null
          );
          flushPrimary();
          if (onSaveMessage)
            await onSaveMessage(
              "assistant",
              content,
              primaryModel,
              undefined,
              newTurnNumber
            );
          if (critiqueModels.length > 0) {
            runCritiques(
              queryQuestion,
              content,
              conversationContext,
              newTurnNumber
            );
          } else {
            setCurrentStep("complete");
          }
        },
        (error) => {
          setPrimaryResponse({ content: "", isLoading: false, error });
          flushPrimary();
          setCurrentStep("complete");
        },
        queryAttachments // Pass attachments to primary model
      );
    },
    [
      apiKey,
      primaryModel,
      critiqueModels,
      projectContext,
      streamResponse,
      runCritiques,
      conversationContextMemo,
      currentQuestion,
      primaryResponse,
      critiqueResponses,
      reviewResponse,
      onSaveMessage,
      currentTurnNumber,
      setPrimaryResponse,
      resetPrimary,
      resetCritiques,
      resetReview,
      flushPrimary,
    ]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!question.trim()) return;

      const hasExistingHistory = conversationHistory.length > 0;

      if (!hasExistingHistory) {
        setConversationHistory([]);
      }

      runCritiqueChain(question, hasExistingHistory, attachments);
      setQuestion("");
      setAttachments([]); // Clear attachments after submission
    },
    [question, runCritiqueChain, conversationHistory.length, attachments]
  );

  const handleFollowUp = useCallback(
    (followUpQuestion: string) => runCritiqueChain(followUpQuestion, true, []),
    [runCritiqueChain]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const getModelDisplayName = useCallback((modelId: string) => {
    const parts = modelId.split("/");
    return parts[parts.length - 1]
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }, []);

  const toggleExpandTurn = useCallback((index: number) => {
    setExpandedTurns((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }, []);

  const isConfigured = apiKey && primaryModel;
  const isCurrentTurnComplete = currentStep === "complete";

  // Calculate visible range for windowing
  const visibleRange = useMemo(() => {
    const total = conversationHistory.length;
    if (total <= WINDOW_SIZE) {
      return { start: 0, end: total };
    }
    return { start: total - WINDOW_SIZE, end: total };
  }, [conversationHistory.length]);

  if (isLoadingHistory) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading conversation history...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a question to start the critique chain..."
            rows={1}
            className="w-full px-6 py-4 pr-16 bg-gray-900 border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg resize-none overflow-hidden min-h-[60px]"
            disabled={currentStep !== "idle" && currentStep !== "complete"}
          />
          <button
            type="submit"
            disabled={
              !isConfigured ||
              !question.trim() ||
              (currentStep !== "idle" && currentStep !== "complete")
            }
            className="absolute right-3 bottom-3 p-2.5 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed text-white rounded-xl transition-all"
            title="Start Critique Chain (Enter)"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </button>
        </div>

        {/* File Upload */}
        <div className="mt-3">
          <FileUpload
            attachments={attachments}
            onAttachmentsChange={setAttachments}
            disabled={currentStep !== "idle" && currentStep !== "complete"}
            maxFiles={5}
            maxSizeMB={20}
          />
        </div>

        <p className="mt-2 text-xs text-gray-600">
          Press Enter to submit, Shift+Enter for new line
        </p>

        {!isConfigured && (
          <p className="mt-3 text-amber-400 text-sm flex items-center gap-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            Please configure API key and Primary Model in Settings
          </p>
        )}
      </form>

      {/* Windowed history rendering */}
      {conversationHistory.length > 0 && (
        <>
          {/* Collapsed older turns */}
          {visibleRange.start > 0 && (
            <div className="mb-4">
              <div className="text-xs text-gray-500 mb-2 px-2">
                {visibleRange.start} older turn
                {visibleRange.start > 1 ? "s" : ""} (click to expand)
              </div>
              {conversationHistory
                .slice(0, visibleRange.start)
                .map((turn, index) =>
                  expandedTurns.has(index) ? (
                    <div key={index} className="relative">
                      <button
                        onClick={() => toggleExpandTurn(index)}
                        className="absolute top-2 right-2 z-10 px-2 py-1 bg-gray-800 hover:bg-gray-700 rounded text-xs text-gray-400 transition-colors"
                      >
                        Collapse
                      </button>
                      <MemoizedHistoryTurn
                        turn={turn}
                        index={index}
                        primaryModel={primaryModel}
                        reviewerModel={reviewerModel}
                        getModelDisplayName={getModelDisplayName}
                      />
                    </div>
                  ) : (
                    <CollapsedHistoryTurn
                      key={index}
                      turn={turn}
                      index={index}
                      onExpand={toggleExpandTurn}
                    />
                  )
                )}
            </div>
          )}

          {/* Fully rendered recent turns */}
          {conversationHistory
            .slice(visibleRange.start, visibleRange.end)
            .map((turn, i) => {
              const actualIndex = visibleRange.start + i;
              return (
                <MemoizedHistoryTurn
                  key={actualIndex}
                  turn={turn}
                  index={actualIndex}
                  primaryModel={primaryModel}
                  reviewerModel={reviewerModel}
                  getModelDisplayName={getModelDisplayName}
                />
              );
            })}
        </>
      )}

      {currentStep !== "idle" && (
        <>
          <div className="mb-6 flex items-center gap-2 text-sm">
            <Step
              label="Primary"
              active={currentStep === "primary"}
              complete={
                !!displayPrimaryResponse?.content &&
                !displayPrimaryResponse.isLoading
              }
            />
            <Arrow />
            <Step
              label="Critiques"
              active={currentStep === "critique"}
              complete={
                completedCritiques.size === critiqueModels.length &&
                critiqueModels.length > 0
              }
            />
            <Arrow />
            <Step
              label="Review"
              active={currentStep === "review"}
              complete={
                !!displayReviewResponse?.content &&
                !displayReviewResponse.isLoading
              }
            />
            {isPending && (
              <span className="text-xs text-gray-500 ml-2">Loading...</span>
            )}
          </div>

          {conversationHistory.length > 0 && (
            <div className="mb-4 px-4 py-2 bg-purple-900/50 border border-purple-500/30 rounded-lg inline-block">
              <span className="text-xs text-purple-400">Current:</span>
              <span className="ml-2 text-gray-300">{currentQuestion}</span>
            </div>
          )}

          {displayPrimaryResponse && (
            <ResponseCard
              title="Primary Response"
              subtitle={getModelDisplayName(primaryModel)}
              response={displayPrimaryResponse}
              colorClass="blue"
              stepNumber={1}
            />
          )}

          {Object.keys(displayCritiqueResponses).length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-600 flex items-center justify-center text-xs font-bold">
                  2
                </span>
                Critiques
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {critiqueModels.map((model) => (
                  <ResponseCard
                    key={model.id}
                    title={model.name}
                    subtitle={model.id.split("/")[0]}
                    response={displayCritiqueResponses[model.id]}
                    colorClass="amber"
                    compact
                  />
                ))}
              </div>
            </div>
          )}

          {displayReviewResponse && (
            <div className="mt-6">
              <ResponseCard
                title="Final Review"
                subtitle={getModelDisplayName(reviewerModel)}
                response={displayReviewResponse}
                colorClass="purple"
                stepNumber={3}
              />
            </div>
          )}

          {isCurrentTurnComplete && (
            <FollowUpInput
              onSubmit={handleFollowUp}
              disabled={currentStep !== "complete"}
              placeholder="Ask a follow-up question..."
              colorClass="purple"
            />
          )}
        </>
      )}

      {currentStep === "idle" &&
        !displayPrimaryResponse &&
        conversationHistory.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-purple-900/50 to-pink-900/50 flex items-center justify-center mb-6 border border-purple-500/30">
              <svg
                className="w-10 h-10 text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">
              Critique Chain Workflow
            </h2>
            <p className="text-gray-500 mb-4 max-w-md">
              Primary model answers → Critics evaluate → Reviewer synthesizes
            </p>
          </div>
        )}
    </div>
  );
}
