"use client";

import {
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
  useTransition,
} from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useModels } from "@/context/ModelsContext";
import { useProject } from "@/context/ProjectContext";
import { ModelResponse, FileAttachment } from "../../types";
import SettingsModal from "@/components/SettingsModal";
import ResponsePanel from "@/components/ResponsePanel";
import VerdictPanel from "@/components/VerdictPanel";
import CritiqueChain from "@/components/CritiqueChain";
import PreMortem from "@/components/PreMortem";
import FollowUpInput from "@/components/FollowUpInput";
import ProjectSidebar from "@/components/ProjectSidebar";
import NewThreadModal, { ThreadMode } from "@/components/NewThreadModal";
import FileUpload from "@/components/FileUpload";
import { VirtualizedConversation } from "@/components/VirtualizedConversation";
import {
  reconstructMultiAskHistory,
  Message,
  getLatestTurnNumber,
} from "@/lib/conversation-utils";

// Convert FileAttachment to API format
function convertAttachmentsForAPI(attachments: FileAttachment[]) {
  return attachments.map((att) => {
    if (att.type === "image") {
      return {
        type: "image" as const,
        data: att.data, // data URL
        mimeType: att.mimeType,
      };
    } else {
      return {
        type: "pdf" as const,
        data: att.base64 || att.data, // raw base64
        name: att.name,
      };
    }
  });
}

interface VerdictResponse {
  content: string;
  isLoading: boolean;
  error?: string;
}

interface ConversationTurn {
  question: string;
  responses: Record<string, ModelResponse>;
  verdict: VerdictResponse | null;
  turnNumber?: number;
}

// Debounce helper for streaming updates
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

