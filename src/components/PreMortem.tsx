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
import { useAuth } from "@/context/AuthContext";
import { FileAttachment } from "../../types";
import FollowUpInput from "./FollowUpInput";
import FileUpload from "./FileUpload";
import { MemoizedMarkdown } from "./VirtualizedConversation";
import { Message, getLatestTurnNumber } from "@/lib/conversation-utils";

interface StepResponse {
  content: string;
  isLoading: boolean;
  error?: string;
}

interface ConversationTurn {
  question: string;
  redTeamResponses: Record<string, StepResponse>;
  blueTeamResponses: Record<string, StepResponse>;
  turnNumber?: number;
}

type WorkflowStep = "idle" | "redteam" | "blueteam" | "complete";

interface PreMortemProps {
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
    compact,
  }: {
    title: string;
    subtitle: string;
    response: StepResponse | undefined;
    colorClass: "red" | "cyan" | "green";
    compact?: boolean;
  }) {
    const colors = {
      red: {
        bg: "from-[rgba(247,49,76,0.08)] to-[rgba(247,49,76,0.02)]",
        border: "border-[rgba(247,49,76,0.2)]",
        header: "bg-[rgba(247,49,76,0.05)]",
        accent: "text-[#F7314C]",
        step: "bg-[#F7314C] text-white",
      },
      cyan: {
        bg: "from-[rgba(49,168,247,0.08)] to-[rgba(49,168,247,0.02)]",
        border: "border-[rgba(49,168,247,0.2)]",
        header: "bg-[rgba(49,168,247,0.05)]",
        accent: "text-[#31A8F7]",
        step: "bg-[#31A8F7] text-white",
      },
      green: {
        bg: "from-[rgba(91,247,49,0.08)] to-[rgba(91,247,49,0.02)]",
        border: "border-[rgba(91,247,49,0.2)]",
        header: "bg-[rgba(91,247,49,0.05)]",
        accent: "text-[#5BF731]",
        step: "bg-[#5BF731] text-[#050505]",
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
            <div className="text-gray-500 text-sm italic">Analyzing...</div>
          ) : (
            <div className="text-gray-600 text-sm italic">Waiting...</div>
          )}
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.title === nextProps.title &&
      prevProps.subtitle === nextProps.subtitle &&
      prevProps.colorClass === nextProps.colorClass &&
      prevProps.compact === nextProps.compact &&
      prevProps.response?.content === nextProps.response?.content &&
      prevProps.response?.isLoading === nextProps.response?.isLoading &&
      prevProps.response?.error === nextProps.response?.error
    );
  }
);

