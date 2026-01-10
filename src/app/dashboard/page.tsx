/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
  useTransition,
} from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useModels } from "@/context/ModelsContext";
import { useProject } from "@/context/ProjectContext";
import { ModelResponse, FileAttachment } from "../../../types";
import SettingsModal from "@/components/SettingsModal";
import ResponsePanel from "@/components/ResponsePanel";
import VerdictPanel from "@/components/VerdictPanel";
import CritiqueChain from "@/components/CritiqueChain";
import PreMortem from "@/components/PreMortem";
import FollowUpInput from "@/components/FollowUpInput";
import NewThreadModal, { ThreadMode } from "@/components/NewThreadModal";
import FileUpload from "@/components/FileUpload";
import { VirtualizedConversation } from "@/components/VirtualizedConversation";
import CreditsDisplay from "@/components/CreditsDisplay";
import ConfirmDialog from "@/components/ConfirmDialog";
import {
  reconstructMultiAskHistory,
  Message,
  getLatestTurnNumber,
} from "@/lib/conversation-utils";

// Convert FileAttachment to API format
function convertAttachmentsForAPI(attachments: FileAttachment[]) {
  return attachments.map((att) => {
    if (att.type === "image") {
      return {
        type: "image" as const,
        data: att.data,
        mimeType: att.mimeType,
      };
    } else {
      return {
        type: "pdf" as const,
        data: att.base64 || att.data,
        name: att.name,
      };
    }
  });
}

interface VerdictResponse {
  content: string;
  isLoading: boolean;
  error?: string;
}

interface ConversationTurn {
  question: string;
  responses: Record<string, ModelResponse>;
  verdict: VerdictResponse | null;
  turnNumber?: number;
}