export default function Home() {
  const router = useRouter();
  const { user, isLoading: authLoading, getIdToken } = useAuth();
  const { models, apiKey, verdictModel } = useModels();
  const {
    currentProject,
    currentThread,
    createThread,
    selectThread,
    projectMemory,
  } = useProject();

  const [question, setQuestion] = useState("");

  // Redirect to auth page if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth");
    }
  }, [user, authLoading, router]);
  const [attachments, setAttachments] = useState<FileAttachment[]>([]);
  const [conversationHistory, setConversationHistory] = useState<
    ConversationTurn[]
  >([]);

  // Use debounced state for streaming responses to prevent excessive re-renders
  const {
    value: currentResponses,
    displayValue: displayResponses,
    setValue: setCurrentResponses,
    flush: flushResponses,
    reset: resetResponses,
  } = useStreamingDebounce<Record<string, ModelResponse>>({}, 50);

  const {
    value: currentVerdict,
    displayValue: displayVerdict,
    setValue: setCurrentVerdict,
    flush: flushVerdict,
    reset: resetVerdict,
  } = useStreamingDebounce<VerdictResponse | null>(null, 50);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isNewThreadModalOpen, setIsNewThreadModalOpen] = useState(false);
  const [newThreadMode, setNewThreadMode] = useState<ThreadMode>("multiask");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedModels, setCompletedModels] = useState<Set<string>>(
    new Set()
  );
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [currentTurnNumber, setCurrentTurnNumber] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Use transition for non-urgent updates
  const [isPending, startTransition] = useTransition();

  // Load messages when thread changes
  useEffect(() => {
    const loadThreadMessages = async () => {
      if (!currentThread) {
        setConversationHistory([]);
        resetResponses({});
        resetVerdict(null);
        setCurrentQuestion("");
        setQuestion("");
        setAttachments([]);
        setCurrentTurnNumber(0);
        return;
      }

      // Only load for multiask threads, critique chain and pre-mortem handle their own
      if (
        currentThread.mode === "critique" ||
        currentThread.mode === "premortem"
      ) {
        setConversationHistory([]);
        resetResponses({});
        resetVerdict(null);
        setCurrentQuestion("");
        setQuestion("");
        return;
      }

      setIsLoadingHistory(true);
      try {
        const response = await fetch(
          `/api/threads/${currentThread.id}/messages`
        );
        if (response.ok) {
          const data = await response.json();
          const messages: Message[] = data.messages.map(
            (m: Record<string, unknown>) => ({
              ...m,
              createdAt: new Date(m.createdAt as string | number),
            })
          );

          if (messages.length > 0) {
            const history = reconstructMultiAskHistory(messages);
            const latestTurn = getLatestTurnNumber(messages);
            setCurrentTurnNumber(latestTurn);

            if (history.length > 0) {
              startTransition(() => {
                setConversationHistory(history);
              });
              resetResponses({});
              resetVerdict(null);
              setCurrentQuestion("");
            }
          } else {
            setConversationHistory([]);
            resetResponses({});
            resetVerdict(null);
            setCurrentQuestion("");
            setCurrentTurnNumber(0);
          }
        }
      } catch (error) {
        console.error("Failed to load thread messages:", error);
      }
      setIsLoadingHistory(false);
    };

    loadThreadMessages();
  }, [currentThread, resetResponses, resetVerdict]);

  // Auto-resize textarea
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

  // Build context with project memory - memoized
  const projectContext = useMemo(() => {
    let context = "";

    if (projectMemory?.summary) {
      context += `## Project Context\n${projectMemory.summary}\n\n`;
    }

    if (projectMemory?.facts && projectMemory.facts.length > 0) {
      context += `## Key Facts\n${projectMemory.facts
        .map((f) => `- ${f}`)
        .join("\n")}\n\n`;
    }

    if (projectMemory?.decisions && projectMemory.decisions.length > 0) {
      const recentDecisions = projectMemory.decisions.slice(-3);
      context += `## Recent Decisions\n${recentDecisions
        .map((d) => `- ${d.decision}`)
        .join("\n")}\n\n`;
    }

    return context;
  }, [projectMemory]);

  // Build context from conversation history - memoized and only recalculated when history changes
  const conversationContext = useMemo(() => {
    if (conversationHistory.length === 0) return "";

    let context = "## Previous Conversation\n\n";

    // Limit context to last N turns to prevent token overflow
    const recentHistory = conversationHistory.slice(-5);

    recentHistory.forEach((turn, index) => {
      const actualIndex =
        conversationHistory.length - recentHistory.length + index;
      context += `### Turn ${actualIndex + 1}\n`;
      context += `**Question:** ${turn.question}\n\n`;

      // Summarize responses to save tokens
      const responseEntries = Object.entries(turn.responses);
      if (responseEntries.length > 0) {
        responseEntries.forEach(([modelId, response]) => {
          if (response.content && !response.error) {
            // Truncate very long responses in context
            const truncatedContent =
              response.content.length > 2000
                ? response.content.slice(0, 2000) + "... [truncated]"
                : response.content;
            context += `**${modelId}:** ${truncatedContent}\n\n`;
          }
        });
      }

      if (turn.verdict?.content) {
        const truncatedVerdict =
          turn.verdict.content.length > 1000
            ? turn.verdict.content.slice(0, 1000) + "... [truncated]"
            : turn.verdict.content;
        context += `**Verdict Summary:** ${truncatedVerdict}\n\n`;
      }

      context += "---\n\n";
    });

    return context;
  }, [conversationHistory]);

  // Save message to database
  const saveMessage = useCallback(
    async (
      role: string,
      content: string,
      modelUsed?: string,
      metadata?: Record<string, unknown>,
      turnNumber?: number
    ) => {
      if (!currentThread) return;

      try {
        await fetch(`/api/threads/${currentThread.id}/messages`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            role,
            content,
            modelUsed,
            metadata,
            apiKey,
            turnNumber,
          }),
        });
      } catch (error) {
        console.error("Failed to save message:", error);
      }
    },
    [currentThread, apiKey]
  );

  // Generate verdict from all responses
  const generateVerdict = useCallback(
    async (
      allResponses: Record<string, ModelResponse>,
      originalQuestion: string,
      isFollowUp: boolean = false,
      turnNum: number
    ) => {
      if (!verdictModel || !apiKey) return;

      setCurrentVerdict({ content: "", isLoading: true });

      const responsesSummary = Object.entries(allResponses)
        .filter(([, r]) => r.content && !r.error)
        .map(([modelId, r]) => `### ${modelId}\n${r.content}`)
        .join("\n\n---\n\n");

      const verdictPrompt = `You are an expert analyst helping with the project "${
        currentProject?.name || "this project"
      }".

${projectContext}
${isFollowUp ? conversationContext : ""}

**${isFollowUp ? "Follow-up " : ""}Question:** ${originalQuestion}

Here are the responses from each model:

${responsesSummary}

---

Please analyze all the responses above and provide:

1. **Consensus**: What do all or most models agree on?
2. **Key Differences**: Where do the models differ?
3. **Notable Insights**: Any unique points from specific models?
4. **Overall Assessment**: The most accurate/comprehensive answer?

Be specific and reference which models said what.`;

      // Get ID token for authentication
      const idToken = await getIdToken();
      if (!idToken) {
        console.error("No ID token available for verdict");
        setCurrentVerdict({
          content: "",
          isLoading: false,
          error: "Authentication required",
        });
        flushVerdict();
        return;
      }

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({
            message: verdictPrompt,
            modelId: verdictModel,
            apiKey,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          setCurrentVerdict({
            content: "",
            isLoading: false,
            error: errorData.error,
          });
          flushVerdict();
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
                  setCurrentVerdict((prev) =>
                    prev
                      ? { ...prev, content: fullContent, isLoading: true }
                      : null
                  );
                }
              } catch {
                /* Skip */
              }
            }
          }
        }

        setCurrentVerdict((prev) =>
          prev ? { ...prev, content: fullContent, isLoading: false } : null
        );
        flushVerdict();

        await saveMessage(
          "verdict",
          fullContent,
          verdictModel,
          undefined,
          turnNum
        );
      } catch (error) {
        setCurrentVerdict({
          content: "",
          isLoading: false,
          error: error instanceof Error ? error.message : "Unknown error",
        });
        flushVerdict();
      }
    },
    [
      verdictModel,
      apiKey,
      projectContext,
      conversationContext,
      currentProject,
      saveMessage,
      setCurrentVerdict,
      flushVerdict,
      getIdToken,
    ]
  );

  // Check if all models have completed and trigger verdict
  useEffect(() => {
    if (
      models.length > 0 &&
      completedModels.size === models.length &&
      verdictModel &&
      !currentVerdict?.content &&
      !currentVerdict?.isLoading &&
      currentQuestion
    ) {
      const hasValidResponses = Object.values(currentResponses).some(
        (r) => r.content && !r.error && !r.isLoading
      );
      if (hasValidResponses) {
        generateVerdict(
          currentResponses,
          currentQuestion,
          conversationHistory.length > 0,
          currentTurnNumber
        );
      }
    }
  }, [
    completedModels,
    models.length,
    verdictModel,
    currentResponses,
    currentVerdict,
    generateVerdict,
    currentQuestion,
    conversationHistory.length,
    currentTurnNumber,
  ]);

  // Run query on all models
  const runQuery = useCallback(
    async (
      queryQuestion: string,
      isFollowUp: boolean = false,
      queryAttachments: FileAttachment[] = []
    ) => {
      if (!queryQuestion.trim() || !apiKey || models.length === 0) return;

      const newTurnNumber = currentTurnNumber + 1;

      // Save previous turn to history if this is a follow-up
      if (
        isFollowUp &&
        currentQuestion &&
        Object.keys(currentResponses).length > 0
      ) {
        startTransition(() => {
          setConversationHistory((prev) => [
            ...prev,
            {
              question: currentQuestion,
              responses: { ...currentResponses },
              verdict: currentVerdict ? { ...currentVerdict } : null,
              turnNumber: currentTurnNumber,
            },
          ]);
        });
      }

      setIsSubmitting(true);
      setCompletedModels(new Set());
      resetVerdict(null);
      setCurrentQuestion(queryQuestion);
      setCurrentTurnNumber(newTurnNumber);

      // Save user message with turn number
      await saveMessage(
        "user",
        queryQuestion,
        undefined,
        undefined,
        newTurnNumber
      );

      // Build context for current turn
      let currentTurnContext = "";
      if (isFollowUp && currentQuestion) {
        currentTurnContext = `### Current Turn\n**Question:** ${currentQuestion}\n\n`;
        Object.entries(currentResponses).forEach(([modelId, response]) => {
          if (response.content && !response.error) {
            const truncated =
              response.content.length > 2000
                ? response.content.slice(0, 2000) + "... [truncated]"
                : response.content;
            currentTurnContext += `**${modelId}:** ${truncated}\n\n`;
          }
        });
        if (currentVerdict?.content) {
          const truncated =
            currentVerdict.content.length > 1000
              ? currentVerdict.content.slice(0, 1000) + "... [truncated]"
              : currentVerdict.content;
          currentTurnContext += `**Verdict Summary:** ${truncated}\n\n`;
        }
        currentTurnContext += "---\n\n";
      }

      const fullContext =
        projectContext +
        (isFollowUp ? conversationContext : "") +
        currentTurnContext;
      const messageWithContext = fullContext
        ? `${fullContext}**${
            isFollowUp ? "Follow-up " : ""
          }Question:** ${queryQuestion}\n\nPlease answer the question, considering the project context and any previous conversation.`
        : queryQuestion;

      // Initialize responses
      const initialResponses: Record<string, ModelResponse> = {};
      models.forEach((model) => {
        initialResponses[model.id] = {
          modelId: model.id,
          content: "",
          isLoading: true,
        };
      });
      resetResponses(initialResponses);

      // Convert attachments to API format
      const apiAttachments =
        queryAttachments.length > 0
          ? convertAttachmentsForAPI(queryAttachments)
          : undefined;

      // Get ID token for authentication
      const idToken = await getIdToken();
      if (!idToken) {
        console.error("No ID token available");
        return;
      }

      // Fire off all requests
      models.forEach(async (model) => {
        try {
          const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${idToken}`,
            },
            body: JSON.stringify({
              message: messageWithContext,
              modelId: model.id,
              apiKey,
              attachments: apiAttachments,
            }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            setCurrentResponses((prev) => ({
              ...prev,
              [model.id]: {
                modelId: model.id,
                content: "",
                isLoading: false,
                error: errorData.error || "Request failed",
              },
            }));
            setCompletedModels((prev) => new Set([...prev, model.id]));
            flushResponses();
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
                    setCurrentResponses((prev) => ({
                      ...prev,
                      [model.id]: {
                        ...prev[model.id],
                        content: fullContent,
                        isLoading: true,
                      },
                    }));
                  }
                } catch {
                  /* Skip */
                }
              }
            }
          }

          setCurrentResponses((prev) => ({
            ...prev,
            [model.id]: {
              ...prev[model.id],
              content: fullContent,
              isLoading: false,
            },
          }));
          flushResponses();
          setCompletedModels((prev) => new Set([...prev, model.id]));

          await saveMessage(
            "assistant",
            fullContent,
            model.id,
            undefined,
            newTurnNumber
          );
        } catch (error) {
          setCurrentResponses((prev) => ({
            ...prev,
            [model.id]: {
              modelId: model.id,
              content: "",
              isLoading: false,
              error: error instanceof Error ? error.message : "Unknown error",
            },
          }));
          flushResponses();
          setCompletedModels((prev) => new Set([...prev, model.id]));
        }
      });

      setIsSubmitting(false);
    },
    [
      apiKey,
      models,
      projectContext,
      conversationContext,
      currentQuestion,
      currentResponses,
      currentVerdict,
      saveMessage,
      currentTurnNumber,
      setCurrentResponses,
      resetResponses,
      resetVerdict,
      flushResponses,
      getIdToken,
    ]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!question.trim() || !currentThread) return;

      const hasExistingHistory = conversationHistory.length > 0;

      if (!hasExistingHistory) {
        setConversationHistory([]);
      }

      // Pass current attachments to runQuery
      runQuery(question, hasExistingHistory, attachments);
      setQuestion("");
      setAttachments([]); // Clear attachments after submission
    },
    [question, currentThread, runQuery, conversationHistory.length, attachments]
  );

  const handleFollowUp = useCallback(
    (followUpQuestion: string) => {
      // Follow-ups don't include attachments (could be changed if needed)
      runQuery(followUpQuestion, true, []);
    },
    [runQuery]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleNewThread = (mode: ThreadMode) => {
    setNewThreadMode(mode);
    setIsNewThreadModalOpen(true);
  };

  const handleCreateThread = async (title: string, mode: ThreadMode) => {
    if (!currentProject) return;
    const thread = await createThread(currentProject.id, title, mode);
    if (thread) {
      selectThread(thread);
    }
  };

  // Memoize grid cols calculation
  const gridCols = useMemo(() => {
    const count = models.length;
    if (count === 0) return "";
    if (count === 1) return "grid-cols-1";
    if (count === 2) return "grid-cols-1 lg:grid-cols-2";
    if (count <= 4) return "grid-cols-1 md:grid-cols-2";
    if (count <= 6) return "grid-cols-1 md:grid-cols-2 xl:grid-cols-3";
    return "grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4";
  }, [models.length]);

  // Memoize verdict model name
  const verdictModelName = useMemo(() => {
    if (!verdictModel) return "Not configured";
    const parts = verdictModel.split("/");
    return parts[parts.length - 1]
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }, [verdictModel]);

  const isCurrentTurnComplete =
    completedModels.size === models.length &&
    models.length > 0 &&
    (!verdictModel || (displayVerdict?.content && !displayVerdict?.isLoading));

  // Show loading while checking auth
  if (authLoading || !user) {
    return (
      <div className="flex h-screen bg-grid items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Render welcome screen if no project selected
  if (!currentProject) {
    return (
      <div className="flex h-screen bg-grid">
        <ProjectSidebar onNewThread={handleNewThread} />

        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 rounded-2xl bg-linear-to-b from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Welcome to MultiModel GPT
            </h1>
            <p className="text-gray-400 mb-6">
              Create a project to start comparing AI models. Projects preserve
              context across conversations.
            </p>
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl transition-colors border border-gray-700"
            >
              Configure Settings
            </button>
          </div>
        </div>

        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
        />
      </div>
    );
  }

  // Render thread selection if no thread selected
  if (!currentThread) {
    return (
      <div className="flex h-screen bg-grid">
        <ProjectSidebar onNewThread={handleNewThread} />

        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="sticky top-0 z-40 backdrop-blur-xl bg-gray-950/80 border-b border-gray-800">
            <div className="px-6 py-4 flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-white">
                  {currentProject.name}
                </h1>
                <p className="text-xs text-gray-500">
                  Select or create a conversation
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsSettingsOpen(true)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 rounded-xl text-gray-300 transition-colors border border-gray-700"
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
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Settings
                </button>
              </div>
            </div>
          </header>

          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-white mb-4">
                Start a Conversation
              </h2>
              <div className="flex gap-4 justify-center flex-wrap">
                <button
                  onClick={() => handleNewThread("multiask")}
                  className="px-6 py-4 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 rounded-xl text-blue-400 transition-colors"
                >
                  <svg
                    className="w-8 h-8 mx-auto mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  <div className="font-medium">MultiAsk</div>
                  <div className="text-xs opacity-70">
                    Query multiple models
                  </div>
                </button>
                <button
                  onClick={() => handleNewThread("critique")}
                  className="px-6 py-4 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 rounded-xl text-purple-400 transition-colors"
                >
                  <svg
                    className="w-8 h-8 mx-auto mb-2"
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
                  <div className="font-medium">Critique Chain</div>
                  <div className="text-xs opacity-70">
                    Primary → Critics → Review
                  </div>
                </button>
                <button
                  onClick={() => handleNewThread("premortem")}
                  className="px-6 py-4 bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/30 rounded-xl text-rose-400 transition-colors"
                >
                  <svg
                    className="w-8 h-8 mx-auto mb-2"
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
                  <div className="font-medium">Pre-mortem</div>
                  <div className="text-xs opacity-70">Red Team → Blue Team</div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
        />
        <NewThreadModal
          isOpen={isNewThreadModalOpen}
          onClose={() => setIsNewThreadModalOpen(false)}
          onCreate={handleCreateThread}
          defaultMode={newThreadMode}
        />
      </div>
    );
  }

  // Main conversation view
  return (
    <div className="flex h-screen bg-grid">
      <ProjectSidebar onNewThread={handleNewThread} />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="sticky top-0 z-40 backdrop-blur-xl bg-gray-950/80 border-b border-gray-800">
          <div className="px-6 py-4 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white">
                  {currentThread.title}
                </h1>
                <span
                  className={`text-xs px-2 py-0.5 rounded ${
                    currentThread.mode === "critique"
                      ? "bg-purple-600/30 text-purple-400"
                      : currentThread.mode === "premortem"
                      ? "bg-rose-600/30 text-rose-400"
                      : "bg-blue-600/30 text-blue-400"
                  }`}
                >
                  {currentThread.mode === "critique"
                    ? "Critique Chain"
                    : currentThread.mode === "premortem"
                    ? "Pre-mortem"
                    : "MultiAsk"}
                </span>
                {isPending && (
                  <span className="text-xs text-gray-500 ml-2">Loading...</span>
                )}
              </div>
              <p className="text-xs text-gray-500">{currentProject.name}</p>
            </div>
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 rounded-xl text-gray-300 transition-colors border border-gray-700"
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
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Settings
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {isLoadingHistory ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-400">Loading conversation history...</p>
              </div>
            </div>
          ) : currentThread.mode === "critique" ? (
            <CritiqueChain
              projectContext={projectContext}
              onSaveMessage={saveMessage}
              threadId={currentThread.id}
            />
          ) : currentThread.mode === "premortem" ? (
            <PreMortem
              projectContext={projectContext}
              onSaveMessage={saveMessage}
              threadId={currentThread.id}
            />
          ) : (
            <>
              {/* Question Input */}
              <form onSubmit={handleSubmit} className="mb-6">
                <div className="relative">
                  <textarea
                    ref={textareaRef}
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask a question to compare AI responses..."
                    rows={1}
                    className="w-full px-6 py-4 pr-16 bg-gray-900 border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg resize-none overflow-hidden min-h-[60px]"
                    disabled={isSubmitting}
                  />
                  <button
                    type="submit"
                    disabled={
                      isSubmitting ||
                      !question.trim() ||
                      !apiKey ||
                      models.length === 0
                    }
                    className="absolute right-3 bottom-3 p-2.5 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed text-white rounded-xl transition-all"
                    title="Compare (Enter)"
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
                    disabled={isSubmitting}
                    maxFiles={5}
                    maxSizeMB={20}
                  />
                </div>

                <p className="mt-2 text-xs text-gray-600">
                  Press Enter to submit, Shift+Enter for new line
                </p>

                {!apiKey && (
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
                    Please add your OpenRouter API key in Settings
                  </p>
                )}
                {apiKey && models.length === 0 && (
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
                    Please add at least one model in Settings
                  </p>
                )}
              </form>

              {/* Virtualized Conversation History */}
              <VirtualizedConversation
                conversationHistory={conversationHistory}
                verdictModelName={verdictModelName}
                windowSize={10}
              />

              {/* Current Turn */}
              {models.length > 0 &&
                Object.keys(displayResponses).length > 0 && (
                  <>
                    {/* Always show the current question when responses are being displayed */}
                    {currentQuestion && (
                      <div className="mb-4 px-4 py-2 bg-blue-900/30 border border-blue-500/30 rounded-lg inline-block">
                        <span className="text-xs text-blue-400">
                          {conversationHistory.length > 0
                            ? "Follow-up:"
                            : "Question:"}
                        </span>
                        <span className="ml-2 text-gray-300">
                          {currentQuestion}
                        </span>
                      </div>
                    )}
                    <div className={`grid ${gridCols} gap-4`}>
                      {models.map((model) => (
                        <div
                          key={model.id}
                          className="min-h-[400px] max-h-[600px]"
                        >
                          <ResponsePanel
                            model={model}
                            response={displayResponses[model.id]}
                          />
                        </div>
                      ))}
                    </div>

                    {verdictModel &&
                      (displayVerdict ||
                        completedModels.size === models.length) && (
                        <div className="mt-6">
                          <VerdictPanel
                            content={displayVerdict?.content || ""}
                            isLoading={displayVerdict?.isLoading || false}
                            error={displayVerdict?.error}
                            modelName={verdictModelName}
                          />
                        </div>
                      )}

                    {isCurrentTurnComplete && (
                      <FollowUpInput
                        onSubmit={handleFollowUp}
                        disabled={isSubmitting}
                        placeholder="Ask a follow-up question..."
                        colorClass="blue"
                      />
                    )}
                  </>
                )}
            </>
          )}
        </main>
      </div>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
      <NewThreadModal
        isOpen={isNewThreadModalOpen}
        onClose={() => setIsNewThreadModalOpen(false)}
        onCreate={handleCreateThread}
        defaultMode={newThreadMode}
      />
    </div>
  );
}
