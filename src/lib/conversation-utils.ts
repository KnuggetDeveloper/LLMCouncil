import { ModelResponse } from "../../types";

export interface Message {
  id: string;
  threadId: string;
  projectId: string;
  role: string;
  content: string;
  modelUsed: string | null;
  turnNumber: number;
  metadata: Record<string, unknown> | null;
  createdAt: Date;
}

// MultiAsk conversation turn
export interface MultiAskTurn {
  question: string;
  responses: Record<string, ModelResponse>;
  verdict: { content: string; isLoading: boolean; error?: string } | null;
  turnNumber: number;
}

// Critique Chain conversation turn
export interface CritiqueChainTurn {
  question: string;
  primaryResponse: { content: string; isLoading: boolean; error?: string };
  critiqueResponses: Record<
    string,
    { content: string; isLoading: boolean; error?: string }
  >;
  reviewResponse: {
    content: string;
    isLoading: boolean;
    error?: string;
  } | null;
  turnNumber: number;
}

/**
 * Reconstruct MultiAsk conversation history from saved messages
 */
export function reconstructMultiAskHistory(
  messages: Message[]
): MultiAskTurn[] {
  // Group messages by turn number
  const turnMap = new Map<number, Message[]>();

  for (const msg of messages) {
    const turn = msg.turnNumber;
    if (!turnMap.has(turn)) {
      turnMap.set(turn, []);
    }
    turnMap.get(turn)!.push(msg);
  }

  // Convert to turns, sorted by turn number
  const turns: MultiAskTurn[] = [];
  const sortedTurnNumbers = Array.from(turnMap.keys()).sort((a, b) => a - b);

  for (const turnNumber of sortedTurnNumbers) {
    const turnMessages = turnMap.get(turnNumber)!;

    // Find the user question
    const userMsg = turnMessages.find((m) => m.role === "user");
    if (!userMsg) continue; // Skip turns without a user question

    // Find all assistant responses (grouped by model)
    const responses: Record<string, ModelResponse> = {};
    for (const msg of turnMessages) {
      if (msg.role === "assistant" && msg.modelUsed) {
        responses[msg.modelUsed] = {
          modelId: msg.modelUsed,
          content: msg.content,
          isLoading: false,
        };
      }
    }

    // Find verdict
    const verdictMsg = turnMessages.find((m) => m.role === "verdict");
    const verdict = verdictMsg
      ? { content: verdictMsg.content, isLoading: false }
      : null;

    turns.push({
      question: userMsg.content,
      responses,
      verdict,
      turnNumber,
    });
  }

  return turns;
}

/**
 * Reconstruct Critique Chain conversation history from saved messages
 */
export function reconstructCritiqueChainHistory(
  messages: Message[]
): CritiqueChainTurn[] {
  // Group messages by turn number
  const turnMap = new Map<number, Message[]>();

  for (const msg of messages) {
    const turn = msg.turnNumber;
    if (!turnMap.has(turn)) {
      turnMap.set(turn, []);
    }
    turnMap.get(turn)!.push(msg);
  }

  // Convert to turns, sorted by turn number
  const turns: CritiqueChainTurn[] = [];
  const sortedTurnNumbers = Array.from(turnMap.keys()).sort((a, b) => a - b);

  for (const turnNumber of sortedTurnNumbers) {
    const turnMessages = turnMap.get(turnNumber)!;

    // Find the user question
    const userMsg = turnMessages.find((m) => m.role === "user");
    if (!userMsg) continue; // Skip turns without a user question

    // Find primary response (first assistant message)
    const primaryMsg = turnMessages.find((m) => m.role === "assistant");
    const primaryResponse = primaryMsg
      ? { content: primaryMsg.content, isLoading: false }
      : { content: "", isLoading: false };

    // Find all critique responses (grouped by model)
    const critiqueResponses: Record<
      string,
      { content: string; isLoading: boolean; error?: string }
    > = {};
    for (const msg of turnMessages) {
      if (msg.role === "critique" && msg.modelUsed) {
        critiqueResponses[msg.modelUsed] = {
          content: msg.content,
          isLoading: false,
        };
      }
    }

    // Find review
    const reviewMsg = turnMessages.find((m) => m.role === "review");
    const reviewResponse = reviewMsg
      ? { content: reviewMsg.content, isLoading: false }
      : null;

    turns.push({
      question: userMsg.content,
      primaryResponse,
      critiqueResponses,
      reviewResponse,
      turnNumber,
    });
  }

  return turns;
}

/**
 * Get the latest turn number from messages
 */
export function getLatestTurnNumber(messages: Message[]): number {
  if (messages.length === 0) return 0;
  return Math.max(...messages.map((m) => m.turnNumber));
}
