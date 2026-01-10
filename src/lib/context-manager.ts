import { prisma } from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";
import { Prisma } from "@/generated/prisma";

// Token budget constants
const PROJECT_SUMMARY_BUDGET = 1500;
const RECENT_MESSAGES_BUDGET = 3000;
const CHARS_PER_TOKEN = 4; // Rough estimate

interface ContextMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface ProjectMemoryData {
  summary: string;
  facts: string[];
  decisions: { decision: string; reasoning: string; date: string }[];
  openQuestions: string[];
}

export class ContextManager {
  /**
   * Build a prompt with project context and recent messages
   */
  async buildPrompt(
    projectId: string,
    threadId: string,
    userMessage: string
  ): Promise<ContextMessage[]> {
    // Fetch project
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      throw new Error("Project not found");
    }

    // Fetch project memory
    const memory = await prisma.projectMemory.findUnique({
      where: { projectId: projectId },
    });

    // Fetch recent messages from current thread
    const recentMessages = await prisma.message.findMany({
      where: { threadId: threadId },
      orderBy: { createdAt: "desc" },
      take: 20,
    });

    // Build system prompt with project context
    let systemContent = `You are an AI assistant working on the project "${project.name}".`;

    if (memory) {
      if (memory.summary) {
        const truncatedSummary = this.truncateToTokenBudget(
          memory.summary,
          PROJECT_SUMMARY_BUDGET
        );
        systemContent += `\n\nProject Context:\n${truncatedSummary}`;
      }

      // Type cast JSON fields to their expected types
      const facts = memory.facts as string[] | null;
      if (facts && Array.isArray(facts) && facts.length > 0) {
        systemContent += `\n\nKey Facts:\n${facts
          .map((f) => `- ${f}`)
          .join("\n")}`;
      }

      const decisions = memory.decisions as Array<{
        decision: string;
        reasoning: string;
        date: string;
      }> | null;
      if (decisions && Array.isArray(decisions) && decisions.length > 0) {
        const recentDecisions = decisions.slice(-5);
        systemContent += `\n\nRecent Decisions:\n${recentDecisions
          .map((d) => `- ${d.decision} (${d.date})`)
          .join("\n")}`;
      }

      const openQuestions = memory.openQuestions as string[] | null;
      if (
        openQuestions &&
        Array.isArray(openQuestions) &&
        openQuestions.length > 0
      ) {
        systemContent += `\n\nOpen Questions:\n${openQuestions
          .map((q) => `- ${q}`)
          .join("\n")}`;
      }
    }

    const promptMessages: ContextMessage[] = [
      { role: "system", content: systemContent },
    ];

    // Add recent messages (reversed to chronological order)
    const messagesForContext = this.truncateMessagesToTokenBudget(
      recentMessages.reverse(),
      RECENT_MESSAGES_BUDGET
    );

    for (const msg of messagesForContext) {
      if (msg.role === "user" || msg.role === "assistant") {
        promptMessages.push({
          role: msg.role as "user" | "assistant",
          content: msg.content,
        });
      }
    }

    // Add current user message
    promptMessages.push({ role: "user", content: userMessage });

