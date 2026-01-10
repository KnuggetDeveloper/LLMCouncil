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
    <div className="flex flex-col h-full bg-[#0a0a0a] rounded-2xl border border-[rgba(255,255,255,0.08)] overflow-hidden hover:border-[rgba(91,247,49,0.2)] transition-colors group">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-[rgba(255,255,255,0.02)] border-b border-[rgba(255,255,255,0.06)]">
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <div className="w-2.5 h-2.5 rounded-full bg-[#5BF731] shrink-0 shadow-[0_0_8px_rgba(91,247,49,0.5)]" />
          <span className="font-semibold text-white truncate text-sm">
            {model.name}
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

      {/* Content */}
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
