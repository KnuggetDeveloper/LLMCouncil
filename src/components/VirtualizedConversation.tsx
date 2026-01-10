"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { ModelResponse } from "../../types";

// Memoized markdown component to prevent re-parsing
const MemoizedMarkdown = React.memo(function MemoizedMarkdown({
  content,
  className = "",
}: {
  content: string;
  className?: string;
}) {
  // Lazy load ReactMarkdown only when needed
  const [ReactMarkdown, setReactMarkdown] = useState<
    typeof import("react-markdown").default | null
  >(null);
  const [remarkGfm, setRemarkGfm] = useState<
    typeof import("remark-gfm").default | null
  >(null);

  useEffect(() => {
    // Dynamically import to reduce initial bundle
    Promise.all([import("react-markdown"), import("remark-gfm")]).then(
      ([rm, rgfm]) => {
        setReactMarkdown(() => rm.default);
        setRemarkGfm(() => rgfm.default);
      }
    );
  }, []);

  if (!ReactMarkdown || !remarkGfm) {
    // Show plain text while loading markdown parser
    return (
      <div
        className={`prose prose-invert prose-sm max-w-none whitespace-pre-wrap ${className}`}
      >
        {content}
      </div>
    );
  }

  return (
    <div className={`prose prose-invert prose-sm max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-xl font-bold text-white mt-6 mb-4 first:mt-0 pb-2 border-b border-[rgba(255,255,255,0.1)]">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-lg font-bold text-white mt-5 mb-3 first:mt-0">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-base font-semibold text-white mt-4 mb-2 first:mt-0">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-sm font-semibold text-white mt-3 mb-2 first:mt-0">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="text-[rgba(255,255,255,0.8)] leading-relaxed mb-4 last:mb-0 text-sm">
              {children}
            </p>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-white">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic text-[rgba(255,255,255,0.7)]">{children}</em>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-outside ml-5 mb-4 space-y-2 text-[rgba(255,255,255,0.8)]">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-outside ml-5 mb-4 space-y-2 text-[rgba(255,255,255,0.8)]">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-[rgba(255,255,255,0.8)] leading-relaxed text-sm pl-1">
              {children}
            </li>
          ),
          code: ({ className, children }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code className="px-1.5 py-0.5 bg-[rgba(91,247,49,0.1)] text-[#5BF731] rounded text-[0.85em] font-mono">
                  {children}
                </code>
              );
            }
            return <code className="text-sm font-mono">{children}</code>;
          },
          pre: ({ children }) => (
            <pre className="bg-[#050505] border border-[rgba(255,255,255,0.08)] rounded-xl p-4 overflow-x-auto mb-4 text-sm">
              {children}
            </pre>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-3 border-[#5BF731] pl-4 py-2 my-4 text-[rgba(255,255,255,0.7)] italic bg-[rgba(91,247,49,0.05)] rounded-r-lg">
              {children}
            </blockquote>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5BF731] hover:text-[#4de028] underline underline-offset-2 transition-colors"
            >
              {children}
            </a>
          ),
          hr: () => <hr className="border-[rgba(255,255,255,0.1)] my-6" />,
          table: ({ children }) => (
            <div className="overflow-x-auto mb-4 rounded-xl border border-[rgba(255,255,255,0.08)]">
              <table className="min-w-full">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-[rgba(255,255,255,0.03)]">{children}</thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-[rgba(255,255,255,0.06)]">{children}</tbody>
          ),
          tr: ({ children }) => <tr>{children}</tr>,
          th: ({ children }) => (
            <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-3 text-sm text-[rgba(255,255,255,0.7)]">{children}</td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
});

// Memoized response panel for history items
export const MemoizedResponsePanel = React.memo(
  function MemoizedResponsePanel({
    modelId,
    modelName,
    content,
    error,
    isLoading,
  }: {
    modelId: string;
    modelName: string;
    content: string;
    error?: string;
    isLoading: boolean;
  }) {
    const provider = modelId.split("/")[0] || "unknown";

    return (
      <div className="flex flex-col h-full bg-[#0a0a0a] rounded-2xl border border-[rgba(255,255,255,0.08)] overflow-hidden hover:border-[rgba(91,247,49,0.2)] transition-colors">
        <div className="flex items-center gap-3 px-4 py-3 bg-[rgba(255,255,255,0.02)] border-b border-[rgba(255,255,255,0.06)]">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <div className="w-2.5 h-2.5 rounded-full bg-[#5BF731] shrink-0 shadow-[0_0_8px_rgba(91,247,49,0.5)]" />
            <span className="font-semibold text-white truncate text-sm">
              {modelName}
            </span>
          </div>
          <span className="text-[0.65rem] text-[rgba(255,255,255,0.4)] px-2 py-1 bg-[rgba(255,255,255,0.05)] rounded-lg shrink-0 font-medium">
            {provider}
          </span>
          {isLoading && (
            <div className="shrink-0 flex items-center gap-1.5 px-2 py-1 bg-[rgba(91,247,49,0.1)] rounded-lg">
              <div className="w-1.5 h-1.5 bg-[#5BF731] rounded-full animate-bounce [animation-delay:-0.3s]" />
              <div className="w-1.5 h-1.5 bg-[#5BF731] rounded-full animate-bounce [animation-delay:-0.15s]" />
              <div className="w-1.5 h-1.5 bg-[#5BF731] rounded-full animate-bounce" />
            </div>
          )}
        </div>
        <div className="flex-1 p-4 overflow-y-auto">
          {error ? (
            <div className="flex items-start gap-3 text-[#F7314C] bg-[rgba(247,49,76,0.08)] p-3 rounded-xl border border-[rgba(247,49,76,0.2)]">
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
              <span className="text-sm">{error}</span>
            </div>
          ) : content ? (
            <MemoizedMarkdown content={content} />
          ) : isLoading ? (
            <div className="text-[rgba(255,255,255,0.4)] text-sm italic flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-[#5BF731] border-t-transparent rounded-full animate-spin" />
              Thinking...
            </div>
          ) : (
            <div className="text-[rgba(255,255,255,0.3)] text-sm italic">
              Response will appear here...
            </div>
          )}
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison - only re-render if meaningful changes
    return (
      prevProps.modelId === nextProps.modelId &&
      prevProps.content === nextProps.content &&
      prevProps.error === nextProps.error &&
      prevProps.isLoading === nextProps.isLoading
    );
  }
);

// Memoized verdict panel
export const MemoizedVerdictPanel = React.memo(
  function MemoizedVerdictPanel({
    content,
    isLoading,
    error,
    modelName,
  }: {
    content: string;
    isLoading: boolean;
    error?: string;
    modelName: string;
  }) {
    return (
      <div className="bg-[rgba(91,247,49,0.03)] rounded-2xl border border-[rgba(91,247,49,0.15)] overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4 bg-[rgba(91,247,49,0.05)] border-b border-[rgba(91,247,49,0.1)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[rgba(91,247,49,0.15)] flex items-center justify-center">
              <svg
                className="w-5 h-5 text-[#5BF731]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-white text-base">
                Verdict & Consensus
              </h3>
              <p className="text-xs text-[rgba(255,255,255,0.5)]">
                Analyzed by <span className="text-[#5BF731]">{modelName}</span>
              </p>
            </div>
          </div>
          {isLoading && (
            <div className="ml-auto flex items-center gap-2 px-3 py-1.5 bg-[rgba(91,247,49,0.1)] rounded-lg">
              <div className="w-1.5 h-1.5 bg-[#5BF731] rounded-full animate-bounce [animation-delay:-0.3s]" />
              <div className="w-1.5 h-1.5 bg-[#5BF731] rounded-full animate-bounce [animation-delay:-0.15s]" />
              <div className="w-1.5 h-1.5 bg-[#5BF731] rounded-full animate-bounce" />
              <span className="text-xs text-[#5BF731] font-medium">Analyzing</span>
            </div>
          )}
        </div>
        <div className="p-5 max-h-[500px] overflow-y-auto">
          {error ? (
            <div className="flex items-start gap-3 text-[#F7314C] bg-[rgba(247,49,76,0.08)] p-3 rounded-xl border border-[rgba(247,49,76,0.2)]">
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
              <span className="text-sm">{error}</span>
            </div>
          ) : content ? (
            <MemoizedMarkdown content={content} />
          ) : isLoading ? (
            <div className="text-[rgba(255,255,255,0.5)] text-sm italic flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-[#5BF731] border-t-transparent rounded-full animate-spin" />
              Analyzing all responses to find consensus and differences...
            </div>
          ) : (
            <div className="text-[rgba(255,255,255,0.4)] text-sm italic">
              Verdict will appear here after all models respond...
            </div>
          )}
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.content === nextProps.content &&
      prevProps.isLoading === nextProps.isLoading &&
      prevProps.error === nextProps.error &&
      prevProps.modelName === nextProps.modelName
    );
  }
);

// Conversation turn item - heavily memoized
interface ConversationTurn {
  question: string;
  responses: Record<string, ModelResponse>;
  verdict: { content: string; isLoading: boolean; error?: string } | null;
  turnNumber?: number;
}

export const MemoizedConversationTurn = React.memo(
  function MemoizedConversationTurn({
    turn,
    index,
    verdictModelName,
  }: {
    turn: ConversationTurn;
    index: number;
    verdictModelName: string;
  }) {
    const respondedModels = useMemo(
      () => Object.keys(turn.responses),
      [turn.responses]
    );

    const historyGridCols = useMemo(() => {
      const count = respondedModels.length;
      if (count === 1) return "grid-cols-1";
      if (count === 2) return "grid-cols-1 lg:grid-cols-2";
      if (count <= 4) return "grid-cols-1 md:grid-cols-2";
      return "grid-cols-1 md:grid-cols-2 xl:grid-cols-3";
    }, [respondedModels.length]);

    const getModelName = useCallback((modelId: string) => {
      return (
        modelId
          .split("/")
          .pop()
          ?.split("-")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ") || modelId
      );
    }, []);

    return (
      <div className="mb-8 pb-8 border-b border-[rgba(255,255,255,0.06)]">
        {/* Turn Header */}
        <div className="mb-5 flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-[rgba(91,247,49,0.08)] border border-[rgba(91,247,49,0.2)] rounded-xl">
            <div className="w-6 h-6 rounded-lg bg-[rgba(91,247,49,0.2)] flex items-center justify-center">
              <span className="text-xs font-bold text-[#5BF731]">{turn.turnNumber || index + 1}</span>
            </div>
            <span className="text-sm text-[rgba(255,255,255,0.6)]">Turn</span>
          </div>
          <span className="text-[rgba(255,255,255,0.8)] font-medium">{turn.question}</span>
        </div>

        {/* Model Responses Grid */}
        <div className={`grid ${historyGridCols} gap-4 mb-5`}>
          {respondedModels.map((modelId) => {
            const response = turn.responses[modelId];
            return (
              <div key={modelId} className="min-h-[200px] max-h-[400px]">
                <MemoizedResponsePanel
                  modelId={modelId}
                  modelName={getModelName(modelId)}
                  content={response.content}
                  error={response.error}
                  isLoading={response.isLoading}
                />
              </div>
            );
          })}
        </div>

        {/* Verdict */}
        {turn.verdict && (
          <MemoizedVerdictPanel
            content={turn.verdict.content}
            isLoading={false}
            modelName={verdictModelName}
          />
        )}
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Deep comparison for turns - only re-render if actual content changed
    const prevTurn = prevProps.turn;
    const nextTurn = nextProps.turn;

    if (prevTurn.question !== nextTurn.question) return false;
    if (prevTurn.verdict?.content !== nextTurn.verdict?.content) return false;

    const prevKeys = Object.keys(prevTurn.responses);
    const nextKeys = Object.keys(nextTurn.responses);
    if (prevKeys.length !== nextKeys.length) return false;

    for (const key of prevKeys) {
      if (prevTurn.responses[key]?.content !== nextTurn.responses[key]?.content)
        return false;
      if (
        prevTurn.responses[key]?.isLoading !==
        nextTurn.responses[key]?.isLoading
      )
        return false;
    }

    return prevProps.verdictModelName === nextProps.verdictModelName;
  }
);

// Windowed/virtualized conversation list
interface VirtualizedConversationProps {
  conversationHistory: ConversationTurn[];
  verdictModelName: string;
  windowSize?: number; // How many recent turns to render fully
}

export function VirtualizedConversation({
  conversationHistory,
  verdictModelName,
  windowSize = 10,
}: VirtualizedConversationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleRange, setVisibleRange] = useState({
    start: 0,
    end: windowSize,
  });
  const [expandedTurns, setExpandedTurns] = useState<Set<number>>(new Set());

  // Calculate visible range based on scroll position
  const updateVisibleRange = useCallback(() => {
    if (!containerRef.current) return;

    const totalTurns = conversationHistory.length;
    if (totalTurns <= windowSize) {
      setVisibleRange({ start: 0, end: totalTurns });
      return;
    }

    // Always show the last windowSize turns fully rendered
    // Older turns get collapsed
    const start = Math.max(0, totalTurns - windowSize);
    setVisibleRange({ start, end: totalTurns });
  }, [conversationHistory.length, windowSize]);

  useEffect(() => {
    const handleResize = () => {
      updateVisibleRange();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateVisibleRange]);

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

  // Render collapsed turn (summary only)
  const renderCollapsedTurn = useCallback(
    (turn: ConversationTurn, index: number) => {
      const modelCount = Object.keys(turn.responses).length;
      return (
        <div
          key={index}
          className="mb-3 px-4 py-3.5 bg-[rgba(255,255,255,0.02)] rounded-xl cursor-pointer hover:bg-[rgba(255,255,255,0.04)] transition-colors border border-[rgba(255,255,255,0.06)] hover:border-[rgba(91,247,49,0.2)]"
          onClick={() => toggleExpandTurn(index)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="w-7 h-7 rounded-lg bg-[rgba(91,247,49,0.1)] flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-[#5BF731]">{turn.turnNumber || index + 1}</span>
              </div>
              <span className="text-[rgba(255,255,255,0.7)] truncate text-sm">{turn.question}</span>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs text-[rgba(255,255,255,0.4)] bg-[rgba(255,255,255,0.05)] px-2 py-1 rounded-lg">
                {modelCount} responses
              </span>
              <svg
                className="w-4 h-4 text-[rgba(255,255,255,0.4)]"
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
    },
    [toggleExpandTurn]
  );

  // Render expanded turn (full content)
  const renderExpandedTurn = useCallback(
    (turn: ConversationTurn, index: number, isOldTurn: boolean) => {
      if (isOldTurn) {
        return (
          <div key={index} className="relative">
            <button
              onClick={() => toggleExpandTurn(index)}
              className="absolute top-3 right-3 z-10 px-3 py-1.5 bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] rounded-lg text-xs text-[rgba(255,255,255,0.5)] hover:text-white transition-colors flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
              Collapse
            </button>
            <MemoizedConversationTurn
              turn={turn}
              index={index}
              verdictModelName={verdictModelName}
            />
          </div>
        );
      }
      return (
        <MemoizedConversationTurn
          key={index}
          turn={turn}
          index={index}
          verdictModelName={verdictModelName}
        />
      );
    },
    [verdictModelName, toggleExpandTurn]
  );

  if (conversationHistory.length === 0) {
    return null;
  }

  return (
    <div ref={containerRef}>
      {/* Collapsed older turns */}
      {visibleRange.start > 0 && (
        <div className="mb-6">
          <div className="text-xs text-[rgba(255,255,255,0.4)] mb-3 px-2 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {visibleRange.start} older turn{visibleRange.start > 1 ? "s" : ""}{" "}
            <span className="text-[rgba(255,255,255,0.3)]">• click to expand</span>
          </div>
          {conversationHistory
            .slice(0, visibleRange.start)
            .map((turn, index) =>
              expandedTurns.has(index)
                ? renderExpandedTurn(turn, index, true)
                : renderCollapsedTurn(turn, index)
            )}
        </div>
      )}

      {/* Fully rendered recent turns */}
      {conversationHistory
        .slice(visibleRange.start, visibleRange.end)
        .map((turn, i) => {
          const actualIndex = visibleRange.start + i;
          return (
            <MemoizedConversationTurn
              key={actualIndex}
              turn={turn}
              index={actualIndex}
              verdictModelName={verdictModelName}
            />
          );
        })}
    </div>
  );
}

// Hook for debounced streaming updates
export function useDebouncedStreamingState<T>(
  initialValue: T,
  debounceMs: number = 50
) {
  const [value, setValue] = useState<T>(initialValue);
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pendingValueRef = useRef<T>(initialValue);

  const setValueDebounced = useCallback(
    (newValue: T | ((prev: T) => T)) => {
      const resolvedValue =
        typeof newValue === "function"
          ? (newValue as (prev: T) => T)(pendingValueRef.current)
          : newValue;

      pendingValueRef.current = resolvedValue;
      setValue(resolvedValue);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setDebouncedValue(resolvedValue);
      }, debounceMs);
    },
    [debounceMs]
  );

  // Flush immediately (for final updates)
  const flush = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setDebouncedValue(pendingValueRef.current);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { value, debouncedValue, setValue: setValueDebounced, flush };
}

export { MemoizedMarkdown };
