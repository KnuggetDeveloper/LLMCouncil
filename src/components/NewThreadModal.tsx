"use client";

import { useState, useEffect } from "react";

export type ThreadMode = "multiask" | "critique" | "premortem";

interface NewThreadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (title: string, mode: ThreadMode) => void;
  defaultMode?: ThreadMode;
}

export default function NewThreadModal({
  isOpen,
  onClose,
  onCreate,
  defaultMode = "multiask",
}: NewThreadModalProps) {
  const [title, setTitle] = useState("");
  const [mode, setMode] = useState<ThreadMode>(defaultMode);

  // Update mode when defaultMode prop changes
  useEffect(() => {
    setMode(defaultMode);
  }, [defaultMode]);

  if (!isOpen) return null;

  const handleCreate = () => {
    onCreate(title.trim() || "New Conversation", mode);
    setTitle("");
    onClose();
  };

  const getModeColor = () => {
    switch (mode) {
      case "critique":
        return "bg-[#F7314C] hover:bg-[#e52d45]";
      case "premortem":
        return "bg-[#F7C631] hover:bg-[#e5b62e] text-[#050505]";
      default:
        return "bg-[#5BF731] hover:bg-[#4de028] text-[#050505]";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-[#0a0a0a] rounded-2xl shadow-2xl w-full max-w-lg border border-[rgba(255,255,255,0.1)] p-6">
        <h2 className="text-xl font-bold text-white mb-6">New Conversation</h2>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[rgba(255,255,255,0.7)] mb-2">
              Title (optional)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., API Design Discussion"
              className="w-full px-4 py-3 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-xl text-white placeholder-[rgba(255,255,255,0.3)] focus:outline-none focus:ring-2 focus:ring-[#5BF731] focus:border-transparent transition-all"
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[rgba(255,255,255,0.7)] mb-3">
              Mode
            </label>
            <div className="grid grid-cols-3 gap-3">
              {/* MultiAsk */}
              <button
                onClick={() => setMode("multiask")}
                className={`p-4 rounded-xl border text-left transition-all ${
                  mode === "multiask"
                    ? "bg-[rgba(91,247,49,0.15)] border-[rgba(91,247,49,0.5)] text-[#5BF731]"
                    : "bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.5)] hover:border-[rgba(255,255,255,0.15)] hover:bg-[rgba(255,255,255,0.04)]"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
                    mode === "multiask"
                      ? "bg-[rgba(91,247,49,0.2)]"
                      : "bg-[rgba(255,255,255,0.05)]"
                  }`}
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
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <div className="font-semibold text-sm">MultiAsk</div>
                <div className="text-[0.7rem] mt-1 opacity-60">
                  Query multiple models
                </div>
              </button>

              {/* Critique Chain */}
              <button
                onClick={() => setMode("critique")}
                className={`p-4 rounded-xl border text-left transition-all ${
                  mode === "critique"
                    ? "bg-[rgba(247,49,76,0.15)] border-[rgba(247,49,76,0.5)] text-[#F7314C]"
                    : "bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.5)] hover:border-[rgba(255,255,255,0.15)] hover:bg-[rgba(255,255,255,0.04)]"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
                    mode === "critique"
                      ? "bg-[rgba(247,49,76,0.2)]"
                      : "bg-[rgba(255,255,255,0.05)]"
                  }`}
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
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                </div>
                <div className="font-semibold text-sm">Critique Chain</div>
                <div className="text-[0.7rem] mt-1 opacity-60">
                  Primary → Critics → Review
                </div>
              </button>

              {/* Pre-mortem */}
              <button
                onClick={() => setMode("premortem")}
                className={`p-4 rounded-xl border text-left transition-all ${
                  mode === "premortem"
                    ? "bg-[rgba(247,198,49,0.15)] border-[rgba(247,198,49,0.5)] text-[#F7C631]"
                    : "bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.5)] hover:border-[rgba(255,255,255,0.15)] hover:bg-[rgba(255,255,255,0.04)]"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
                    mode === "premortem"
                      ? "bg-[rgba(247,198,49,0.2)]"
                      : "bg-[rgba(255,255,255,0.05)]"
                  }`}
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
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <div className="font-semibold text-sm">Pre-mortem</div>
                <div className="text-[0.7rem] mt-1 opacity-60">
                  Red Team → Blue Team
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.06)] text-[rgba(255,255,255,0.7)] border border-[rgba(255,255,255,0.08)] rounded-xl transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            className={`flex-1 py-3 font-semibold rounded-xl transition-all ${getModeColor()}`}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
