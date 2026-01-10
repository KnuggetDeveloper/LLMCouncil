import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contextManager } from "@/lib/context-manager";

// GET /api/threads/:id/messages - Get messages for a thread
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const threadMessages = await prisma.message.findMany({
      where: { threadId: id },
      orderBy: { createdAt: 'asc' },
    });

    return NextResponse.json({ messages: threadMessages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

// POST /api/threads/:id/messages - Save a message
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: threadId } = await params;
    const { role, content, modelUsed, metadata, turnNumber } = await request.json();

    // Get thread to find project ID
    const thread = await prisma.thread.findUnique({
      where: { id: threadId },
    });

    if (!thread) {
      return NextResponse.json(
        { error: "Thread not found" },
        { status: 404 }
      );
    }

    const messageId = await contextManager.saveMessage(
      threadId,
      thread.projectId,
      role,
      content,
      modelUsed,
      metadata,
      turnNumber
    );

    // Update memory in background
    contextManager.updateProjectMemory(thread.projectId).catch(console.error);

    return NextResponse.json({ messageId }, { status: 201 });
  } catch (error) {
    console.error("Error saving message:", error);
    return NextResponse.json(
      { error: "Failed to save message" },
      { status: 500 }
    );
  }
}

// GET /api/threads/:id/messages/turn - Get current turn number
export async function HEAD(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: threadId } = await params;
    const turnNumber = await contextManager.getCurrentTurnNumber(threadId);
    return new NextResponse(null, {
      headers: { "X-Turn-Number": turnNumber.toString() },
    });
  } catch {
    return new NextResponse(null, { status: 500 });
  }
}
