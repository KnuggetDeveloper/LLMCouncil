"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { Model, AvailableModel } from "../../types";

interface ModelsContextType {
  // Available models catalog from database
  availableModels: AvailableModel[];
  isLoadingModels: boolean;
  refreshAvailableModels: () => Promise<void>;

  // MultiAsk settings
  models: Model[];
  addModel: (modelId: string) => void;
  removeModel: (modelId: string) => void;
  verdictModel: string;
  setVerdictModel: (modelId: string) => void;

  // Critique Chain settings
  primaryModel: string;
  setPrimaryModel: (modelId: string) => void;
  critiqueModels: Model[];
  addCritiqueModel: (modelId: string) => void;
  removeCritiqueModel: (modelId: string) => void;
  reviewerModel: string;
  setReviewerModel: (modelId: string) => void;

  // Pre-mortem settings
  redTeamModels: Model[];
  addRedTeamModel: (modelId: string) => void;
  removeRedTeamModel: (modelId: string) => void;
  blueTeamModels: Model[];
  addBlueTeamModel: (modelId: string) => void;
  removeBlueTeamModel: (modelId: string) => void;
  redTeamPrompt: string;
  setRedTeamPrompt: (prompt: string) => void;
  blueTeamPrompt: string;
  setBlueTeamPrompt: (prompt: string) => void;

  // Shared
  apiKey: string;
  setApiKey: (key: string) => void;
}

const ModelsContext = createContext<ModelsContextType | undefined>(undefined);

const STORAGE_KEY = "llm-compare-settings";

// Default prompts for pre-mortem
const DEFAULT_RED_TEAM_PROMPT =
  "It is two years from now and this initiative has failed spectacularly. Brainstorm the 10 reasons why.";
const DEFAULT_BLUE_TEAM_PROMPT =
  "For all the failure points identified come up with sound winning strategies to counter these failures.";

