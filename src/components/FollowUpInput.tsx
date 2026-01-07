"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface FollowUpInputProps {
  onSubmit: (question: string) => void;
  disabled?: boolean;
  placeholder?: string;
  colorClass?: "blue" | "purple";
}

export default function FollowUpInput({
  onSubmit,
  disabled = false,
  placeholder = "Ask a follow-up question...",
  colorClass = "blue",
}: FollowUpInputProps) {
  const [question, setQuestion] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustTextareaHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
    }
  }, []);

  useEffect(() => {
    adjustTextareaHeight();
  }, [question, adjustTextareaHeight]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim() && !disabled) {
      onSubmit(question.trim());
      setQuestion("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const colors = {
    blue: {
      border: "border-blue-500/30",
      ring: "focus:ring-blue-500",
      button: "from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700",
    },
    purple: {
      border: "border-purple-500/30",
      ring: "focus:ring-purple-500",
      button: "from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700",
    },
  };

  const c = colors[colorClass];

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <div className={`relative bg-gray-900/50 rounded-2xl border ${c.border} p-1`}>
        <textarea
          ref={textareaRef}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={1}
          className={`w-full px-5 py-3 pr-14 bg-transparent text-white placeholder-gray-500 focus:outline-none ${c.ring} focus:ring-1 rounded-xl resize-none overflow-hidden min-h-[48px]`}
          disabled={disabled}
        />
        <button
          type="submit"
          disabled={disabled || !question.trim()}
          className={`absolute right-3 bottom-3 p-2 bg-gradient-to-r ${c.button} disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed text-white rounded-lg transition-all flex items-center justify-center`}
          title="Send follow-up (Enter)"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>
      <p className="mt-2 text-xs text-gray-600">
        Continue the conversation with follow-up questions
      </p>
    </form>
  );
}
