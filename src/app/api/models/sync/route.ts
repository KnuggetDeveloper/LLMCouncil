import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface OpenRouterPricing {
  prompt: string;
  completion: string;
  request?: string;
  image?: string;
  image_token?: string;
  image_output?: string;
  audio?: string;
  input_audio_cache?: string;
  web_search?: string;
  internal_reasoning?: string;
  input_cache_read?: string;
  input_cache_write?: string;
  discount?: number;
}

interface OpenRouterModel {
  id: string;
  name: string;
  description: string;
  context_length: number | null;
  pricing: OpenRouterPricing;
  created: number;
  architecture: {
    modality: string | null;
    input_modalities: string[];
    output_modalities: string[];
  };
}

interface OpenRouterResponse {
  data: OpenRouterModel[];
}

/**
 * Fetch all available models from OpenRouter API
 */
async function fetchOpenRouterModels(): Promise<OpenRouterModel[]> {
  const apiKey = process.env.OPENROUTER_KEY;
  if (!apiKey) {
    throw new Error("OPENROUTER_KEY environment variable is not set");
  }

  const response = await fetch("https://openrouter.ai/api/v1/models", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenRouter API error (${response.status}): ${errorText}`);
  }

  const data: OpenRouterResponse = await response.json();
  return data.data;
}

/**
 * Transform OpenRouter model to our database format
 */
function transformModel(model: OpenRouterModel) {
  return {
    id: model.id,
    name: model.name,
    description: model.description || null,
    contextLength: model.context_length || null,
    pricing: {
      prompt: model.pricing.prompt,
      completion: model.pricing.completion,
      ...(model.pricing.request && { request: model.pricing.request }),
      ...(model.pricing.image && { image: model.pricing.image }),
      ...(model.pricing.image_token && {
        image_token: model.pricing.image_token,
      }),
      ...(model.pricing.image_output && {
        image_output: model.pricing.image_output,
      }),
      ...(model.pricing.audio && { audio: model.pricing.audio }),
      ...(model.pricing.input_audio_cache && {
        input_audio_cache: model.pricing.input_audio_cache,
      }),
      ...(model.pricing.web_search && { web_search: model.pricing.web_search }),
      ...(model.pricing.internal_reasoning && {
        internal_reasoning: model.pricing.internal_reasoning,
      }),
      ...(model.pricing.input_cache_read && {
        input_cache_read: model.pricing.input_cache_read,
      }),
      ...(model.pricing.input_cache_write && {
        input_cache_write: model.pricing.input_cache_write,
      }),
      ...(model.pricing.discount !== undefined && {
        discount: model.pricing.discount,
      }),
    },
  };
}

/**
 * POST /api/models/sync
 * Sync models from OpenRouter API to our database
 * - Updates existing models
 * - Adds new models
 * - Removes models that are no longer available
 */
export async function POST(request: NextRequest) {
  try {
    // Optional: Verify cron secret for security
    const authHeader = request.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;

    // If CRON_SECRET is set, verify it matches
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("[Model Sync] Starting model synchronization...");

    // Fetch models from OpenRouter
    const openRouterModels = await fetchOpenRouterModels();
    console.log(
      `[Model Sync] Fetched ${openRouterModels.length} models from OpenRouter`
    );

    if (openRouterModels.length === 0) {
      return NextResponse.json(
        { error: "No models returned from OpenRouter" },
        { status: 500 }
      );
    }

    // Transform models to our format
    const transformedModels = openRouterModels.map(transformModel);

    // Get list of model IDs from OpenRouter
    const openRouterModelIds = new Set(transformedModels.map((m) => m.id));

    // Get all existing models from our database
    const existingModels = await prisma.availableModel.findMany({
      select: { id: true },
    });
    const existingModelIds = new Set(existingModels.map((m) => m.id));

    // Calculate statistics
    const toAdd = transformedModels.filter((m) => !existingModelIds.has(m.id));
    const toUpdate = transformedModels.filter((m) =>
      existingModelIds.has(m.id)
    );
    const toDelete = Array.from(existingModelIds).filter(
      (id) => !openRouterModelIds.has(id)
    );

    console.log(`[Model Sync] Models to add: ${toAdd.length}`);
    console.log(`[Model Sync] Models to update: ${toUpdate.length}`);
    console.log(`[Model Sync] Models to delete: ${toDelete.length}`);

    const now = new Date();

    // Perform upserts for all models from OpenRouter
    let upsertedCount = 0;
    for (const model of transformedModels) {
      try {
        await prisma.availableModel.upsert({
          where: { id: model.id },
          update: {
            name: model.name,
            description: model.description,
            contextLength: model.contextLength,
            pricing: model.pricing,
            updatedAt: now,
          },
          create: {
            id: model.id,
            name: model.name,
            description: model.description,
            contextLength: model.contextLength,
            pricing: model.pricing,
            createdAt: now,
            updatedAt: now,
          },
        });
        upsertedCount++;
      } catch (error) {
        console.error(`[Model Sync] Error upserting model ${model.id}:`, error);
      }
    }

    // Delete models that are no longer available on OpenRouter
    let deletedCount = 0;
    if (toDelete.length > 0) {
      const deleteResult = await prisma.availableModel.deleteMany({
        where: {
          id: {
            in: toDelete,
          },
        },
      });
      deletedCount = deleteResult.count;
      console.log(`[Model Sync] Deleted ${deletedCount} unavailable models`);
    }

    const result = {
      success: true,
      timestamp: now.toISOString(),
      statistics: {
        total_from_openrouter: openRouterModels.length,
        upserted: upsertedCount,
        added: toAdd.length,
        updated: toUpdate.length,
        deleted: deletedCount,
      },
      deleted_model_ids: toDelete,
    };

    console.log("[Model Sync] Synchronization completed successfully");
    console.log("[Model Sync] Result:", JSON.stringify(result, null, 2));

    return NextResponse.json(result);
  } catch (error) {
    console.error("[Model Sync] Error syncing models:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/models/sync
 * Check sync status and last sync time
 */
export async function GET() {
  try {
    const modelCount = await prisma.availableModel.count();
    const latestModel = await prisma.availableModel.findFirst({
      orderBy: { updatedAt: "desc" },
      select: { updatedAt: true },
    });

    return NextResponse.json({
      total_models: modelCount,
      last_sync: latestModel?.updatedAt || null,
    });
  } catch (error) {
    console.error("[Model Sync] Error getting sync status:", error);
    return NextResponse.json(
      { error: "Failed to get sync status" },
      { status: 500 }
    );
  }
}
