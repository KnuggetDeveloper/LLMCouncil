"use client";

import React, { memo } from "react";
import { MemoizedMarkdown } from "./VirtualizedConversation";

interface VerdictPanelProps {
  content: string;
  isLoading: boolean;
  error?: string;
  modelName: string;
}

function VerdictPanelInner({
  content,
  isLoading,
  error,
  modelName,
}: VerdictPanelProps) {
  return (
    <div className="bg-[rgba(91,247,49,0.03)] rounded-2xl border border-[rgba(91,247,49,0.15)] overflow-hidden">
      {/* Header */}
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
            <h3 className="font-bold text-white text-base">Verdict & Consensus</h3>
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

      {/* Content */}
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
}

// Memoize with custom comparison
const VerdictPanel = memo(VerdictPanelInner, (prevProps, nextProps) => {
  return (
    prevProps.content === nextProps.content &&
    prevProps.isLoading === nextProps.isLoading &&
    prevProps.error === nextProps.error &&
    prevProps.modelName === nextProps.modelName
  );
});

VerdictPanel.displayName = "VerdictPanel";

export default VerdictPanel;