// Extract a display name from a model ID
function getDisplayName(modelId: string): string {
  // e.g., "openai/gpt-4o" -> "GPT-4o"
  // e.g., "anthropic/claude-3.5-sonnet" -> "Claude 3.5 Sonnet"
  const parts = modelId.split("/");
  const name = parts[parts.length - 1];
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function ModelsProvider({ children }: { children: ReactNode }) {
  // Available models catalog from database
  const [availableModels, setAvailableModels] = useState<AvailableModel[]>([]);
  const [isLoadingModels, setIsLoadingModels] = useState(false);

  // MultiAsk settings
  const [models, setModels] = useState<Model[]>([]);
  const [verdictModel, setVerdictModel] = useState("");

  // Critique Chain settings
  const [primaryModel, setPrimaryModel] = useState("");
  const [critiqueModels, setCritiqueModels] = useState<Model[]>([]);
  const [reviewerModel, setReviewerModel] = useState("");

  // Pre-mortem settings
  const [redTeamModels, setRedTeamModels] = useState<Model[]>([]);
  const [blueTeamModels, setBlueTeamModels] = useState<Model[]>([]);
  const [redTeamPrompt, setRedTeamPrompt] = useState(DEFAULT_RED_TEAM_PROMPT);
  const [blueTeamPrompt, setBlueTeamPrompt] = useState(
    DEFAULT_BLUE_TEAM_PROMPT
  );

  // Shared
  const [apiKey, setApiKey] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  // Fetch available models from the database
  const refreshAvailableModels = useCallback(async () => {
    setIsLoadingModels(true);
    try {
      const response = await fetch("/api/models");
      if (response.ok) {
        const data = await response.json();
        setAvailableModels(data.models || []);
      }
    } catch (error) {
      console.error("Failed to fetch available models:", error);
    } finally {
      setIsLoadingModels(false);
    }
  }, []);

  // Fetch available models on mount
  useEffect(() => {
    refreshAvailableModels();
  }, [refreshAvailableModels]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.models) {
          setModels(parsed.models);
        }
        if (parsed.apiKey) {
          setApiKey(parsed.apiKey);
        }
        if (parsed.verdictModel) {
          setVerdictModel(parsed.verdictModel);
        }
        if (parsed.primaryModel) {
          setPrimaryModel(parsed.primaryModel);
        }
        if (parsed.critiqueModels) {
          setCritiqueModels(parsed.critiqueModels);
        }
        if (parsed.reviewerModel) {
          setReviewerModel(parsed.reviewerModel);
        }
        // Pre-mortem settings
        if (parsed.redTeamModels) {
          setRedTeamModels(parsed.redTeamModels);
        }
        if (parsed.blueTeamModels) {
          setBlueTeamModels(parsed.blueTeamModels);
        }
        if (parsed.redTeamPrompt) {
          setRedTeamPrompt(parsed.redTeamPrompt);
        }
        if (parsed.blueTeamPrompt) {
          setBlueTeamPrompt(parsed.blueTeamPrompt);
        }
      } catch (e) {
        console.error("Failed to parse stored settings", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage when settings change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          models,
          apiKey,
          verdictModel,
          primaryModel,
          critiqueModels,
          reviewerModel,
          redTeamModels,
          blueTeamModels,
          redTeamPrompt,
          blueTeamPrompt,
        })
      );
    }
  }, [
    models,
    apiKey,
    verdictModel,
    primaryModel,
    critiqueModels,
    reviewerModel,
    redTeamModels,
    blueTeamModels,
    redTeamPrompt,
    blueTeamPrompt,
    isLoaded,
  ]);

  const addModel = (modelId: string) => {
    const trimmedId = modelId.trim();
    if (!trimmedId) return;

    // Check if already exists
    if (models.some((m) => m.id === trimmedId)) return;

    setModels((prev) => [
      ...prev,
      {
        id: trimmedId,
        name: getDisplayName(trimmedId),
      },
    ]);
  };

  const removeModel = (modelId: string) => {
    setModels((prev) => prev.filter((m) => m.id !== modelId));
  };

  const addCritiqueModel = (modelId: string) => {
    const trimmedId = modelId.trim();
    if (!trimmedId) return;

    // Check if already exists
    if (critiqueModels.some((m) => m.id === trimmedId)) return;

    setCritiqueModels((prev) => [
      ...prev,
      {
        id: trimmedId,
        name: getDisplayName(trimmedId),
      },
    ]);
  };

  const removeCritiqueModel = (modelId: string) => {
    setCritiqueModels((prev) => prev.filter((m) => m.id !== modelId));
  };

  const addRedTeamModel = (modelId: string) => {
    const trimmedId = modelId.trim();
    if (!trimmedId) return;
    if (redTeamModels.some((m) => m.id === trimmedId)) return;

    setRedTeamModels((prev) => [
      ...prev,
      {
        id: trimmedId,
        name: getDisplayName(trimmedId),
      },
    ]);
  };

  const removeRedTeamModel = (modelId: string) => {
    setRedTeamModels((prev) => prev.filter((m) => m.id !== modelId));
  };

  const addBlueTeamModel = (modelId: string) => {
    const trimmedId = modelId.trim();
    if (!trimmedId) return;
    if (blueTeamModels.some((m) => m.id === trimmedId)) return;

    setBlueTeamModels((prev) => [
      ...prev,
      {
        id: trimmedId,
        name: getDisplayName(trimmedId),
      },
    ]);
  };

  const removeBlueTeamModel = (modelId: string) => {
    setBlueTeamModels((prev) => prev.filter((m) => m.id !== modelId));
  };

  return (
    <ModelsContext.Provider
      value={{
        availableModels,
        isLoadingModels,
        refreshAvailableModels,
        models,
        addModel,
        removeModel,
        verdictModel,
        setVerdictModel,
        primaryModel,
        setPrimaryModel,
        critiqueModels,
        addCritiqueModel,
        removeCritiqueModel,
        reviewerModel,
        setReviewerModel,
        redTeamModels,
        addRedTeamModel,
        removeRedTeamModel,
        blueTeamModels,
        addBlueTeamModel,
        removeBlueTeamModel,
        redTeamPrompt,
        setRedTeamPrompt,
        blueTeamPrompt,
        setBlueTeamPrompt,
        apiKey,
        setApiKey,
      }}
    >
      {children}
    </ModelsContext.Provider>
  );
}

export function useModels() {
  const context = useContext(ModelsContext);
  if (context === undefined) {
    throw new Error("useModels must be used within a ModelsProvider");
  }
  return context;
}
