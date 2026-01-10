"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useProject } from "@/context/ProjectContext";
import { useModels } from "@/context/ModelsContext";
import { useAuth } from "@/context/AuthContext";
import CreditsDisplay from "@/components/CreditsDisplay";

interface ProjectSidebarProps {
  onNewThread: (mode: "multiask" | "critique") => void;
}

export default function ProjectSidebar({ onNewThread }: ProjectSidebarProps) {
  const {
    projects,
    currentProject,
    currentThread,
    threads,
    projectMemory,
    selectProject,
    createProject,
    deleteProject,
    selectThread,
    deleteThread,
    refreshProjectMemory,
  } = useProject();
  const { user, logout } = useAuth();
  const router = useRouter();

  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [showMemory, setShowMemory] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleCreateProject = async () => {
    if (!newProjectName.trim()) return;
    const project = await createProject(newProjectName.trim());
    if (project) {
      selectProject(project);
    }
    setNewProjectName("");
    setIsCreatingProject(false);
  };

  const handleRefreshMemory = async () => {
    if (!currentProject) return;
    setIsRefreshing(true);
    await refreshProjectMemory(currentProject.id);
    setIsRefreshing(false);
  };

  const handleLogout = async () => {
    await logout();
    router.push("/auth");
  };

  return (
    <div className="w-72 bg-gray-950 border-r border-gray-800 flex flex-col h-full">
      {/* User Header */}
      <div className="p-4 border-b border-gray-800 bg-gray-900/50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.name || "User"}
                className="w-8 h-8 rounded-full"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-linear-to-b from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user?.name?.charAt(0).toUpperCase() ||
                    user?.email?.charAt(0).toUpperCase() ||
                    "?"}
                </span>
              </div>
            )}
            <span className="text-sm text-gray-300 font-medium truncate max-w-[120px]">
              {user?.name || user?.email || "User"}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-red-400"
            title="Sign out"
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
        </div>

        {/* Credits Display */}
        <div className="mt-3">
          <CreditsDisplay />
        </div>
      </div>

      {/* Projects Header */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Projects</h2>
          <button
            onClick={() => setIsCreatingProject(true)}
            className="p-1.5 hover:bg-gray-800 rounded-lg transition-colors"
            title="New Project"
          >
            <svg
              className="w-5 h-5 text-gray-400"
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
          </button>
        </div>

        {isCreatingProject && (
          <div className="flex gap-2">
            <input
              type="text"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreateProject()}
              placeholder="Project name..."
              className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <button
              onClick={handleCreateProject}
              className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg"
            >
              Create
            </button>
            <button
              onClick={() => setIsCreatingProject(false)}
              className="px-2 py-2 text-gray-500 hover:text-white"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* Project List */}
      <div className="flex-1 overflow-y-auto">
        {projects.length === 0 ? (
          <div className="p-4 text-center text-gray-500 text-sm">
            No projects yet. Create one to get started.
          </div>
        ) : (
          <div className="p-2 space-y-1">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => selectProject(project)}
                className={`group flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                  currentProject?.id === project.id
                    ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                    : "text-gray-400 hover:bg-gray-800/50 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
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
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    />
                  </svg>
                  <span className="truncate text-sm">{project.name}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm("Delete this project?")) {
                      deleteProject(project.id);
                    }
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/20 rounded transition-all"
                >
                  <svg
                    className="w-4 h-4 text-red-400"
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
            ))}
          </div>
        )}
      </div>

      {/* Current Project Section */}
      {currentProject && (
        <div className="border-t border-gray-800">
          {/* Threads */}
          <div className="p-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Conversations
              </h3>
              <div className="flex gap-1">
                <button
                  onClick={() => onNewThread("multiask")}
                  className="p-1 hover:bg-blue-600/20 rounded text-blue-400"
                  title="New MultiAsk"
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
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="space-y-1 max-h-40 overflow-y-auto">
              {threads.length === 0 ? (
                <div className="text-xs text-gray-600 py-2">
                  No conversations yet
                </div>
              ) : (
                threads.map((thread) => (
                  <div
                    key={thread.id}
                    onClick={() => selectThread(thread)}
                    className={`group flex items-center justify-between px-2 py-1.5 rounded cursor-pointer text-sm ${
                      currentThread?.id === thread.id
                        ? "bg-gray-700 text-white"
                        : "text-gray-400 hover:bg-gray-800 hover:text-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className={`text-xs px-1.5 py-0.5 rounded ${
                          thread.mode === "critique"
                            ? "bg-purple-600/30 text-purple-400"
                            : "bg-blue-600/30 text-blue-400"
                        }`}
                      >
                        {thread.mode === "critique" ? "C" : "M"}
                      </span>
                      <span className="truncate">{thread.title}</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteThread(thread.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-red-500/20 rounded"
                    >
                      <svg
                        className="w-3 h-3 text-red-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Project Memory Toggle */}
          <div className="p-3 border-t border-gray-800">
            <button
              onClick={() => setShowMemory(!showMemory)}
              className="flex items-center justify-between w-full text-xs text-gray-500 hover:text-gray-300"
            >
              <span className="font-medium uppercase tracking-wider">
                Project Memory
              </span>
              <svg
                className={`w-4 h-4 transition-transform ${
                  showMemory ? "rotate-180" : ""
                }`}
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
            </button>

            {showMemory && (
              <div className="mt-3 space-y-3">
                {projectMemory?.summary ? (
                  <>
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Summary</div>
                      <div className="text-xs text-gray-300 bg-gray-800/50 p-2 rounded max-h-24 overflow-y-auto">
                        {projectMemory.summary}
                      </div>
                    </div>
                    {projectMemory.facts?.length > 0 && (
                      <div>
                        <div className="text-xs text-gray-400 mb-1">
                          Facts ({projectMemory.facts.length})
                        </div>
                        <div className="text-xs text-gray-300 bg-gray-800/50 p-2 rounded max-h-20 overflow-y-auto">
                          {projectMemory.facts.slice(0, 3).map((f, i) => (
                            <div key={i}>• {f}</div>
                          ))}
                          {projectMemory.facts.length > 3 && (
                            <div className="text-gray-500">
                              ...and {projectMemory.facts.length - 3} more
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-xs text-gray-600">
                    No memory yet. It will be generated after a few
                    conversations.
                  </div>
                )}

                <button
                  onClick={handleRefreshMemory}
                  disabled={isRefreshing}
                  className="w-full px-2 py-1.5 text-xs bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-gray-300 rounded flex items-center justify-center gap-1"
                >
                  {isRefreshing ? (
                    <>
                      <svg
                        className="w-3 h-3 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Updating...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      Refresh Memory
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
