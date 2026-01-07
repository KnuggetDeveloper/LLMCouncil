"use client";

import React, { memo, useMemo } from "react";
import { Model, ModelResponse } from "../../types";
import { MemoizedMarkdown } from "./VirtualizedConversation";

interface ResponsePanelProps {
  model: Model;
  response: ModelResponse | undefined;
}

function ResponsePanelInner({ model, response }: ResponsePanelProps) {
  const isLoading = response?.isLoading ?? false;
  const content = response?.content ?? "";
  const error = response?.error;

  // Extract provider from model ID - memoize to prevent recalculation
  const provider = useMemo(
    () => model.id.split("/")[0] || "unknown",
    [model.id]
  );

  return (
    <div className="flex flex-col h-full bg-gray-900 rounded-2xl border border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-gray-800/50 border-b border-gray-700">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <div className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
          <span className="font-semibold text-white truncate">
            {model.name}
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

      {/* Content */}
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
}

// Memoize with custom comparison to prevent unnecessary re-renders
const ResponsePanel = memo(ResponsePanelInner, (prevProps, nextProps) => {
  // Only re-render if meaningful data changed
  const prevResponse = prevProps.response;
  const nextResponse = nextProps.response;

  // Model changed
  if (prevProps.model.id !== nextProps.model.id) return false;
  if (prevProps.model.name !== nextProps.model.name) return false;

  // Both undefined - no change
  if (!prevResponse && !nextResponse) return true;

  // One is undefined - changed
  if (!prevResponse || !nextResponse) return false;

  // Compare response properties
  return (
    prevResponse.content === nextResponse.content &&
    prevResponse.isLoading === nextResponse.isLoading &&
    prevResponse.error === nextResponse.error
  );
});

ResponsePanel.displayName = "ResponsePanel";

export default ResponsePanel;