// Debounce helper for streaming updates
function useStreamingDebounce<T>(initialValue: T, debounceMs: number = 50) {
  const [value, setValue] = useState<T>(initialValue);
  const [displayValue, setDisplayValue] = useState<T>(initialValue);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const latestValueRef = useRef<T>(initialValue);

  const setValueDebounced = useCallback(
    (newValue: T | ((prev: T) => T)) => {
      const resolvedValue =
        typeof newValue === "function"
          ? (newValue as (prev: T) => T)(latestValueRef.current)
          : newValue;

      latestValueRef.current = resolvedValue;
      setValue(resolvedValue);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setDisplayValue(resolvedValue);
      }, debounceMs);
    },
    [debounceMs]
  );

  const flush = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setDisplayValue(latestValueRef.current);
  }, []);

  const reset = useCallback((newValue: T) => {
    latestValueRef.current = newValue;
    setValue(newValue);
    setDisplayValue(newValue);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { value, displayValue, setValue: setValueDebounced, flush, reset };
}

// Modern Sidebar Component
function ModernSidebar({
  isCollapsed,
  setIsCollapsed,
  onNewThread,
  onOpenSettings,
}: {
  isCollapsed: boolean;
  setIsCollapsed: (v: boolean) => void;
  onNewThread: (mode: ThreadMode) => void;
  onOpenSettings: () => void;
}) {
  const { user, logout } = useAuth();
  const {
    projects,
    currentProject,
    threads,
    currentThread,
    createProject,
    selectProject,
    selectThread,
    deleteProject,
    deleteThread,
  } = useProject();

  const [searchQuery, setSearchQuery] = useState("");
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(
    new Set(currentProject ? [currentProject.id] : [])
  );
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
  });

  const filteredThreads = threads.filter((t) =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleProjectExpanded = (projectId: string) => {
    setExpandedProjects((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(projectId)) {
        newSet.delete(projectId);
      } else {
        newSet.add(projectId);
      }
      return newSet;
    });
  };

  const handleDeleteProject = (projectId: string, projectName: string) => {
    setConfirmDialog({
      isOpen: true,
      title: "Delete Project",
      message: `Are you sure you want to delete "${projectName}" and all its chats? This action cannot be undone.`,
      onConfirm: () => {
        deleteProject(projectId);
        setConfirmDialog({ ...confirmDialog, isOpen: false });
      },
    });
  };

  const handleDeleteThread = (threadId: string, threadTitle: string) => {
    setConfirmDialog({
      isOpen: true,
      title: "Delete Chat",
      message: `Are you sure you want to delete "${threadTitle}"? This action cannot be undone.`,
      onConfirm: () => {
        deleteThread(threadId);
        setConfirmDialog({ ...confirmDialog, isOpen: false });
      },
    });
  };

  return (
    <aside
      className={`h-screen flex flex-col bg-[#0a0a0a] border-r border-[rgba(255,255,255,0.06)] transition-all duration-300 ease-out ${
        isCollapsed ? "w-[72px]" : "w-[280px]"
      }`}
    >
      {/* Header - Always show logo */}
      <div className="p-4 flex items-center justify-between border-b border-[rgba(255,255,255,0.06)]">
        <div
          className={`flex items-center gap-2 ${
            isCollapsed ? "justify-center w-full" : ""
          }`}
        >
          <Image
            src="/logo.png"
            alt="Logo"
            width={32}
            height={32}
            className="object-contain"
          />
          {!isCollapsed && (
            <span className="font-syne font-bold text-lg text-white">
              rigorus
            </span>
          )}
        </div>
        {!isCollapsed && (
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-[rgba(255,255,255,0.05)] transition-colors text-[rgba(255,255,255,0.5)] hover:text-white"
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
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Collapsed: Toggle button */}
      {isCollapsed && (
        <div className="p-2 flex justify-center border-b border-[rgba(255,255,255,0.06)]">
          <button
            onClick={() => setIsCollapsed(false)}
            className="p-2 rounded-lg hover:bg-[rgba(255,255,255,0.05)] transition-colors text-[rgba(255,255,255,0.5)] hover:text-white"
          >
            <svg
              className="w-5 h-5 rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              />
            </svg>
          </button>
        </div>
      )}

      {/* Quick Actions */}
      {currentProject ? (
        // Show "New Chat" only when a project is selected
        <div
          className={`p-3 border-b border-[rgba(255,255,255,0.06)] ${
            isCollapsed ? "flex flex-col items-center gap-2" : "flex gap-2"
          }`}
        >
          <button
            onClick={() => onNewThread("multiask")}
            className={`flex items-center justify-center gap-2 bg-[#5BF731] hover:bg-[#4de028] text-[#050505] font-semibold rounded-xl transition-all ${
              isCollapsed ? "p-3" : "flex-1 px-4 py-2.5"
            }`}
            title="New Chat"
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            {!isCollapsed && <span className="text-sm">New Chat</span>}
          </button>
        </div>
      ) : null}

      {/* Search - Expanded only */}
      {!isCollapsed && (
        <div className="p-3">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgba(255,255,255,0.3)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-xl text-sm text-white placeholder-[rgba(255,255,255,0.3)] focus:outline-none focus:border-[rgba(91,247,49,0.3)] transition-colors"
            />
          </div>
        </div>
      )}

      {/* Projects & Chats List */}
      <div className="flex-1 overflow-y-auto p-2">
        {!isCollapsed ? (
          <div className="space-y-1">
            {/* Section Label */}
            <p className="text-[0.65rem] uppercase tracking-wider text-[rgba(255,255,255,0.3)] font-semibold px-2 mb-2">
              Projects
            </p>

            {projects.length === 0 ? (
              <p className="text-[rgba(255,255,255,0.3)] text-sm text-center py-4">
                No projects yet
              </p>
            ) : (
              projects.map((project) => {
                const isExpanded = expandedProjects.has(project.id);
                const isSelected = currentProject?.id === project.id;
                const projectThreads = isSelected ? filteredThreads : [];

                return (
                  <div key={project.id} className="mb-1">
                    {/* Project Header */}
                    <div
                      className={`group relative flex items-center rounded-xl transition-all ${
                        isSelected
                          ? "bg-[rgba(91,247,49,0.08)]"
                          : "hover:bg-[rgba(255,255,255,0.03)]"
                      }`}
                    >
                      <button
                        onClick={() => {
                          selectProject(project);
                          toggleProjectExpanded(project.id);
                        }}
                        className={`flex-1 text-left px-3 py-2.5 flex items-center gap-2 ${
                          isSelected
                            ? "text-white"
                            : "text-[rgba(255,255,255,0.7)]"
                        }`}
                      >
                        <svg
                          className={`w-4 h-4 transition-transform ${
                            isExpanded ? "rotate-90" : ""
                          } text-[rgba(255,255,255,0.4)]`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                        <div
                          className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                            isSelected
                              ? "bg-[rgba(91,247,49,0.2)] text-[#5BF731]"
                              : "bg-[rgba(255,255,255,0.05)] text-[rgba(255,255,255,0.5)]"
                          }`}
                        >
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                            />
                          </svg>
                        </div>
                        <span className="text-sm font-medium truncate flex-1">
                          {project.name}
                        </span>
                        {isSelected && projectThreads.length > 0 && (
                          <span className="text-[0.65rem] text-[rgba(255,255,255,0.4)]">
                            {projectThreads.length}
                          </span>
                        )}
                      </button>
                      {/* Delete Project Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteProject(project.id, project.name);
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1.5 mr-2 rounded-lg hover:bg-[rgba(247,49,76,0.15)] text-[rgba(255,255,255,0.4)] hover:text-[#F7314C] transition-all"
                        title="Delete project"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>

                    {/* Project Chats - Collapsed under project */}
                    {isExpanded && isSelected && (
                      <div className="ml-6 mt-1 space-y-0.5 border-l border-[rgba(255,255,255,0.06)] pl-2">
                        {projectThreads.length === 0 ? (
                          <p className="text-[rgba(255,255,255,0.3)] text-xs py-2 pl-2">
                            No chats yet
                          </p>
                        ) : (
                          projectThreads.map((thread) => (
                            <div
                              key={thread.id}
                              className={`group relative flex items-center rounded-lg transition-all ${
                                currentThread?.id === thread.id
                                  ? "bg-[rgba(91,247,49,0.1)]"
                                  : "hover:bg-[rgba(255,255,255,0.03)]"
                              }`}
                            >
                              <button
                                onClick={() => selectThread(thread)}
                                className={`flex-1 text-left px-2 py-2 flex items-center gap-2 ${
                                  currentThread?.id === thread.id
                                    ? "text-white"
                                    : "text-[rgba(255,255,255,0.6)]"
                                }`}
                              >
                                <div
                                  className={`w-5 h-5 rounded flex items-center justify-center shrink-0 ${
                                    thread.mode === "critique"
                                      ? "text-[#F7314C]"
                                      : thread.mode === "premortem"
                                      ? "text-[#F7C631]"
                                      : "text-[#5BF731]"
                                  }`}
                                >
                                  {thread.mode === "critique" ? (
                                    <svg
                                      className="w-3.5 h-3.5"
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
                                  ) : thread.mode === "premortem" ? (
                                    <svg
                                      className="w-3.5 h-3.5"
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
                                  ) : (
                                    <svg
                                      className="w-3.5 h-3.5"
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
                                  )}
                                </div>
                                <span className="text-xs truncate flex-1">
                                  {thread.title}
                                </span>
                              </button>
                              {/* Delete Chat Button */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteThread(thread.id, thread.title);
                                }}
                                className="opacity-0 group-hover:opacity-100 p-1 mr-1 rounded hover:bg-[rgba(247,49,76,0.15)] text-[rgba(255,255,255,0.4)] hover:text-[#F7314C] transition-all"
                                title="Delete chat"
                              >
                                <svg
                                  className="w-3.5 h-3.5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        ) : (
          /* Collapsed: Show project icons */
          <div className="flex flex-col items-center gap-2">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => selectProject(project)}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  currentProject?.id === project.id
                    ? "bg-[rgba(91,247,49,0.2)] text-[#5BF731]"
                    : "hover:bg-[rgba(255,255,255,0.05)] text-[rgba(255,255,255,0.5)]"
                }`}
                title={project.name}
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
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  />
                </svg>
              </button>
            ))}
          </div>
        )}
      </div>
      {/* Credits Display */}
      <div
        className={`p-3 border-t border-[rgba(255,255,255,0.06)] ${
          isCollapsed ? "flex justify-center" : ""
        }`}
      >
        <CreditsDisplay isCollapsed={isCollapsed} />
      </div>

      {/* Bottom Actions */}
      <div
        className={`p-3 border-t border-[rgba(255,255,255,0.06)] ${
          isCollapsed
            ? "flex flex-col items-center gap-2"
            : "flex items-center gap-2"
        }`}
      >
        <button
          onClick={onOpenSettings}
          className={`flex items-center justify-center gap-2 text-[rgba(255,255,255,0.5)] hover:text-white hover:bg-[rgba(255,255,255,0.05)] rounded-xl transition-all ${
            isCollapsed ? "p-3" : "flex-1 px-3 py-2"
          }`}
          title="Settings"
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
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          {!isCollapsed && <span className="text-sm">Settings</span>}
        </button>

        {user && (
          <button
            onClick={logout}
            className={`flex items-center justify-center gap-2 text-[rgba(255,255,255,0.5)] hover:text-[#F7314C] hover:bg-[rgba(247,49,76,0.1)] rounded-xl transition-all ${
              isCollapsed ? "p-3" : "px-3 py-2"
            }`}
            title="Sign Out"
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
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        message={confirmDialog.message}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        onConfirm={confirmDialog.onConfirm}
        onCancel={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
      />
    </aside>
  );
}

export default function Dashboard() {
  const router = useRouter();
  const { user, isLoading: authLoading, getIdToken } = useAuth();
  const { models, verdictModel } = useModels();
  const {
    currentProject,
    currentThread,
    createThread,
    selectThread,
    projectMemory,
  } = useProject();

  const [question, setQuestion] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Redirect to auth page if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth");
    }
  }, [user, authLoading, router]);

  const [attachments, setAttachments] = useState<FileAttachment[]>([]);
  const [conversationHistory, setConversationHistory] = useState<
    ConversationTurn[]
  >([]);

  const {
    value: currentResponses,
    displayValue: displayResponses,
    setValue: setCurrentResponses,
    flush: flushResponses,
    reset: resetResponses,
  } = useStreamingDebounce<Record<string, ModelResponse>>({}, 50);

  const {
    value: currentVerdict,
    displayValue: displayVerdict,
    setValue: setCurrentVerdict,
    flush: flushVerdict,
    reset: resetVerdict,
  } = useStreamingDebounce<VerdictResponse | null>(null, 50);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isNewThreadModalOpen, setIsNewThreadModalOpen] = useState(false);
  const [newThreadMode, setNewThreadMode] = useState<ThreadMode>("multiask");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedModels, setCompletedModels] = useState<Set<string>>(
    new Set()
  );
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [currentTurnNumber, setCurrentTurnNumber] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [isPending, startTransition] = useTransition();

  // Load messages when thread changes
  useEffect(() => {
    const loadThreadMessages = async () => {
      if (!currentThread) {
        setConversationHistory([]);
        resetResponses({});
        resetVerdict(null);
        setCurrentQuestion("");
        setQuestion("");
        setAttachments([]);
        setCurrentTurnNumber(0);
        return;
      }

      if (
        currentThread.mode === "critique" ||
        currentThread.mode === "premortem"
      ) {
        setConversationHistory([]);
        resetResponses({});
        resetVerdict(null);
        setCurrentQuestion("");
        setQuestion("");
        return;
      }

      setIsLoadingHistory(true);
      try {
        const response = await fetch(
          `/api/threads/${currentThread.id}/messages`
        );
        if (response.ok) {
          const data = await response.json();
          const messages: Message[] = data.messages.map(
            (m: Record<string, unknown>) => ({
              ...m,
              createdAt: new Date(m.createdAt as string | number),
            })
          );

          if (messages.length > 0) {
            const history = reconstructMultiAskHistory(messages);
            const latestTurn = getLatestTurnNumber(messages);
            setCurrentTurnNumber(latestTurn);

            if (history.length > 0) {
              startTransition(() => {
                setConversationHistory(history);
              });
              resetResponses({});
              resetVerdict(null);
              setCurrentQuestion("");
            }
          } else {
            setConversationHistory([]);
            resetResponses({});
            resetVerdict(null);
            setCurrentQuestion("");
            setCurrentTurnNumber(0);
          }
        }
      } catch (error) {
        console.error("Failed to load thread messages:", error);
      }
      setIsLoadingHistory(false);
    };

    loadThreadMessages();
  }, [currentThread, resetResponses, resetVerdict]);

  // Auto-resize textarea
  const adjustTextareaHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  }, []);

  useEffect(() => {
    adjustTextareaHeight();
  }, [question, adjustTextareaHeight]);

  // Build context with project memory
  const projectContext = useMemo(() => {
    let context = "";

    if (projectMemory?.summary) {
      context += `## Project Context\n${projectMemory.summary}\n\n`;
    }

    if (projectMemory?.facts && projectMemory.facts.length > 0) {
      context += `## Key Facts\n${projectMemory.facts
        .map((f) => `- ${f}`)
        .join("\n")}\n\n`;
    }

    if (projectMemory?.decisions && projectMemory.decisions.length > 0) {
      const recentDecisions = projectMemory.decisions.slice(-3);
      context += `## Recent Decisions\n${recentDecisions
        .map((d) => `- ${d.decision}`)
        .join("\n")}\n\n`;
    }

    return context;
  }, [projectMemory]);

  // Build context from conversation history
  const conversationContext = useMemo(() => {
    if (conversationHistory.length === 0) return "";

    let context = "## Previous Conversation\n\n";
    const recentHistory = conversationHistory.slice(-5);

    recentHistory.forEach((turn, index) => {
      const actualIndex =
        conversationHistory.length - recentHistory.length + index;
      context += `### Turn ${actualIndex + 1}\n`;
      context += `**Question:** ${turn.question}\n\n`;

      const responseEntries = Object.entries(turn.responses);
      if (responseEntries.length > 0) {
        responseEntries.forEach(([modelId, response]) => {
          if (response.content && !response.error) {
            const truncatedContent =
              response.content.length > 2000
                ? response.content.slice(0, 2000) + "... [truncated]"
                : response.content;
            context += `**${modelId}:** ${truncatedContent}\n\n`;
          }
        });
      }

      if (turn.verdict?.content) {
        const truncatedVerdict =
          turn.verdict.content.length > 1000
            ? turn.verdict.content.slice(0, 1000) + "... [truncated]"
            : turn.verdict.content;
        context += `**Verdict Summary:** ${truncatedVerdict}\n\n`;
      }

      context += "---\n\n";
    });

    return context;
  }, [conversationHistory]);

  // Save message to database
  const saveMessage = useCallback(
    async (
      role: string,
      content: string,
      modelUsed?: string,
      metadata?: Record<string, unknown>,
      turnNumber?: number
    ) => {
      if (!currentThread) return;

      try {
        await fetch(`/api/threads/${currentThread.id}/messages`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            role,
            content,
            modelUsed,
            metadata,
            turnNumber,
          }),
        });
      } catch (error) {
        console.error("Failed to save message:", error);
      }
    },
    [currentThread]
  );

  // Generate verdict from all responses
  const generateVerdict = useCallback(
    async (
      allResponses: Record<string, ModelResponse>,
      originalQuestion: string,
      isFollowUp: boolean = false,
      turnNum: number
    ) => {
      if (!verdictModel) return;

      setCurrentVerdict({ content: "", isLoading: true });

      const responsesSummary = Object.entries(allResponses)
        .filter(([, r]) => r.content && !r.error)
        .map(([modelId, r]) => `### ${modelId}\n${r.content}`)
        .join("\n\n---\n\n");

      const verdictPrompt = `You are an expert analyst helping with the project "${
        currentProject?.name || "this project"
      }".

${projectContext}
${isFollowUp ? conversationContext : ""}

**${isFollowUp ? "Follow-up " : ""}Question:** ${originalQuestion}

Here are the responses from each model:

${responsesSummary}

---

Please analyze all the responses above and provide:

1. **Consensus**: What do all or most models agree on?
2. **Key Differences**: Where do the models differ?
3. **Notable Insights**: Any unique points from specific models?
4. **Overall Assessment**: The most accurate/comprehensive answer?

Be specific and reference which models said what.`;

      const idToken = await getIdToken();
      if (!idToken) {
        console.error("No ID token available for verdict");
        setCurrentVerdict({
          content: "",
          isLoading: false,
          error: "Authentication required",
        });
        flushVerdict();
        return;
      }

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({
            message: verdictPrompt,
            modelId: verdictModel,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          setCurrentVerdict({
            content: "",
            isLoading: false,
            error: errorData.error,
          });
          flushVerdict();
          return;
        }

        const reader = response.body?.getReader();
        if (!reader) throw new Error("No response reader");

        const decoder = new TextDecoder();
        let fullContent = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") continue;

              try {
                const parsed = JSON.parse(data);
                const content = parsed.choices?.[0]?.delta?.content || "";
                if (content) {
                  fullContent += content;
                  setCurrentVerdict((prev) =>
                    prev
                      ? { ...prev, content: fullContent, isLoading: true }
                      : null
                  );
                }
              } catch {
                /* Skip */
              }
            }
          }
        }

        setCurrentVerdict((prev) =>
          prev ? { ...prev, content: fullContent, isLoading: false } : null
        );
        flushVerdict();

        await saveMessage(
          "verdict",
          fullContent,
          verdictModel,
          undefined,
          turnNum
        );
      } catch (error) {
        setCurrentVerdict({
          content: "",
          isLoading: false,
          error: error instanceof Error ? error.message : "Unknown error",
        });
        flushVerdict();
      }
    },
    [
      verdictModel,
      projectContext,
      conversationContext,
      currentProject,
      saveMessage,
      setCurrentVerdict,
      flushVerdict,
      getIdToken,
    ]
  );

  // Check if all models have completed and trigger verdict
  useEffect(() => {
    if (
      models.length > 0 &&
      completedModels.size === models.length &&
      verdictModel &&
      !currentVerdict?.content &&
      !currentVerdict?.isLoading &&
      currentQuestion
    ) {
      const hasValidResponses = Object.values(currentResponses).some(
        (r) => r.content && !r.error && !r.isLoading
      );
      if (hasValidResponses) {
        generateVerdict(
          currentResponses,
          currentQuestion,
          conversationHistory.length > 0,
          currentTurnNumber
        );
      }
    }
  }, [
    completedModels,
    models.length,
    verdictModel,
    currentResponses,
    currentVerdict,
    generateVerdict,
    currentQuestion,
    conversationHistory.length,
    currentTurnNumber,
  ]);

  // Run query on all models
  const runQuery = useCallback(
    async (
      queryQuestion: string,
      isFollowUp: boolean = false,
      queryAttachments: FileAttachment[] = []
    ) => {
      if (!queryQuestion.trim() || models.length === 0) return;

      const newTurnNumber = currentTurnNumber + 1;

      if (
        isFollowUp &&
        currentQuestion &&
        Object.keys(currentResponses).length > 0
      ) {
        startTransition(() => {
          setConversationHistory((prev) => [
            ...prev,
            {
              question: currentQuestion,
              responses: { ...currentResponses },
              verdict: currentVerdict ? { ...currentVerdict } : null,
              turnNumber: currentTurnNumber,
            },
          ]);
        });
      }

      setIsSubmitting(true);
      setCompletedModels(new Set());
      resetVerdict(null);
      setCurrentQuestion(queryQuestion);
      setCurrentTurnNumber(newTurnNumber);

      await saveMessage(
        "user",
        queryQuestion,
        undefined,
        undefined,
        newTurnNumber
      );

      let currentTurnContext = "";
      if (isFollowUp && currentQuestion) {
        currentTurnContext = `### Current Turn\n**Question:** ${currentQuestion}\n\n`;
        Object.entries(currentResponses).forEach(([modelId, response]) => {
          if (response.content && !response.error) {
            const truncated =
              response.content.length > 2000
                ? response.content.slice(0, 2000) + "... [truncated]"
                : response.content;
            currentTurnContext += `**${modelId}:** ${truncated}\n\n`;
          }
        });
        if (currentVerdict?.content) {
          const truncated =
            currentVerdict.content.length > 1000
              ? currentVerdict.content.slice(0, 1000) + "... [truncated]"
              : currentVerdict.content;
          currentTurnContext += `**Verdict Summary:** ${truncated}\n\n`;
        }
        currentTurnContext += "---\n\n";
      }

      const fullContext =
        projectContext +
        (isFollowUp ? conversationContext : "") +
        currentTurnContext;
      const messageWithContext = fullContext
        ? `${fullContext}**${
            isFollowUp ? "Follow-up " : ""
          }Question:** ${queryQuestion}\n\nPlease answer the question, considering the project context and any previous conversation.`
        : queryQuestion;

      const initialResponses: Record<string, ModelResponse> = {};
      models.forEach((model) => {
        initialResponses[model.id] = {
          modelId: model.id,
          content: "",
          isLoading: true,
        };
      });
      resetResponses(initialResponses);

      const apiAttachments =
        queryAttachments.length > 0
          ? convertAttachmentsForAPI(queryAttachments)
          : undefined;

      const idToken = await getIdToken();
      if (!idToken) {
        console.error("No ID token available");
        return;
      }

      models.forEach(async (model) => {
        try {
          const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${idToken}`,
            },
            body: JSON.stringify({
              message: messageWithContext,
              modelId: model.id,
              attachments: apiAttachments,
            }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            setCurrentResponses((prev) => ({
              ...prev,
              [model.id]: {
                modelId: model.id,
                content: "",
                isLoading: false,
                error: errorData.error || "Request failed",
              },
            }));
            setCompletedModels((prev) => new Set([...prev, model.id]));
            flushResponses();
            return;
          }

          const reader = response.body?.getReader();
          if (!reader) throw new Error("No response reader");

          const decoder = new TextDecoder();
          let fullContent = "";

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value);
            const lines = chunk.split("\n");

            for (const line of lines) {
              if (line.startsWith("data: ")) {
                const data = line.slice(6);
                if (data === "[DONE]") continue;
                try {
                  const parsed = JSON.parse(data);
                  const content = parsed.choices?.[0]?.delta?.content || "";
                  if (content) {
                    fullContent += content;
                    setCurrentResponses((prev) => ({
                      ...prev,
                      [model.id]: {
                        ...prev[model.id],
                        content: fullContent,
                        isLoading: true,
                      },
                    }));
                  }
                } catch {
                  /* Skip */
                }
              }
            }
          }

          setCurrentResponses((prev) => ({
            ...prev,
            [model.id]: {
              ...prev[model.id],
              content: fullContent,
              isLoading: false,
            },
          }));
          flushResponses();
          setCompletedModels((prev) => new Set([...prev, model.id]));

          await saveMessage(
            "assistant",
            fullContent,
            model.id,
            undefined,
            newTurnNumber
          );
        } catch (error) {
          setCurrentResponses((prev) => ({
            ...prev,
            [model.id]: {
              modelId: model.id,
              content: "",
              isLoading: false,
              error: error instanceof Error ? error.message : "Unknown error",
            },
          }));
          flushResponses();
          setCompletedModels((prev) => new Set([...prev, model.id]));
        }
      });

      setIsSubmitting(false);
    },
    [
      models,
      projectContext,
      conversationContext,
      currentQuestion,
      currentResponses,
      currentVerdict,
      saveMessage,
      currentTurnNumber,
      setCurrentResponses,
      resetResponses,
      resetVerdict,
      flushResponses,
      getIdToken,
    ]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!question.trim() || !currentThread) return;

      const hasExistingHistory = conversationHistory.length > 0;

      if (!hasExistingHistory) {
        setConversationHistory([]);
      }

      runQuery(question, hasExistingHistory, attachments);
      setQuestion("");
      setAttachments([]);
    },
    [question, currentThread, runQuery, conversationHistory.length, attachments]
  );

  const handleFollowUp = useCallback(
    (followUpQuestion: string) => {
      runQuery(followUpQuestion, true, []);
    },
    [runQuery]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleNewThread = (mode: ThreadMode) => {
    setNewThreadMode(mode);
    setIsNewThreadModalOpen(true);
  };

  const handleCreateThread = async (title: string, mode: ThreadMode) => {
    if (!currentProject) return;
    const thread = await createThread(currentProject.id, title, mode);
    if (thread) {
      selectThread(thread);
    }
  };

  const gridCols = useMemo(() => {
    const count = models.length;
    if (count === 0) return "";
    if (count === 1) return "grid-cols-1";
    if (count === 2) return "grid-cols-1 lg:grid-cols-2";
    if (count <= 4) return "grid-cols-1 md:grid-cols-2";
    if (count <= 6) return "grid-cols-1 md:grid-cols-2 xl:grid-cols-3";
    return "grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4";
  }, [models.length]);

  const verdictModelName = useMemo(() => {
    if (!verdictModel) return "Not configured";
    const parts = verdictModel.split("/");
    return parts[parts.length - 1]
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }, [verdictModel]);

  const isCurrentTurnComplete =
    completedModels.size === models.length &&
    models.length > 0 &&
    (!verdictModel || (displayVerdict?.content && !displayVerdict?.isLoading));

  if (authLoading || !user) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#050505] font-inter">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-[#5BF731] border-t-transparent rounded-full animate-spin" />
          <p className="text-[rgba(255,255,255,0.5)] text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (!currentProject) {
    return (
      <div className="flex h-screen bg-[#050505] font-inter">
        <ModernSidebar
          isCollapsed={sidebarCollapsed}
          setIsCollapsed={setSidebarCollapsed}
          onNewThread={handleNewThread}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />

        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md px-6">
            <div className="w-20 h-20 rounded-2xl bg-[rgba(91,247,49,0.1)] border border-[rgba(91,247,49,0.2)] flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-[#5BF731]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                />
              </svg>
            </div>
            <h1 className="font-syne text-2xl font-bold text-white mb-3">
              Welcome to Rigorus
            </h1>
            <p className="text-[rgba(255,255,255,0.5)] mb-8 leading-relaxed">
              Create a project to start comparing AI models. Projects preserve
              context across conversations.
            </p>
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="px-6 py-3 bg-[#5BF731] hover:bg-[#4de028] text-[#050505] font-semibold rounded-xl transition-all"
            >
              Get Started
            </button>
          </div>
        </div>

        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
        />
      </div>
    );
  }

  if (!currentThread) {
    return (
      <div className="flex h-screen bg-[#050505] font-inter">
        <ModernSidebar
          isCollapsed={sidebarCollapsed}
          setIsCollapsed={setSidebarCollapsed}
          onNewThread={handleNewThread}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />

        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="px-6 py-4 border-b border-[rgba(255,255,255,0.06)] flex items-center justify-between">
            <div>
              <h1 className="font-syne text-lg font-semibold text-white">
                {currentProject.name}
              </h1>
              <p className="text-xs text-[rgba(255,255,255,0.4)]">
                Select or create a conversation
              </p>
            </div>
          </header>

          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center max-w-5xl w-full">
              <h2 className="font-syne text-2xl font-bold text-white mb-10 tracking-tight">
                Choose a thinking mode
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <button
                  onClick={() => handleNewThread("multiask")}
                  className="group p-8 bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(91,247,49,0.05)] border border-[rgba(255,255,255,0.06)] hover:border-[rgba(91,247,49,0.3)] rounded-2xl transition-all text-left"
                >
                  <div className="w-16 h-16 rounded-xl bg-[rgba(91,247,49,0.1)] group-hover:bg-[rgba(91,247,49,0.2)] flex items-center justify-center mb-6 transition-colors">
                    <svg
                      className="w-8 h-8 text-[#5BF731]"
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
                  <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-[#5BF731] transition-colors tracking-tight">
                    MultiAsk
                  </h3>
                  <p className="text-sm text-[rgba(255,255,255,0.5)] leading-relaxed">
                    Query multiple AI models simultaneously
                  </p>
                </button>

                <button
                  onClick={() => handleNewThread("critique")}
                  className="group p-8 bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(247,49,76,0.05)] border border-[rgba(255,255,255,0.06)] hover:border-[rgba(247,49,76,0.3)] rounded-2xl transition-all text-left"
                >
                  <div className="w-16 h-16 rounded-xl bg-[rgba(247,49,76,0.1)] group-hover:bg-[rgba(247,49,76,0.2)] flex items-center justify-center mb-6 transition-colors">
                    <svg
                      className="w-8 h-8 text-[#F7314C]"
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
                  <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-[#F7314C] transition-colors tracking-tight">
                    Critique Chain
                  </h3>
                  <p className="text-sm text-[rgba(255,255,255,0.5)] leading-relaxed">
                    Primary response → Critics → Synthesis
                  </p>
                </button>

                <button
                  onClick={() => handleNewThread("premortem")}
                  className="group p-8 bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(247,198,49,0.05)] border border-[rgba(255,255,255,0.06)] hover:border-[rgba(247,198,49,0.3)] rounded-2xl transition-all text-left"
                >
                  <div className="w-16 h-16 rounded-xl bg-[rgba(247,198,49,0.1)] group-hover:bg-[rgba(247,198,49,0.2)] flex items-center justify-center mb-6 transition-colors">
                    <svg
                      className="w-8 h-8 text-[#F7C631]"
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
                  <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-[#F7C631] transition-colors tracking-tight">
                    Pre-mortem
                  </h3>
                  <p className="text-sm text-[rgba(255,255,255,0.5)] leading-relaxed">
                    Red Team → Blue Team analysis
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>

        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
        />
        <NewThreadModal
          isOpen={isNewThreadModalOpen}
          onClose={() => setIsNewThreadModalOpen(false)}
          onCreate={handleCreateThread}
          defaultMode={newThreadMode}
        />
      </div>
    );
  }

  // Main conversation view
  return (
    <div className="flex h-screen bg-[#050505] font-inter">
      <ModernSidebar
        isCollapsed={sidebarCollapsed}
        setIsCollapsed={setSidebarCollapsed}
        onNewThread={handleNewThread}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="px-6 py-4 border-b border-[rgba(255,255,255,0.06)] flex items-center justify-between bg-[#050505]">
          <div className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                currentThread.mode === "critique"
                  ? "bg-[rgba(247,49,76,0.15)] text-[#F7314C]"
                  : currentThread.mode === "premortem"
                  ? "bg-[rgba(247,198,49,0.15)] text-[#F7C631]"
                  : "bg-[rgba(91,247,49,0.15)] text-[#5BF731]"
              }`}
            >
              {currentThread.mode === "critique" ? (
                <svg
                  className="w-4 h-4"
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
              ) : currentThread.mode === "premortem" ? (
                <svg
                  className="w-4 h-4"
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
              ) : (
                <svg
                  className="w-4 h-4"
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
              )}
            </div>
            <div>
              <h1 className="font-syne text-base font-semibold text-white">
                {currentThread.title}
              </h1>
              <p className="text-xs text-[rgba(255,255,255,0.4)]">
                {currentProject.name} •{" "}
                {currentThread.mode === "critique"
                  ? "Critique Chain"
                  : currentThread.mode === "premortem"
                  ? "Pre-mortem"
                  : "MultiAsk"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isPending && (
              <span className="text-xs text-[rgba(255,255,255,0.4)] flex items-center gap-2">
                <div className="w-3 h-3 border border-[#5BF731] border-t-transparent rounded-full animate-spin" />
                Loading...
              </span>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {isLoadingHistory ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-[#5BF731] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-[rgba(255,255,255,0.5)] text-sm">
                  Loading conversation...
                </p>
              </div>
            </div>
          ) : currentThread.mode === "critique" ? (
            <CritiqueChain
              projectContext={projectContext}
              onSaveMessage={saveMessage}
              threadId={currentThread.id}
            />
          ) : currentThread.mode === "premortem" ? (
            <PreMortem
              projectContext={projectContext}
              onSaveMessage={saveMessage}
              threadId={currentThread.id}
            />
          ) : (
            <>
              {/* Question Input */}
              <form onSubmit={handleSubmit} className="mb-6">
                <div className="relative">
                  <textarea
                    ref={textareaRef}
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask a question to compare AI responses..."
                    rows={1}
                    className="w-full px-5 py-4 pr-14 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.12)] focus:border-[rgba(91,247,49,0.3)] rounded-2xl text-white placeholder-[rgba(255,255,255,0.3)] focus:outline-none text-base resize-none overflow-hidden min-h-[56px] transition-colors"
                    disabled={isSubmitting}
                  />
                  <button
                    type="submit"
                    disabled={
                      isSubmitting || !question.trim() || models.length === 0
                    }
                    className="absolute right-3 bottom-3 p-2.5 bg-[#5BF731] hover:bg-[#4de028] disabled:bg-[rgba(255,255,255,0.05)] disabled:cursor-not-allowed text-[#050505] disabled:text-[rgba(255,255,255,0.2)] rounded-xl transition-all"
                    title="Send (Enter)"
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
                        d="M5 10l7-7m0 0l7 7m-7-7v18"
                      />
                    </svg>
                  </button>
                </div>

                <div className="mt-3">
                  <FileUpload
                    attachments={attachments}
                    onAttachmentsChange={setAttachments}
                    disabled={isSubmitting}
                    maxFiles={5}
                    maxSizeMB={20}
                  />
                </div>

                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-[rgba(255,255,255,0.3)]">
                    Press Enter to send, Shift+Enter for new line
                  </p>
                  {models.length > 0 && (
                    <p className="text-xs text-[rgba(255,255,255,0.3)]">
                      {models.length} model{models.length > 1 ? "s" : ""} active
                    </p>
                  )}
                </div>

                {models.length === 0 && (
                  <div className="mt-4 p-3 bg-[rgba(247,198,49,0.1)] border border-[rgba(247,198,49,0.2)] rounded-xl text-[#F7C631] text-sm flex items-center gap-2">
                    <svg
                      className="w-4 h-4 shrink-0"
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
                    Select at least one AI model in Settings
                  </div>
                )}
              </form>

              {/* Virtualized Conversation History */}
              <VirtualizedConversation
                conversationHistory={conversationHistory}
                verdictModelName={verdictModelName}
                windowSize={10}
              />

              {/* Current Turn */}
              {models.length > 0 &&
                Object.keys(displayResponses).length > 0 && (
                  <>
                    {currentQuestion && (
                      <div className="mb-4 px-4 py-2.5 bg-[rgba(91,247,49,0.08)] border border-[rgba(91,247,49,0.2)] rounded-xl inline-flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#5BF731]" />
                        <span className="text-xs font-medium text-[#5BF731]">
                          {conversationHistory.length > 0
                            ? "Follow-up"
                            : "Question"}
                        </span>
                        <span className="text-sm text-[rgba(255,255,255,0.8)]">
                          {currentQuestion}
                        </span>
                      </div>
                    )}
                    <div className={`grid ${gridCols} gap-4`}>
                      {models.map((model) => (
                        <div
                          key={model.id}
                          className="min-h-[400px] max-h-[600px]"
                        >
                          <ResponsePanel
                            model={model}
                            response={displayResponses[model.id]}
                          />
                        </div>
                      ))}
                    </div>

                    {verdictModel &&
                      (displayVerdict ||
                        completedModels.size === models.length) && (
                        <div className="mt-6">
                          <VerdictPanel
                            content={displayVerdict?.content || ""}
                            isLoading={displayVerdict?.isLoading || false}
                            error={displayVerdict?.error}
                            modelName={verdictModelName}
                          />
                        </div>
                      )}

                    {isCurrentTurnComplete && (
                      <FollowUpInput
                        onSubmit={handleFollowUp}
                        disabled={isSubmitting}
                        placeholder="Ask a follow-up question..."
                        colorClass="green"
                      />
                    )}
                  </>
                )}
            </>
          )}
        </main>
      </div>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
      <NewThreadModal
        isOpen={isNewThreadModalOpen}
        onClose={() => setIsNewThreadModalOpen(false)}
        onCreate={handleCreateThread}
        defaultMode={newThreadMode}
      />
    </div>
  );
}