// Memoized history turn
const MemoizedHistoryTurn = memo(function MemoizedHistoryTurn({
  turn,
  index,
  getModelDisplayName,
}: {
  turn: ConversationTurn;
  index: number;
  getModelDisplayName: (modelId: string) => string;
}) {
  const redTeamModelIds = useMemo(
    () => Object.keys(turn.redTeamResponses),
    [turn.redTeamResponses]
  );
  const blueTeamModelIds = useMemo(
    () => Object.keys(turn.blueTeamResponses),
    [turn.blueTeamResponses]
  );

  return (
    <div className="mb-8 pb-6 border-b border-gray-800">
      <div className="mb-4 px-4 py-2 bg-rose-900/30 rounded-lg inline-block">
        <span className="text-xs text-rose-400">
          Turn {turn.turnNumber || index + 1}:
        </span>
        <span className="ml-2 text-gray-300">{turn.question}</span>
      </div>

      {/* Red Team Responses */}
      {redTeamModelIds.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-red-400 mb-3 flex items-center gap-2">
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
            Red Team - Failure Points
          </h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {redTeamModelIds.map((modelId) => (
              <ResponseCard
                key={modelId}
                title={getModelDisplayName(modelId)}
                subtitle={modelId.split("/")[0]}
                response={turn.redTeamResponses[modelId]}
                colorClass="red"
                compact
              />
            ))}
          </div>
        </div>
      )}

      {/* Blue Team Responses */}
      {blueTeamModelIds.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-cyan-400 mb-3 flex items-center gap-2">
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
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            Blue Team - Counter Strategies
          </h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {blueTeamModelIds.map((modelId) => (
              <ResponseCard
                key={modelId}
                title={getModelDisplayName(modelId)}
                subtitle={modelId.split("/")[0]}
                response={turn.blueTeamResponses[modelId]}
                colorClass="cyan"
                compact
              />
            ))}
          </div>
        </div>
      )}
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
          ? "bg-rose-600/20 text-rose-400 border border-rose-500/30 animate-pulse"
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

// Reconstruct pre-mortem history from messages
function reconstructPreMortemHistory(messages: Message[]): ConversationTurn[] {
  const turnMap = new Map<number, Message[]>();

  for (const msg of messages) {
    const turn = msg.turnNumber;
    if (!turnMap.has(turn)) {
      turnMap.set(turn, []);
    }
    turnMap.get(turn)!.push(msg);
  }

  const turns: ConversationTurn[] = [];
  const sortedTurnNumbers = Array.from(turnMap.keys()).sort((a, b) => a - b);

  for (const turnNumber of sortedTurnNumbers) {
    const turnMessages = turnMap.get(turnNumber)!;

    const userMsg = turnMessages.find((m) => m.role === "user");
    if (!userMsg) continue;

    const redTeamResponses: Record<string, StepResponse> = {};
    const blueTeamResponses: Record<string, StepResponse> = {};

    for (const msg of turnMessages) {
      if (msg.role === "redteam" && msg.modelUsed) {
        redTeamResponses[msg.modelUsed] = {
          content: msg.content,
          isLoading: false,
        };
      } else if (msg.role === "blueteam" && msg.modelUsed) {
        blueTeamResponses[msg.modelUsed] = {
          content: msg.content,
          isLoading: false,
        };
      }
    }

    turns.push({
      question: userMsg.content,
      redTeamResponses,
      blueTeamResponses,
      turnNumber,
    });
  }

  return turns;
}

export default function PreMortem({
  projectContext = "",
  onSaveMessage,
  threadId,
}: PreMortemProps) {
  const { redTeamModels, blueTeamModels, redTeamPrompt, blueTeamPrompt } =
    useModels();
  const { getIdToken } = useAuth();
  const [question, setQuestion] = useState("");
  const [attachments, setAttachments] = useState<FileAttachment[]>([]);
  const [currentStep, setCurrentStep] = useState<WorkflowStep>("idle");
  const [completedRedTeam, setCompletedRedTeam] = useState<Set<string>>(
    new Set()
  );
  const [completedBlueTeam, setCompletedBlueTeam] = useState<Set<string>>(
    new Set()
  );
  const [conversationHistory, setConversationHistory] = useState<
    ConversationTurn[]
  >([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [currentTurnNumber, setCurrentTurnNumber] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isPending, startTransition] = useTransition();

  // Debounced streaming states
  const {
    value: redTeamResponses,
    displayValue: displayRedTeamResponses,
    setValue: setRedTeamResponses,
    flush: flushRedTeam,
    reset: resetRedTeam,
  } = useStreamingDebounce<Record<string, StepResponse>>({}, 50);

  const {
    value: blueTeamResponses,
    displayValue: displayBlueTeamResponses,
    setValue: setBlueTeamResponses,
    flush: flushBlueTeam,
    reset: resetBlueTeam,
  } = useStreamingDebounce<Record<string, StepResponse>>({}, 50);

  // Load messages when thread changes
  useEffect(() => {
    const loadThreadMessages = async () => {
      if (!threadId) {
        setConversationHistory([]);
        resetRedTeam({});
        resetBlueTeam({});
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
            const history = reconstructPreMortemHistory(messages);
            const latestTurn = getLatestTurnNumber(messages);
            setCurrentTurnNumber(latestTurn);

            if (history.length > 0) {
              startTransition(() => {
                setConversationHistory(history);
              });
              resetRedTeam({});
              resetBlueTeam({});
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
  }, [threadId, resetRedTeam, resetBlueTeam]);

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

        const token = await getIdToken();
        if (!token) {
          onError("Authentication required");
          return;
        }

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            message: prompt,
            modelId,
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
    [getIdToken]
  );

  const runBlueTeam = useCallback(
    async (
      originalQuestion: string,
      redTeamResults: Record<string, StepResponse>,
      turnNumber: number
    ) => {
      if (blueTeamModels.length === 0) {
        setCurrentStep("complete");
        return;
      }

      setCurrentStep("blueteam");
      setCompletedBlueTeam(new Set());

      // Combine all red team outputs
      const redTeamSummary = Object.entries(redTeamResults)
        .filter(([, r]) => r.content && !r.error)
        .map(
          ([modelId, r]) => `### Failure Analysis from ${modelId}\n${r.content}`
        )
        .join("\n\n---\n\n");

      const blueTeamFullPrompt = `${blueTeamPrompt}

## Original Initiative/Question
${originalQuestion}

## Red Team Analysis - Identified Failure Points

${redTeamSummary}

---

Please analyze all the failure points identified above and provide comprehensive winning strategies to counter each failure mode. Be specific and actionable.`;

      const initialResponses: Record<string, StepResponse> = {};
      blueTeamModels.forEach((model) => {
        initialResponses[model.id] = { content: "", isLoading: true };
      });
      resetBlueTeam(initialResponses);

      blueTeamModels.forEach((model) => {
        streamResponse(
          blueTeamFullPrompt,
          model.id,
          (content) => {
            setBlueTeamResponses((prev) => ({
              ...prev,
              [model.id]: { ...prev[model.id], content, isLoading: true },
            }));
          },
          async (content) => {
            setBlueTeamResponses((prev) => ({
              ...prev,
              [model.id]: { ...prev[model.id], content, isLoading: false },
            }));
            flushBlueTeam();
            setCompletedBlueTeam((prev) => new Set([...prev, model.id]));
            if (onSaveMessage)
              await onSaveMessage(
                "blueteam",
                content,
                model.id,
                undefined,
                turnNumber
              );
          },
          (error) => {
            setBlueTeamResponses((prev) => ({
              ...prev,
              [model.id]: { content: "", isLoading: false, error },
            }));
            flushBlueTeam();
            setCompletedBlueTeam((prev) => new Set([...prev, model.id]));
          }
        );
      });
    },
    [
      blueTeamModels,
      blueTeamPrompt,
      streamResponse,
      onSaveMessage,
      setBlueTeamResponses,
      resetBlueTeam,
      flushBlueTeam,
    ]
  );

  // Trigger blue team when red team completes
  useEffect(() => {
    if (
      currentStep === "redteam" &&
      redTeamModels.length > 0 &&
      completedRedTeam.size === redTeamModels.length
    ) {
      runBlueTeam(currentQuestion, redTeamResponses, currentTurnNumber);
    }
  }, [
    currentStep,
    completedRedTeam.size,
    redTeamModels.length,
    redTeamResponses,
    currentQuestion,
    runBlueTeam,
    currentTurnNumber,
  ]);

  // Mark complete when blue team finishes
  useEffect(() => {
    if (
      currentStep === "blueteam" &&
      blueTeamModels.length > 0 &&
      completedBlueTeam.size === blueTeamModels.length
    ) {
      setCurrentStep("complete");
    }
  }, [currentStep, completedBlueTeam.size, blueTeamModels.length]);

  const runPreMortem = useCallback(
    async (
      queryQuestion: string,
      isFollowUp: boolean = false,
      queryAttachments: FileAttachment[] = []
    ) => {
      if (!queryQuestion.trim() || redTeamModels.length === 0) return;

      const newTurnNumber = currentTurnNumber + 1;

      if (
        isFollowUp &&
        currentQuestion &&
        Object.keys(redTeamResponses).length > 0
      ) {
        startTransition(() => {
          setConversationHistory((prev) => [
            ...prev,
            {
              question: currentQuestion,
              redTeamResponses: { ...redTeamResponses },
              blueTeamResponses: { ...blueTeamResponses },
              turnNumber: currentTurnNumber,
            },
          ]);
        });
      }

      setCurrentStep("redteam");
      setCompletedRedTeam(new Set());
      setCompletedBlueTeam(new Set());
      resetRedTeam({});
      resetBlueTeam({});
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

      const redTeamFullPrompt = `${redTeamPrompt}

${
  projectContext ? `## Project Context\n${projectContext}\n\n` : ""
}## Initiative/Question to Analyze

${queryQuestion}

---

Please provide your pre-mortem failure analysis.`;

      const initialResponses: Record<string, StepResponse> = {};
      redTeamModels.forEach((model) => {
        initialResponses[model.id] = { content: "", isLoading: true };
      });
      resetRedTeam(initialResponses);

      redTeamModels.forEach((model) => {
        streamResponse(
          redTeamFullPrompt,
          model.id,
          (content) => {
            setRedTeamResponses((prev) => ({
              ...prev,
              [model.id]: { ...prev[model.id], content, isLoading: true },
            }));
          },
          async (content) => {
            setRedTeamResponses((prev) => ({
              ...prev,
              [model.id]: { ...prev[model.id], content, isLoading: false },
            }));
            flushRedTeam();
            setCompletedRedTeam((prev) => new Set([...prev, model.id]));
            if (onSaveMessage)
              await onSaveMessage(
                "redteam",
                content,
                model.id,
                undefined,
                newTurnNumber
              );
          },
          (error) => {
            setRedTeamResponses((prev) => ({
              ...prev,
              [model.id]: { content: "", isLoading: false, error },
            }));
            flushRedTeam();
            setCompletedRedTeam((prev) => new Set([...prev, model.id]));
          },
          queryAttachments
        );
      });
    },
    [
      redTeamModels,
      redTeamPrompt,
      projectContext,
      streamResponse,
      onSaveMessage,
      currentTurnNumber,
      currentQuestion,
      redTeamResponses,
      blueTeamResponses,
      setRedTeamResponses,
      resetRedTeam,
      resetBlueTeam,
      flushRedTeam,
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

      runPreMortem(question, hasExistingHistory, attachments);
      setQuestion("");
      setAttachments([]);
    },
    [question, runPreMortem, conversationHistory.length, attachments]
  );

  const handleFollowUp = useCallback(
    (followUpQuestion: string) => runPreMortem(followUpQuestion, true, []),
    [runPreMortem]
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

  const isConfigured = redTeamModels.length > 0;
  const isCurrentTurnComplete = currentStep === "complete";

  if (isLoadingHistory) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
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
            placeholder="Describe your initiative or plan for pre-mortem analysis..."
            rows={1}
            className="w-full px-6 py-4 pr-16 bg-gray-900 border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent text-lg resize-none overflow-hidden min-h-[60px]"
            disabled={currentStep !== "idle" && currentStep !== "complete"}
          />
          <button
            type="submit"
            disabled={
              !isConfigured ||
              !question.trim() ||
              (currentStep !== "idle" && currentStep !== "complete")
            }
            className="absolute right-3 bottom-3 p-2.5 bg-linear-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed text-white rounded-xl transition-all"
            title="Start Pre-mortem Analysis (Enter)"
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
            Please configure API key and at least one Red Team model in Settings
          </p>
        )}
      </form>

      {/* History */}
      {conversationHistory.map((turn, index) => (
        <MemoizedHistoryTurn
          key={index}
          turn={turn}
          index={index}
          getModelDisplayName={getModelDisplayName}
        />
      ))}

      {/* Current Turn */}
      {currentStep !== "idle" && (
        <>
          <div className="mb-6 flex items-center gap-2 text-sm">
            <Step
              label="Red Team"
              active={currentStep === "redteam"}
              complete={
                completedRedTeam.size === redTeamModels.length &&
                redTeamModels.length > 0
              }
            />
            <Arrow />
            <Step
              label="Blue Team"
              active={currentStep === "blueteam"}
              complete={
                completedBlueTeam.size === blueTeamModels.length &&
                blueTeamModels.length > 0
              }
            />
            {isPending && (
              <span className="text-xs text-gray-500 ml-2">Loading...</span>
            )}
          </div>

          {conversationHistory.length > 0 && (
            <div className="mb-4 px-4 py-2 bg-rose-900/50 border border-rose-500/30 rounded-lg inline-block">
              <span className="text-xs text-rose-400">Current:</span>
              <span className="ml-2 text-gray-300">{currentQuestion}</span>
            </div>
          )}

          {/* Red Team Responses */}
          {Object.keys(displayRedTeamResponses).length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-linear-to-br from-red-500 to-rose-600 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
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
                </div>
                Red Team - Failure Analysis
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {redTeamModels.map((model) => (
                  <ResponseCard
                    key={model.id}
                    title={model.name}
                    subtitle={model.id.split("/")[0]}
                    response={displayRedTeamResponses[model.id]}
                    colorClass="red"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Blue Team Responses */}
          {Object.keys(displayBlueTeamResponses).length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                Blue Team - Counter Strategies
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {blueTeamModels.map((model) => (
                  <ResponseCard
                    key={model.id}
                    title={model.name}
                    subtitle={model.id.split("/")[0]}
                    response={displayBlueTeamResponses[model.id]}
                    colorClass="cyan"
                  />
                ))}
              </div>
            </div>
          )}

          {isCurrentTurnComplete && (
            <FollowUpInput
              onSubmit={handleFollowUp}
              disabled={currentStep !== "complete"}
              placeholder="Ask a follow-up question..."
              colorClass="green"
            />
          )}
        </>
      )}

      {/* Empty state */}
      {currentStep === "idle" && conversationHistory.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-rose-900/50 to-red-900/50 flex items-center justify-center mb-6 border border-rose-500/30">
            <svg
              className="w-10 h-10 text-rose-400"
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
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">
            Pre-mortem Analysis
          </h2>
          <p className="text-gray-500 mb-4 max-w-md">
            Red Team identifies failure points → Blue Team develops anti-fragile
            strategies
          </p>
        </div>
      )}
    </div>
  );
}
