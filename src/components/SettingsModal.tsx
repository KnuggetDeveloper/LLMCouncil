"use client";

import { useState, useRef, useEffect } from "react";
import { useModels } from "@/context/ModelsContext";
import { AvailableModel } from "../../types";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type SettingsTab = "multiask" | "critique" | "premortem";

// Reusable Model Selector Dropdown Component
function ModelSelect({
  value,
  onChange,
  availableModels,
  placeholder = "Select a model...",
  accentColor = "blue",
}: {
  value: string;
  onChange: (modelId: string) => void;
  availableModels: AvailableModel[];
  placeholder?: string;
  accentColor?: "blue" | "purple" | "amber" | "red" | "cyan";
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const colorClasses = {
    blue: "focus:ring-blue-500 border-blue-500/50",
    purple: "focus:ring-purple-500 border-purple-500/50",
    amber: "focus:ring-amber-500 border-amber-500/50",
    red: "focus:ring-red-500 border-red-500/50",
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
        className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-left transition-colors ${
          isOpen ? colorClasses[accentColor] : "border-gray-600"
        } focus:outline-none focus:ring-2 ${colorClasses[accentColor]}`}
      >
        {selectedModel ? (
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <div className="font-medium text-white truncate">
                {selectedModel.name}
              </div>
              <div className="text-xs text-gray-500 truncate font-mono">
                {selectedModel.id}
              </div>
            </div>
            {selectedModel.contextLength && (
              <span className="ml-2 px-2 py-0.5 bg-gray-700 rounded text-xs text-gray-300">
                {formatContextLength(selectedModel.contextLength)} ctx
              </span>
            )}
          </div>
        ) : (
          <span className="text-gray-500">{placeholder}</span>
        )}
        <svg
          className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-transform ${
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
        <div className="absolute z-50 mt-1 w-full bg-gray-800 border border-gray-600 rounded-lg shadow-xl max-h-80 overflow-hidden">
          {/* Search input */}
          <div className="p-2 border-b border-gray-700">
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search models..."
              className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                  className={`w-full px-4 py-3 text-left hover:bg-gray-700 transition-colors ${
                    model.id === value ? "bg-gray-700/50" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-white">{model.name}</div>
                      {model.description && (
                        <div className="text-xs text-gray-400 line-clamp-2 mt-0.5">
                          {model.description}
                        </div>
                      )}
                      <div className="text-xs text-gray-500 font-mono mt-1">
                        {model.id}
                      </div>
                    </div>
                    {model.contextLength && (
                      <span className="shrink-0 px-2 py-0.5 bg-gray-700 rounded text-xs text-gray-300">
                        {formatContextLength(model.contextLength)}
                      </span>
                    )}
                  </div>
                </button>
              ))
            ) : (
              <div className="px-4 py-8 text-center text-gray-500 text-sm">
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
  accentColor = "blue",
  emptyMessage = "No models added yet",
}: {
  selectedModels: { id: string; name: string }[];
  onAdd: (modelId: string) => void;
  onRemove: (modelId: string) => void;
  availableModels: AvailableModel[];
  accentColor?: "blue" | "purple" | "amber" | "red" | "cyan";
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
    blue: "bg-blue-900/20 border-blue-700/30",
    purple: "bg-purple-900/20 border-purple-700/30",
    amber: "bg-amber-900/20 border-amber-700/30",
    red: "bg-red-900/20 border-red-700/30",
    cyan: "bg-cyan-900/20 border-cyan-700/30",
  };

  const buttonClasses = {
    blue: "bg-blue-600 hover:bg-blue-700",
    purple: "bg-purple-600 hover:bg-purple-700",
    amber: "bg-amber-600 hover:bg-amber-700",
    red: "bg-red-600 hover:bg-red-700",
    cyan: "bg-cyan-600 hover:bg-cyan-700",
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
          className={`px-4 py-3 ${buttonClasses[accentColor]} disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors`}
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
                className={`flex items-center justify-between p-3 ${bgClasses[accentColor]} border rounded-lg`}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <div className="font-medium text-white truncate text-sm">
                      {fullModel?.name || model.name}
                    </div>
                    {fullModel?.contextLength && (
                      <span className="px-1.5 py-0.5 bg-gray-700 rounded text-xs text-gray-300">
                        {formatContextLength(fullModel.contextLength)}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 truncate font-mono">
                    {model.id}
                  </div>
                </div>
                <button
                  onClick={() => onRemove(model.id)}
                  className="ml-3 p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors"
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
        <div className="text-center py-4 text-gray-500 text-sm border border-dashed border-gray-700 rounded-lg">
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

  const [showApiKey, setShowApiKey] = useState(false);
  const [activeTab, setActiveTab] = useState<SettingsTab>("multiask");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden border border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">Settings</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <svg
              className="w-6 h-6 text-gray-400"
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
        <div className="p-6 overflow-y-auto max-h-[calc(85vh-140px)]">
          {/* API Key Section - Always visible */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              OpenRouter API Key
            </label>
            <div className="relative">
              <input
                type={showApiKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-or-v1-..."
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
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
            <p className="mt-2 text-sm text-gray-500">
              Get your API key from{" "}
              <a
                href="https://openrouter.ai/keys"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                openrouter.ai/keys
              </a>
            </p>
          </div>

          {/* Loading indicator for models */}
          {isLoadingModels && (
            <div className="mb-4 px-4 py-3 bg-blue-900/20 border border-blue-500/30 rounded-lg flex items-center gap-3">
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-sm text-blue-400">
                Loading available models...
              </span>
            </div>
          )}

          {/* Models count indicator */}
          {!isLoadingModels && availableModels.length > 0 && (
            <div className="mb-4 px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg">
              <span className="text-sm text-gray-400">
                {availableModels.length} models available in catalog
              </span>
            </div>
          )}

          {/* Tabs */}
          <div className="flex gap-2 mb-6 flex-wrap">
            <button
              onClick={() => setActiveTab("multiask")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "multiask"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:text-white"
              }`}
            >
              MultiAsk
            </button>
            <button
              onClick={() => setActiveTab("critique")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "critique"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:text-white"
              }`}
            >
              Critique Chain
            </button>
            <button
              onClick={() => setActiveTab("premortem")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "premortem"
                  ? "bg-rose-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:text-white"
              }`}
            >
              Pre-mortem
            </button>
          </div>

          {/* MultiAsk Settings */}
          {activeTab === "multiask" && (
            <>
              {/* Verdict Model Section */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Verdict Model
                </label>
                <ModelSelect
                  value={verdictModel}
                  onChange={setVerdictModel}
                  availableModels={availableModels}
                  placeholder="Select a verdict model..."
                  accentColor="blue"
                />
                <p className="mt-2 text-sm text-gray-500">
                  This model will analyze all responses and provide a consensus
                  summary.
                </p>
              </div>

              {/* Models Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">
                    Models to Query
                  </h3>
                  <span className="text-sm text-gray-400">
                    {models.length} added
                  </span>
                </div>

                <MultiModelSelect
                  selectedModels={models}
                  onAdd={addModel}
                  onRemove={removeModel}
                  availableModels={availableModels}
                  accentColor="blue"
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
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <span className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold">
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
                  accentColor="blue"
                />
                <p className="mt-2 text-sm text-gray-500">
                  This model answers the question first.
                </p>
              </div>

              {/* Critique Models */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-sm font-medium text-gray-300">
                    <span className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-amber-600 flex items-center justify-center text-xs font-bold">
                        2
                      </span>
                      Critique Models
                    </span>
                  </label>
                  <span className="text-sm text-gray-400">
                    {critiqueModels.length} added
                  </span>
                </div>

                <p className="text-sm text-gray-500 mb-4">
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
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <span className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-xs font-bold">
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
                  accentColor="purple"
                />
                <p className="mt-2 text-sm text-gray-500">
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
                  <div className="w-8 h-8 rounded-lg bg-linear-to-br from-red-500 to-rose-600 flex items-center justify-center">
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
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Red Team (Failure Analysis)
                    </h3>
                    <p className="text-sm text-gray-500">
                      Models that identify potential failure points
                    </p>
                  </div>
                </div>

                {/* Red Team System Prompt */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Red Team System Prompt
                  </label>
                  <textarea
                    value={redTeamPrompt}
                    onChange={(e) => setRedTeamPrompt(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm resize-none"
                  />
                </div>

                {/* Red Team Models */}
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-300">
                    Red Team Models
                  </label>
                  <span className="text-sm text-gray-400">
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
                  <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
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
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Blue Team (Counter Strategies)
                    </h3>
                    <p className="text-sm text-gray-500">
                      Models that develop anti-fragile strategies
                    </p>
                  </div>
                </div>

                {/* Blue Team System Prompt */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Blue Team System Prompt
                  </label>
                  <textarea
                    value={blueTeamPrompt}
                    onChange={(e) => setBlueTeamPrompt(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
                  />
                </div>

                {/* Blue Team Models */}
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-300">
                    Blue Team Models
                  </label>
                  <span className="text-sm text-gray-400">
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
        <div className="p-6 border-t border-gray-700">
          <button
            onClick={onClose}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
