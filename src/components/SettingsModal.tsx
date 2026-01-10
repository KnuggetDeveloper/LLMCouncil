"use client";

import { useState, useRef, useEffect } from "react";
import { useModels } from "@/context/ModelsContext";
import { useProject } from "@/context/ProjectContext";
import { AvailableModel } from "../../types";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type SettingsTab = "general" | "multiask" | "critique" | "premortem";

// Reusable Model Selector Dropdown Component
function ModelSelect({
  value,
  onChange,
  availableModels,
  placeholder = "Select a model...",
  accentColor = "green",
}: {
  value: string;
  onChange: (modelId: string) => void;
  availableModels: AvailableModel[];
  placeholder?: string;
  accentColor?: "green" | "amber" | "red" | "cyan";
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const colorClasses = {
    green: "focus:ring-[#5BF731] border-[rgba(91,247,49,0.5)]",
    amber: "focus:ring-amber-500 border-amber-500/50",
    red: "focus:ring-[#F7314C] border-[rgba(247,49,76,0.5)]",
    cyan: "focus:ring-cyan-500 border-cyan-500/50",
  };

  const selectedModel = availableModels.find((m) => m.id === value);

  const filteredModels = availableModels.filter((model) => {
    const searchLower = search.toLowerCase();
    return (
      model.name.toLowerCase().includes(searchLower) ||
      model.id.toLowerCase().includes(searchLower) ||
      (model.description?.toLowerCase().includes(searchLower) ?? false)
    );
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatContextLength = (length: number | null) => {
    if (!length) return "";
    if (length >= 1000000) return `${(length / 1000000).toFixed(1)}M`;
    if (length >= 1000) return `${(length / 1000).toFixed(0)}K`;
    return length.toString();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) {
            setTimeout(() => inputRef.current?.focus(), 0);
          }
        }}
        className={`w-full px-4 py-3 bg-[#0a0a0a] border rounded-xl text-left transition-colors ${
          isOpen ? colorClasses[accentColor] : "border-[rgba(255,255,255,0.1)]"
        } focus:outline-none focus:ring-2 ${colorClasses[accentColor]}`}
      >
        {selectedModel ? (
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <div className="font-medium text-white truncate">
                {selectedModel.name}
              </div>
              <div className="text-xs text-[rgba(255,255,255,0.4)] truncate font-mono">
                {selectedModel.id}
              </div>
            </div>
            {selectedModel.contextLength && (
              <span className="ml-2 px-2 py-0.5 bg-[rgba(255,255,255,0.05)] rounded text-xs text-[rgba(255,255,255,0.5)]">
                {formatContextLength(selectedModel.contextLength)} ctx
              </span>
            )}
          </div>
        ) : (
          <span className="text-[rgba(255,255,255,0.4)]">{placeholder}</span>
        )}
        <svg
          className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[rgba(255,255,255,0.4)] transition-transform ${
            isOpen ? "rotate-180" : ""
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

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-[#0a0a0a] border border-[rgba(255,255,255,0.1)] rounded-xl shadow-xl max-h-80 overflow-hidden">
          {/* Search input */}
          <div className="p-2 border-b border-[rgba(255,255,255,0.06)]">
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search models..."
              className="w-full px-3 py-2 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-lg text-white text-sm placeholder-[rgba(255,255,255,0.3)] focus:outline-none focus:ring-1 focus:ring-[#5BF731]"
            />
          </div>

          {/* Model list */}
          <div className="overflow-y-auto max-h-60">
            {filteredModels.length > 0 ? (
              filteredModels.map((model) => (
                <button
                  key={model.id}
                  type="button"
                  onClick={() => {
                    onChange(model.id);
                    setIsOpen(false);
                    setSearch("");
                  }}
                  className={`w-full px-4 py-3 text-left hover:bg-[rgba(91,247,49,0.1)] transition-colors ${
                    model.id === value ? "bg-[rgba(91,247,49,0.05)]" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-white">{model.name}</div>
                      {model.description && (
                        <div className="text-xs text-[rgba(255,255,255,0.4)] line-clamp-2 mt-0.5">
                          {model.description}
                        </div>
                      )}
                      <div className="text-xs text-[rgba(255,255,255,0.3)] font-mono mt-1">
                        {model.id}
                      </div>
                    </div>
                    {model.contextLength && (
                      <span className="shrink-0 px-2 py-0.5 bg-[rgba(255,255,255,0.05)] rounded text-xs text-[rgba(255,255,255,0.5)]">
                        {formatContextLength(model.contextLength)}
                      </span>
                    )}
                  </div>
                </button>
              ))
            ) : (
              <div className="px-4 py-8 text-center text-[rgba(255,255,255,0.4)] text-sm">
                {availableModels.length === 0
                  ? "No models available. Add models to the database first."
                  : "No models match your search."}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Reusable Multi-Model Selector Component
function MultiModelSelect({
  selectedModels,
  onAdd,
  onRemove,
  availableModels,
  accentColor = "green",
  emptyMessage = "No models added yet",
}: {
  selectedModels: { id: string; name: string }[];
  onAdd: (modelId: string) => void;
  onRemove: (modelId: string) => void;
  availableModels: AvailableModel[];
  accentColor?: "green" | "amber" | "red" | "cyan";
  emptyMessage?: string;
}) {
  const [selectedModelId, setSelectedModelId] = useState("");

  const handleAdd = () => {
    if (selectedModelId) {
      onAdd(selectedModelId);
      setSelectedModelId("");
    }
  };

  const bgClasses = {
    green: "bg-[rgba(91,247,49,0.08)] border-[rgba(91,247,49,0.2)]",
    amber: "bg-[rgba(247,198,49,0.08)] border-[rgba(247,198,49,0.2)]",
    red: "bg-[rgba(247,49,76,0.08)] border-[rgba(247,49,76,0.2)]",
    cyan: "bg-[rgba(49,168,247,0.08)] border-[rgba(49,168,247,0.2)]",
  };

  const buttonClasses = {
    green: "bg-[#5BF731] hover:bg-[#4de028] text-[#050505]",
    amber: "bg-[#F7C631] hover:bg-[#e5b62e] text-[#050505]",
    red: "bg-[#F7314C] hover:bg-[#e52d45] text-white",
    cyan: "bg-[#31A8F7] hover:bg-[#2d9ce5] text-white",
  };

  // Filter out already selected models
  const availableToAdd = availableModels.filter(
    (m) => !selectedModels.some((selected) => selected.id === m.id)
  );

  const formatContextLength = (length: number | null) => {
    if (!length) return "";
    if (length >= 1000000) return `${(length / 1000000).toFixed(1)}M`;
    if (length >= 1000) return `${(length / 1000).toFixed(0)}K`;
    return length.toString();
  };

  return (
    <div>
      {/* Add Model Row */}
      <div className="flex gap-2 mb-4">
        <div className="flex-1">
          <ModelSelect
            value={selectedModelId}
            onChange={setSelectedModelId}
            availableModels={availableToAdd}
            placeholder="Select a model to add..."
            accentColor={accentColor}
          />
        </div>
        <button
          onClick={handleAdd}
          disabled={!selectedModelId}
          className={`px-4 py-3 ${buttonClasses[accentColor]} disabled:bg-[rgba(255,255,255,0.05)] disabled:text-[rgba(255,255,255,0.2)] disabled:cursor-not-allowed font-medium rounded-xl transition-colors`}
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
        </button>
      </div>

      {/* Selected Models List */}
      {selectedModels.length > 0 ? (
        <div className="space-y-2">
          {selectedModels.map((model) => {
            const fullModel = availableModels.find((m) => m.id === model.id);
            return (
              <div
                key={model.id}
                className={`flex items-center justify-between p-3 ${bgClasses[accentColor]} border rounded-xl`}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <div className="font-medium text-white truncate text-sm">
                      {fullModel?.name || model.name}
                    </div>
                    {fullModel?.contextLength && (
                      <span className="px-1.5 py-0.5 bg-[rgba(255,255,255,0.05)] rounded text-xs text-[rgba(255,255,255,0.5)]">
                        {formatContextLength(fullModel.contextLength)}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-[rgba(255,255,255,0.4)] truncate font-mono">
                    {model.id}
                  </div>
                </div>
                <button
                  onClick={() => onRemove(model.id)}
                  className="ml-3 p-1.5 text-[rgba(255,255,255,0.4)] hover:text-[#F7314C] hover:bg-[rgba(247,49,76,0.1)] rounded-lg transition-colors"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-4 text-[rgba(255,255,255,0.4)] text-sm border border-dashed border-[rgba(255,255,255,0.1)] rounded-xl">
          {emptyMessage}
        </div>
      )}
    </div>
  );
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const {
    availableModels,
    isLoadingModels,
    models,
    addModel,
    removeModel,
    apiKey,
    setApiKey,
    verdictModel,
    setVerdictModel,
    primaryModel,
    setPrimaryModel,
    critiqueModels,
    addCritiqueModel,
    removeCritiqueModel,
    reviewerModel,
    setReviewerModel,
    // Pre-mortem settings
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
  } = useModels();

  const { projects, createProject } = useProject();

  const [showApiKey, setShowApiKey] = useState(false);
  const [activeTab, setActiveTab] = useState<SettingsTab>("general");
  const [newProjectName, setNewProjectName] = useState("");
  const [isCreatingProject, setIsCreatingProject] = useState(false);

  const handleCreateProject = async () => {
    if (!newProjectName.trim()) return;
    setIsCreatingProject(true);
    await createProject(newProjectName.trim());
    setNewProjectName("");
    setIsCreatingProject(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-[#0a0a0a] rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden border border-[rgba(255,255,255,0.1)]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[rgba(255,255,255,0.06)]">
          <h2 className="text-xl font-bold text-white">Settings</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[rgba(255,255,255,0.05)] rounded-lg transition-colors"
          >
            <svg
              className="w-5 h-5 text-[rgba(255,255,255,0.5)]"
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

        {/* Content */}
        <div className="p-5 overflow-y-auto max-h-[calc(85vh-140px)]">
          {/* Tabs */}
          <div className="flex gap-2 mb-6 flex-wrap">
            <button
              onClick={() => setActiveTab("general")}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                activeTab === "general"
                  ? "bg-[#5BF731] text-[#050505]"
                  : "bg-[rgba(255,255,255,0.03)] text-[rgba(255,255,255,0.5)] hover:text-white hover:bg-[rgba(255,255,255,0.05)]"
              }`}
            >
              General
            </button>
            <button
              onClick={() => setActiveTab("multiask")}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                activeTab === "multiask"
                  ? "bg-[#5BF731] text-[#050505]"
                  : "bg-[rgba(255,255,255,0.03)] text-[rgba(255,255,255,0.5)] hover:text-white hover:bg-[rgba(255,255,255,0.05)]"
              }`}
            >
              MultiAsk
            </button>
            <button
              onClick={() => setActiveTab("critique")}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                activeTab === "critique"
                  ? "bg-[#F7314C] text-white"
                  : "bg-[rgba(255,255,255,0.03)] text-[rgba(255,255,255,0.5)] hover:text-white hover:bg-[rgba(255,255,255,0.05)]"
              }`}
            >
              Critique Chain
            </button>
            <button
              onClick={() => setActiveTab("premortem")}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                activeTab === "premortem"
                  ? "bg-[#F7C631] text-[#050505]"
                  : "bg-[rgba(255,255,255,0.03)] text-[rgba(255,255,255,0.5)] hover:text-white hover:bg-[rgba(255,255,255,0.05)]"
              }`}
            >
              Pre-mortem
            </button>
          </div>

          {/* General Settings */}
          {activeTab === "general" && (
            <>
              {/* API Key Section */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-[rgba(255,255,255,0.7)] mb-2">
                  OpenRouter API Key
                </label>
                <div className="relative">
                  <input
                    type={showApiKey ? "text" : "password"}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="sk-or-v1-..."
                    className="w-full px-4 py-3 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-xl text-white placeholder-[rgba(255,255,255,0.3)] focus:outline-none focus:ring-2 focus:ring-[#5BF731] focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgba(255,255,255,0.4)] hover:text-white"
                  >
                    {showApiKey ? (
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
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    ) : (
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
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                <p className="mt-2 text-sm text-[rgba(255,255,255,0.4)]">
                  Get your API key from{" "}
                  <a
                    href="https://openrouter.ai/keys"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#5BF731] hover:underline"
                  >
                    openrouter.ai/keys
                  </a>
                </p>
              </div>

              {/* Projects Section */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[rgba(255,255,255,0.7)] mb-3">
                  Projects
                </label>
                
                {/* Create Project */}
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    placeholder="New project name..."
                    className="flex-1 px-4 py-2.5 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-xl text-white text-sm placeholder-[rgba(255,255,255,0.3)] focus:outline-none focus:ring-2 focus:ring-[#5BF731]"
                    onKeyDown={(e) => e.key === "Enter" && handleCreateProject()}
                  />
                  <button
                    onClick={handleCreateProject}
                    disabled={!newProjectName.trim() || isCreatingProject}
                    className="px-4 py-2.5 bg-[#5BF731] hover:bg-[#4de028] disabled:bg-[rgba(255,255,255,0.05)] disabled:text-[rgba(255,255,255,0.2)] text-[#050505] font-medium rounded-xl transition-colors"
                  >
                    {isCreatingProject ? (
                      <div className="w-5 h-5 border-2 border-[#050505] border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Projects List */}
                {projects.length > 0 ? (
                  <div className="space-y-2">
                    {projects.map((project) => (
                      <div
                        key={project.id}
                        className="flex items-center justify-between p-3 bg-[rgba(91,247,49,0.05)] border border-[rgba(91,247,49,0.15)] rounded-xl"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[rgba(91,247,49,0.15)] flex items-center justify-center">
                            <svg className="w-4 h-4 text-[#5BF731]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                            </svg>
                          </div>
                          <span className="text-sm font-medium text-white">{project.name}</span>
                        </div>
                        <span className="text-xs text-[rgba(255,255,255,0.4)]">
                          {new Date(project.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-[rgba(255,255,255,0.4)] text-sm border border-dashed border-[rgba(255,255,255,0.1)] rounded-xl">
                    No projects yet. Create one to get started.
                  </div>
                )}
              </div>

              {/* Loading indicator for models */}
              {isLoadingModels && (
                <div className="px-4 py-3 bg-[rgba(91,247,49,0.08)] border border-[rgba(91,247,49,0.2)] rounded-xl flex items-center gap-3">
                  <div className="w-4 h-4 border-2 border-[#5BF731] border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm text-[#5BF731]">
                    Loading available models...
                  </span>
                </div>
              )}

              {/* Models count indicator */}
              {!isLoadingModels && availableModels.length > 0 && (
                <div className="px-4 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-xl">
                  <span className="text-sm text-[rgba(255,255,255,0.5)]">
                    ✓ {availableModels.length} models available in catalog
                  </span>
                </div>
              )}
            </>
          )}

          {/* MultiAsk Settings */}
          {activeTab === "multiask" && (
            <>
              {/* Verdict Model Section */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-[rgba(255,255,255,0.7)] mb-2">
                  Verdict Model
                </label>
                <ModelSelect
                  value={verdictModel}
                  onChange={setVerdictModel}
                  availableModels={availableModels}
                  placeholder="Select a verdict model..."
                  accentColor="green"
                />
                <p className="mt-2 text-sm text-[rgba(255,255,255,0.4)]">
                  This model will analyze all responses and provide a consensus
                  summary.
                </p>
              </div>

              {/* Models Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-semibold text-white">
                    Models to Query
                  </h3>
                  <span className="text-sm text-[rgba(255,255,255,0.4)]">
                    {models.length} added
                  </span>
                </div>

                <MultiModelSelect
                  selectedModels={models}
                  onAdd={addModel}
                  onRemove={removeModel}
                  availableModels={availableModels}
                  accentColor="green"
                  emptyMessage="No models added yet. Select models to compare their responses."
                />
              </div>
            </>
          )}

          {/* Critique Chain Settings */}
          {activeTab === "critique" && (
            <>
              {/* Primary Model */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[rgba(255,255,255,0.7)] mb-2">
                  <span className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#5BF731] flex items-center justify-center text-xs font-bold text-[#050505]">
                      1
                    </span>
                    Primary Model
                  </span>
                </label>
                <ModelSelect
                  value={primaryModel}
                  onChange={setPrimaryModel}
                  availableModels={availableModels}
                  placeholder="Select the primary model..."
                  accentColor="green"
                />
                <p className="mt-2 text-sm text-[rgba(255,255,255,0.4)]">
                  This model answers the question first.
                </p>
              </div>

              {/* Critique Models */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-sm font-medium text-[rgba(255,255,255,0.7)]">
                    <span className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#F7C631] flex items-center justify-center text-xs font-bold text-[#050505]">
                        2
                      </span>
                      Critique Models
                    </span>
                  </label>
                  <span className="text-sm text-[rgba(255,255,255,0.4)]">
                    {critiqueModels.length} added
                  </span>
                </div>

                <p className="text-sm text-[rgba(255,255,255,0.4)] mb-4">
                  These models critique the primary model&apos;s response.
                </p>

                <MultiModelSelect
                  selectedModels={critiqueModels}
                  onAdd={addCritiqueModel}
                  onRemove={removeCritiqueModel}
                  availableModels={availableModels}
                  accentColor="amber"
                  emptyMessage="No critique models added"
                />
              </div>

              {/* Reviewer Model */}
              <div>
                <label className="block text-sm font-medium text-[rgba(255,255,255,0.7)] mb-2">
                  <span className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#F7314C] flex items-center justify-center text-xs font-bold text-white">
                      3
                    </span>
                    Reviewer Model
                  </span>
                </label>
                <ModelSelect
                  value={reviewerModel}
                  onChange={setReviewerModel}
                  availableModels={availableModels}
                  placeholder="Select the reviewer model..."
                  accentColor="red"
                />
                <p className="mt-2 text-sm text-[rgba(255,255,255,0.4)]">
                  This model synthesizes all critiques into a final verdict.
                </p>
              </div>
            </>
          )}

          {/* Pre-mortem Settings */}
          {activeTab === "premortem" && (
            <>
              {/* Red Team Section */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-[rgba(247,49,76,0.2)] flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-[#F7314C]"
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
                  <div>
                    <h3 className="text-base font-semibold text-white">
                      Red Team (Failure Analysis)
                    </h3>
                    <p className="text-sm text-[rgba(255,255,255,0.4)]">
                      Models that identify potential failure points
                    </p>
                  </div>
                </div>

                {/* Red Team System Prompt */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-[rgba(255,255,255,0.7)] mb-2">
                    Red Team System Prompt
                  </label>
                  <textarea
                    value={redTeamPrompt}
                    onChange={(e) => setRedTeamPrompt(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-xl text-white placeholder-[rgba(255,255,255,0.3)] focus:outline-none focus:ring-2 focus:ring-[#F7314C] focus:border-transparent text-sm resize-none"
                  />
                </div>

                {/* Red Team Models */}
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-[rgba(255,255,255,0.7)]">
                    Red Team Models
                  </label>
                  <span className="text-sm text-[rgba(255,255,255,0.4)]">
                    {redTeamModels.length} added
                  </span>
                </div>
                <MultiModelSelect
                  selectedModels={redTeamModels}
                  onAdd={addRedTeamModel}
                  onRemove={removeRedTeamModel}
                  availableModels={availableModels}
                  accentColor="red"
                  emptyMessage="No red team models added"
                />
              </div>

              {/* Blue Team Section */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-[rgba(49,168,247,0.2)] flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-[#31A8F7]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">
                      Blue Team (Counter Strategies)
                    </h3>
                    <p className="text-sm text-[rgba(255,255,255,0.4)]">
                      Models that develop anti-fragile strategies
                    </p>
                  </div>
                </div>

                {/* Blue Team System Prompt */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-[rgba(255,255,255,0.7)] mb-2">
                    Blue Team System Prompt
                  </label>
                  <textarea
                    value={blueTeamPrompt}
                    onChange={(e) => setBlueTeamPrompt(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-xl text-white placeholder-[rgba(255,255,255,0.3)] focus:outline-none focus:ring-2 focus:ring-[#31A8F7] focus:border-transparent text-sm resize-none"
                  />
                </div>

                {/* Blue Team Models */}
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-[rgba(255,255,255,0.7)]">
                    Blue Team Models
                  </label>
                  <span className="text-sm text-[rgba(255,255,255,0.4)]">
                    {blueTeamModels.length} added
                  </span>
                </div>
                <MultiModelSelect
                  selectedModels={blueTeamModels}
                  onAdd={addBlueTeamModel}
                  onRemove={removeBlueTeamModel}
                  availableModels={availableModels}
                  accentColor="cyan"
                  emptyMessage="No blue team models added"
                />
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-[rgba(255,255,255,0.06)]">
          <button
            onClick={onClose}
            className="w-full py-3 bg-[#5BF731] hover:bg-[#4de028] text-[#050505] font-semibold rounded-xl transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
