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
        return "bg-purple-600 hover:bg-purple-700";
      case "premortem":
        return "bg-rose-600 hover:bg-rose-700";
      default:
        return "bg-blue-600 hover:bg-blue-700";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg border border-gray-700 p-6">
        <h2 className="text-xl font-bold text-white mb-6">New Conversation</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Title (optional)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., API Design Discussion"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Mode
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setMode("multiask")}
                className={`p-4 rounded-xl border text-left transition-all ${
                  mode === "multiask"
                    ? "bg-blue-600/20 border-blue-500 text-blue-400"
                    : "bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600"
                }`}
              >
                <svg className="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <div className="font-medium text-sm">MultiAsk</div>
                <div className="text-xs mt-1 opacity-70">
                  Query multiple models
                </div>
              </button>
              <button
                onClick={() => setMode("critique")}
                className={`p-4 rounded-xl border text-left transition-all ${
                  mode === "critique"
                    ? "bg-purple-600/20 border-purple-500 text-purple-400"
                    : "bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600"
                }`}
              >
                <svg className="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                <div className="font-medium text-sm">Critique Chain</div>
                <div className="text-xs mt-1 opacity-70">
                  Primary → Critics → Review
                </div>
              </button>
              <button
                onClick={() => setMode("premortem")}
                className={`p-4 rounded-xl border text-left transition-all ${
                  mode === "premortem"
                    ? "bg-rose-600/20 border-rose-500 text-rose-400"
                    : "bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600"
                }`}
              >
                <svg className="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div className="font-medium text-sm">Pre-mortem</div>
                <div className="text-xs mt-1 opacity-70">
                  Red Team → Blue Team
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            className={`flex-1 py-3 text-white rounded-xl transition-colors ${getModeColor()}`}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
