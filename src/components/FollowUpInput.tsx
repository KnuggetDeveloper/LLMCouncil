"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface FollowUpInputProps {
  onSubmit: (question: string) => void;
  disabled?: boolean;
  placeholder?: string;
  colorClass?: "green" | "red" | "gold";
}

export default function FollowUpInput({
  onSubmit,
  disabled = false,
  placeholder = "Ask a follow-up question...",
  colorClass = "green",
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
    green: {
      border: "border-[rgba(91,247,49,0.2)]",
      hoverBorder: "hover:border-[rgba(91,247,49,0.3)]",
      focusBorder: "focus:border-[rgba(91,247,49,0.5)]",
      ring: "focus:ring-[#5BF731]",
      button: "bg-[#5BF731] hover:bg-[#4de028] text-[#050505]",
      glow: "shadow-[0_0_20px_rgba(91,247,49,0.15)]",
    },
    red: {
      border: "border-[rgba(247,49,76,0.2)]",
      hoverBorder: "hover:border-[rgba(247,49,76,0.3)]",
      focusBorder: "focus:border-[rgba(247,49,76,0.5)]",
      ring: "focus:ring-[#F7314C]",
      button: "bg-[#F7314C] hover:bg-[#e52d45] text-white",
      glow: "shadow-[0_0_20px_rgba(247,49,76,0.15)]",
    },
    gold: {
      border: "border-[rgba(247,198,49,0.2)]",
      hoverBorder: "hover:border-[rgba(247,198,49,0.3)]",
      focusBorder: "focus:border-[rgba(247,198,49,0.5)]",
      ring: "focus:ring-[#F7C631]",
      button: "bg-[#F7C631] hover:bg-[#e5b62e] text-[#050505]",
      glow: "shadow-[0_0_20px_rgba(247,198,49,0.15)]",
    },
  };

  const c = colors[colorClass];

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <div className={`relative bg-[rgba(255,255,255,0.02)] rounded-2xl border ${c.border} ${c.hoverBorder} transition-all ${c.glow}`}>
        <div className="flex items-center gap-2 px-4 py-2 border-b border-[rgba(255,255,255,0.06)]">
          <svg className="w-4 h-4 text-[rgba(255,255,255,0.4)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <span className="text-xs text-[rgba(255,255,255,0.4)] font-medium">Follow-up Question</span>
        </div>
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            rows={1}
            className={`w-full px-4 py-3 pr-14 bg-transparent text-white placeholder-[rgba(255,255,255,0.3)] focus:outline-none rounded-b-2xl resize-none overflow-hidden min-h-[48px] text-sm`}
            disabled={disabled}
          />
          <button
            type="submit"
            disabled={disabled || !question.trim()}
            className={`absolute right-3 bottom-3 p-2.5 ${c.button} disabled:bg-[rgba(255,255,255,0.05)] disabled:text-[rgba(255,255,255,0.2)] disabled:cursor-not-allowed rounded-xl transition-all flex items-center justify-center font-semibold`}
            title="Send follow-up (Enter)"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </div>
      <p className="mt-2 text-xs text-[rgba(255,255,255,0.3)] px-1">
        Press Enter to send, Shift+Enter for new line
      </p>
    </form>
  );
}
