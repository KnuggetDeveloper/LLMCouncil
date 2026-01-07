import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";
import { getAuthUser } from "@/lib/auth";
import { Prisma } from "@/generated/prisma";

// GET /api/projects - List all projects for current user
export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const allProjects = await prisma.project.findMany({
      where: { userId: user.uid },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json({ projects: allProjects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// POST /api/projects - Create a new project
export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name } = await request.json();

    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { error: "Project name is required" },
        { status: 400 }
      );
    }

    const projectId = uuidv4();
    const now = new Date();

    // Create project with nested memory creation
    const project = await prisma.project.create({
      data: {
        id: projectId,
        userId: user.uid,
        name: name.trim(),
        createdAt: now,
        updatedAt: now,
        projectMemory: {
          create: {
            id: uuidv4(),
            summary: "",
            facts: [] as Prisma.InputJsonValue,
            decisions: [] as Prisma.InputJsonValue,
            openQuestions: [] as Prisma.InputJsonValue,
            updatedAt: now,
          },
        },
      },
    });

    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
