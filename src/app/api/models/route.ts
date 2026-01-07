import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/models - List all available models
export async function GET() {
  try {
    const models = await prisma.availableModel.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json({ models });
  } catch (error) {
    console.error("Error fetching models:", error);
    return NextResponse.json(
      { error: "Failed to fetch models" },
      { status: 500 }
    );
  }
}

// POST /api/models - Add or update models (bulk upsert)
export async function POST(request: NextRequest) {
  try {
    const { models } = await request.json();

    if (!Array.isArray(models) || models.length === 0) {
      return NextResponse.json(
        { error: "Models array is required" },
        { status: 400 }
      );
    }

    const now = new Date();
    const insertedModels = [];

    for (const model of models) {
      if (!model.id || !model.name) {
        continue; // Skip invalid entries
      }

      // Upsert: insert or update on conflict
      await prisma.availableModel.upsert({
        where: { id: model.id },
        update: {
          name: model.name,
          description: model.description || null,
          contextLength: model.context_length || null,
          pricing: model.pricing || null,
          updatedAt: now,
        },
        create: {
          id: model.id,
          name: model.name,
          description: model.description || null,
          contextLength: model.context_length || null,
          pricing: model.pricing || null,
          createdAt: now,
          updatedAt: now,
        },
      });

      insertedModels.push(model.id);
    }

    return NextResponse.json({
      message: `Successfully processed ${insertedModels.length} models`,
      processedIds: insertedModels,
    });
  } catch (error) {
    console.error("Error saving models:", error);
    return NextResponse.json(
      { error: "Failed to save models" },
      { status: 500 }
    );
  }
}
