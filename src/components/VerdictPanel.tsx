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
    <div className="bg-linear-to-br from-purple-900/30 to-blue-900/30 rounded-2xl border border-purple-500/30 overflow-hidden">
      {/* Header */}
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
            <h3 className="font-bold text-white text-lg">Verdict & Consensus</h3>
            <p className="text-xs text-purple-300">
              Analyzed by {modelName}
            </p>
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

      {/* Content */}
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
