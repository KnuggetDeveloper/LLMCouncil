import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contextManager } from "@/lib/context-manager";

// GET /api/projects/:id/memory - Get project memory
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const memory = await prisma.projectMemory.findUnique({
      where: { projectId: id },
    });

    return NextResponse.json({ memory });
  } catch (error) {
    console.error("Error fetching memory:", error);
    return NextResponse.json(
      { error: "Failed to fetch memory" },
      { status: 500 }
    );
  }
}

// POST /api/projects/:id/memory/refresh - Manually trigger memory update
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { apiKey } = await request.json();

    if (!apiKey) {
      return NextResponse.json({ error: "API key required" }, { status: 400 });
    }

    await contextManager.updateProjectMemory(id, apiKey);

    const memory = await prisma.projectMemory.findUnique({
      where: { projectId: id },
    });

    return NextResponse.json({ memory });
  } catch (error) {
    console.error("Error refreshing memory:", error);
    return NextResponse.json(
      { error: "Failed to refresh memory" },
      { status: 500 }
    );
  }
}
