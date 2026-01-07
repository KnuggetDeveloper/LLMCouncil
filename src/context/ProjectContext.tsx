"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { useAuth } from "./AuthContext";

interface Project {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Thread {
  id: string;
  projectId: string;
  title: string;
  mode: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ProjectMemory {
  summary: string;
  facts: string[];
  decisions: { decision: string; reasoning: string; date: string }[];
  openQuestions: string[];
}

interface ProjectContextType {
  projects: Project[];
  currentProject: Project | null;
  currentThread: Thread | null;
  threads: Thread[];
  projectMemory: ProjectMemory | null;
  isLoading: boolean;
  fetchProjects: () => Promise<void>;
  createProject: (name: string) => Promise<Project | null>;
  selectProject: (project: Project | null) => void;
  deleteProject: (projectId: string) => Promise<void>;
  fetchThreads: (projectId: string) => Promise<void>;
  createThread: (projectId: string, title: string, mode: string) => Promise<Thread | null>;
  selectThread: (thread: Thread | null) => void;
  deleteThread: (threadId: string) => Promise<void>;
  fetchProjectMemory: (projectId: string) => Promise<void>;
  refreshProjectMemory: (projectId: string, apiKey: string) => Promise<void>;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const { user, isLoading: authLoading, getIdToken } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [currentThread, setCurrentThread] = useState<Thread | null>(null);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [projectMemory, setProjectMemory] = useState<ProjectMemory | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Helper to get auth headers
  const getAuthHeaders = useCallback(async (): Promise<Record<string, string>> => {
    const token = await getIdToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }, [getIdToken]);

  const fetchProjects = useCallback(async () => {
    if (!user) {
      setProjects([]);
      return;
    }
    setIsLoading(true);
    try {
      const headers = await getAuthHeaders();
      const response = await fetch("/api/projects", { headers });
      if (response.ok) {
        const data = await response.json();
        setProjects(data.projects || []);
      }
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setIsLoading(false);
    }
  }, [user, getAuthHeaders]);

  const createProject = useCallback(async (name: string): Promise<Project | null> => {
    try {
      const headers = await getAuthHeaders();
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...headers },
        body: JSON.stringify({ name }),
      });
      if (response.ok) {
        const data = await response.json();
        await fetchProjects();
        return data.project;
      }
    } catch (error) {
      console.error("Failed to create project:", error);
    }
    return null;
  }, [fetchProjects, getAuthHeaders]);

  const selectProject = useCallback((project: Project | null) => {
    setCurrentProject(project);
    setCurrentThread(null);
    setThreads([]);
    setProjectMemory(null);
  }, []);

  const deleteProject = useCallback(async (projectId: string) => {
    try {
      const headers = await getAuthHeaders();
      await fetch(`/api/projects/${projectId}`, { method: "DELETE", headers });
      if (currentProject?.id === projectId) {
        setCurrentProject(null);
        setCurrentThread(null);
        setThreads([]);
        setProjectMemory(null);
      }
      await fetchProjects();
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  }, [currentProject, fetchProjects, getAuthHeaders]);

  const fetchThreads = useCallback(async (projectId: string) => {
    try {
      const headers = await getAuthHeaders();
      const response = await fetch(`/api/projects/${projectId}/threads`, { headers });
      if (response.ok) {
        const data = await response.json();
        setThreads(data.threads || []);
      }
    } catch (error) {
      console.error("Failed to fetch threads:", error);
    }
  }, [getAuthHeaders]);

  const createThread = useCallback(async (
    projectId: string,
    title: string,
    mode: string
  ): Promise<Thread | null> => {
    try {
      const headers = await getAuthHeaders();
      const response = await fetch(`/api/projects/${projectId}/threads`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...headers },
        body: JSON.stringify({ title, mode }),
      });
      if (response.ok) {
        const data = await response.json();
        await fetchThreads(projectId);
        return data.thread;
      }
    } catch (error) {
      console.error("Failed to create thread:", error);
    }
    return null;
  }, [fetchThreads, getAuthHeaders]);

  const selectThread = useCallback((thread: Thread | null) => {
    setCurrentThread(thread);
  }, []);

  const deleteThread = useCallback(async (threadId: string) => {
    try {
      const headers = await getAuthHeaders();
      await fetch(`/api/threads/${threadId}`, { method: "DELETE", headers });
      if (currentThread?.id === threadId) {
        setCurrentThread(null);
      }
      if (currentProject) {
        await fetchThreads(currentProject.id);
      }
    } catch (error) {
      console.error("Failed to delete thread:", error);
    }
  }, [currentThread, currentProject, fetchThreads, getAuthHeaders]);

  const fetchProjectMemory = useCallback(async (projectId: string) => {
    try {
      const headers = await getAuthHeaders();
      const response = await fetch(`/api/projects/${projectId}/memory`, { headers });
      if (response.ok) {
        const data = await response.json();
        setProjectMemory(data.memory || null);
      }
    } catch (error) {
      console.error("Failed to fetch project memory:", error);
    }
  }, [getAuthHeaders]);

  const refreshProjectMemory = useCallback(async (projectId: string, apiKey: string) => {
    try {
      const headers = await getAuthHeaders();
      const response = await fetch(`/api/projects/${projectId}/memory`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...headers },
        body: JSON.stringify({ apiKey }),
      });
      if (response.ok) {
        const data = await response.json();
        setProjectMemory(data.memory || null);
      }
    } catch (error) {
      console.error("Failed to refresh project memory:", error);
    }
  }, [getAuthHeaders]);

  // Fetch projects when user changes (login/logout)
  useEffect(() => {
    if (!authLoading) {
      if (user) {
        fetchProjects();
      } else {
        // Clear all state on logout
        setProjects([]);
        setCurrentProject(null);
        setCurrentThread(null);
        setThreads([]);
        setProjectMemory(null);
      }
    }
  }, [user, authLoading, fetchProjects]);

  // Fetch threads when project changes
  useEffect(() => {
    if (currentProject) {
      fetchThreads(currentProject.id);
      fetchProjectMemory(currentProject.id);
    }
  }, [currentProject, fetchThreads, fetchProjectMemory]);

  return (
    <ProjectContext.Provider
      value={{
        projects,
        currentProject,
        currentThread,
        threads,
        projectMemory,
        isLoading,
        fetchProjects,
        createProject,
        selectProject,
        deleteProject,
        fetchThreads,
        createThread,
        selectThread,
        deleteThread,
        fetchProjectMemory,
        refreshProjectMemory,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
}