    return promptMessages;
  }

  /**
   * Get project context summary for display
   */
  async getProjectContext(
    projectId: string
  ): Promise<ProjectMemoryData | null> {
    const memory = await prisma.projectMemory.findUnique({
      where: { projectId: projectId },
    });

    if (!memory) return null;

    return {
      summary: memory.summary,
      facts: (memory.facts as string[]) || [],
      decisions:
        (memory.decisions as {
          decision: string;
          reasoning: string;
          date: string;
        }[]) || [],
      openQuestions: (memory.openQuestions as string[]) || [],
    };
  }

  /**
   * Get the current (highest) turn number for a thread
   */
  async getCurrentTurnNumber(threadId: string): Promise<number> {
    const result = await prisma.message.findFirst({
      where: { threadId: threadId },
      orderBy: { turnNumber: "desc" },
      select: { turnNumber: true },
    });
    return result?.turnNumber ?? 0;
  }

  /**
   * Save a message and trigger memory update if needed
   */
  async saveMessage(
    threadId: string,
    projectId: string,
    role: string,
    content: string,
    modelUsed?: string,
    metadata?: Record<string, unknown>,
    turnNumber?: number
  ): Promise<string> {
    const messageId = uuidv4();
    const now = new Date();

    // If turnNumber not provided, use the current turn for non-user roles
    // For user roles, increment to start a new turn
    let actualTurnNumber = turnNumber;
    if (actualTurnNumber === undefined) {
      const currentTurn = await this.getCurrentTurnNumber(threadId);
      actualTurnNumber =
        role === "user" ? currentTurn + 1 : Math.max(currentTurn, 1);
    }

    await prisma.message.create({
      data: {
        id: messageId,
        threadId,
        projectId,
        role,
        content,
        modelUsed,
        turnNumber: actualTurnNumber,
        metadata: (metadata || null) as Prisma.InputJsonValue,
        createdAt: now,
      },
    });

    // Update thread's updatedAt
    await prisma.thread.update({
      where: { id: threadId },
      data: { updatedAt: now },
    });

    // Check if we should update project memory
    const messageCount = await this.getProjectMessageCount(projectId);
    if (messageCount % 10 === 0) {
      // Trigger memory update asynchronously
      this.updateProjectMemory(projectId).catch(console.error);
    }

    return messageId;
  }

  /**
   * Update project memory by analyzing recent messages
   */
  async updateProjectMemory(projectId: string): Promise<void> {
    if (!process.env.OPENROUTER_KEY) {
      console.error("OpenRouter API key not configured");
      return;
    }

    // Fetch existing memory
    const existingMemory = await prisma.projectMemory.findUnique({
      where: { projectId: projectId },
    });

    // Fetch recent messages
    const recentMessages = await prisma.message.findMany({
      where: { projectId: projectId },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    if (recentMessages.length === 0) return;

    const messagesText = recentMessages
      .reverse()
      .map((m) => `[${m.role}]: ${m.content}`)
      .join("\n\n");

    const prompt = `Analyze this conversation history and update the project memory.

Current memory:
Summary: ${existingMemory?.summary || "No summary yet"}
Facts: ${JSON.stringify(existingMemory?.facts || [])}
Decisions: ${JSON.stringify(existingMemory?.decisions || [])}
Open Questions: ${JSON.stringify(existingMemory?.openQuestions || [])}

Recent messages:
${messagesText}

Return ONLY valid JSON with:
{
  "summary": "2-3 paragraph overview of project status, goals, and key topics discussed",
  "facts": ["fact1", "fact2", ...],
  "decisions": [{"decision": "...", "reasoning": "...", "date": "YYYY-MM-DD"}],
  "openQuestions": ["question1", ...]
}`;

    try {
      // Use backend OpenRouter API key
      const apiKey = process.env.OPENROUTER_KEY;
      if (!apiKey) {
        console.error("OpenRouter API key not configured");
        return;
      }

      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "openai/gpt-4o-mini", // Use a fast, cheap model for summarization
            messages: [{ role: "user", content: prompt }],
            response_format: { type: "json_object" },
          }),
        }
      );

      if (!response.ok) {
        console.error("Failed to update memory:", await response.text());
        return;
      }

      const data = await response.json();
      const memoryData = JSON.parse(data.choices[0].message.content);

      const now = new Date();
      const memoryId = existingMemory?.id || uuidv4();

      if (existingMemory) {
        await prisma.projectMemory.update({
          where: { id: existingMemory.id },
          data: {
            summary: memoryData.summary || existingMemory.summary,
            facts: (memoryData.facts ||
              existingMemory.facts) as Prisma.InputJsonValue,
            decisions: (memoryData.decisions ||
              existingMemory.decisions) as Prisma.InputJsonValue,
            openQuestions: (memoryData.openQuestions ||
              existingMemory.openQuestions) as Prisma.InputJsonValue,
            updatedAt: now,
          },
        });
      } else {
        await prisma.projectMemory.create({
          data: {
            id: memoryId,
            projectId,
            summary: memoryData.summary || "",
            facts: (memoryData.facts || []) as Prisma.InputJsonValue,
            decisions: (memoryData.decisions || []) as Prisma.InputJsonValue,
            openQuestions: (memoryData.openQuestions ||
              []) as Prisma.InputJsonValue,
            updatedAt: now,
          },
        });
      }
    } catch (error) {
      console.error("Error updating project memory:", error);
    }
  }

  /**
   * Get message count for a project
   */
  private async getProjectMessageCount(projectId: string): Promise<number> {
    const count = await prisma.message.count({
      where: { projectId: projectId },
    });
    return count;
  }

  /**
   * Truncate text to fit within token budget
   */
  private truncateToTokenBudget(text: string, tokenBudget: number): string {
    const charBudget = tokenBudget * CHARS_PER_TOKEN;
    if (text.length <= charBudget) return text;
    return text.slice(0, charBudget - 3) + "...";
  }

  /**
   * Truncate messages array to fit within token budget
   */
  private truncateMessagesToTokenBudget(
    msgs: { role: string; content: string }[],
    tokenBudget: number
  ): { role: string; content: string }[] {
    const charBudget = tokenBudget * CHARS_PER_TOKEN;
    let totalChars = 0;
    const result: { role: string; content: string }[] = [];

    // Start from most recent and work backwards
    for (let i = msgs.length - 1; i >= 0; i--) {
      const msgChars = msgs[i].content.length;
      if (totalChars + msgChars > charBudget) break;
      totalChars += msgChars;
      result.unshift(msgs[i]);
    }

    return result;
  }
}

export const contextManager = new ContextManager();
