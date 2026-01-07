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
            <h1 className="text-2xl font-bold text-white mt-6 mb-4 first:mt-0">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl font-bold text-white mt-5 mb-3 first:mt-0">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg font-semibold text-white mt-4 mb-2 first:mt-0">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-base font-semibold text-white mt-3 mb-2 first:mt-0">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="text-gray-200 leading-relaxed mb-4 last:mb-0">
              {children}
            </p>
          ),
          strong: ({ children }) => (
            <strong className="font-bold text-white">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic text-gray-300">{children}</em>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-outside ml-5 mb-4 space-y-1.5 text-gray-200">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-outside ml-5 mb-4 space-y-1.5 text-gray-200">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-gray-200 leading-relaxed">{children}</li>
          ),
          code: ({ className, children }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code className="px-1.5 py-0.5 bg-gray-800 text-pink-400 rounded text-sm font-mono">
                  {children}
                </code>
              );
            }
            return <code className="text-sm font-mono">{children}</code>;
          },
          pre: ({ children }) => (
            <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto mb-4 text-sm">
              {children}
            </pre>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-blue-500 pl-4 py-1 my-4 text-gray-300 italic bg-gray-800/30 rounded-r">
              {children}
            </blockquote>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
            >
              {children}
            </a>
          ),
          hr: () => <hr className="border-gray-700 my-6" />,
          table: ({ children }) => (
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full border border-gray-700 rounded-lg overflow-hidden">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-gray-800">{children}</thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-gray-700">{children}</tbody>
          ),
          tr: ({ children }) => <tr>{children}</tr>,
          th: ({ children }) => (
            <th className="px-4 py-2 text-left text-sm font-semibold text-white">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-2 text-sm text-gray-300">{children}</td>
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
      <div className="flex flex-col h-full bg-gray-900 rounded-2xl border border-gray-700 overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 bg-gray-800/50 border-b border-gray-700">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <div className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
            <span className="font-semibold text-white truncate">
              {modelName}
            </span>
          </div>
          <span className="text-xs text-gray-500 px-2 py-0.5 bg-gray-700 rounded-full shrink-0">
            {provider}
          </span>
          {isLoading && (
            <div className="shrink-0">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
              </div>
            </div>
          )}
        </div>
        <div className="flex-1 p-4 overflow-y-auto">
          {error ? (
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
              <span className="text-sm">{error}</span>
            </div>
          ) : content ? (
            <MemoizedMarkdown content={content} />
          ) : isLoading ? (
            <div className="text-gray-500 text-sm italic">Thinking...</div>
          ) : (
            <div className="text-gray-600 text-sm italic">
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
      <div className="bg-linear-to-br from-purple-900/30 to-blue-900/30 rounded-2xl border border-purple-500/30 overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4 bg-purple-900/20 border-b border-purple-500/20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-purple-500 to-blue-500 flex items-center justify-center">
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">
                Verdict & Consensus
              </h3>
              <p className="text-xs text-purple-300">Analyzed by {modelName}</p>
            </div>
          </div>
          {isLoading && (
            <div className="ml-auto">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
              </div>
            </div>
          )}
        </div>
        <div className="p-5 max-h-[500px] overflow-y-auto">
          {error ? (
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
              <span className="text-sm">{error}</span>
            </div>
          ) : content ? (
            <MemoizedMarkdown content={content} />
          ) : isLoading ? (
            <div className="text-purple-300 text-sm italic">
              Analyzing all responses to find consensus and differences...
            </div>
          ) : (
            <div className="text-gray-500 text-sm italic">
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
      <div className="mb-8 pb-6 border-b border-gray-800">
        <div className="mb-4 px-4 py-2 bg-gray-800/50 rounded-lg inline-block">
          <span className="text-xs text-gray-400">
            Turn {turn.turnNumber || index + 1}:
          </span>
          <span className="ml-2 text-gray-300">{turn.question}</span>
        </div>
        <div className={`grid ${historyGridCols} gap-4 mb-4`}>
          {respondedModels.map((modelId) => {
            const response = turn.responses[modelId];
            return (
              <div key={modelId} className="min-h-[200px] max-h-[300px]">
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
          className="mb-2 px-4 py-3 bg-gray-800/30 rounded-lg cursor-pointer hover:bg-gray-800/50 transition-colors border border-gray-700/50"
          onClick={() => toggleExpandTurn(index)}
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
                {modelCount} responses
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
              className="absolute top-2 right-2 z-10 px-2 py-1 bg-gray-800 hover:bg-gray-700 rounded text-xs text-gray-400 transition-colors"
            >
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
        <div className="mb-4">
          <div className="text-xs text-gray-500 mb-2 px-2">
            {visibleRange.start} older turn{visibleRange.start > 1 ? "s" : ""}{" "}
            (click to expand)
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
