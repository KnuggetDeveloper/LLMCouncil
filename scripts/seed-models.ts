// Seed script to sync models from OpenRouter API
// Run with: npx tsx scripts/seed-models.ts
// This script fetches the latest models from OpenRouter and syncs them to the database
import dotenv from "dotenv";

dotenv.config();

async function syncModelsFromOpenRouter() {
  const baseUrl = "http://localhost:3000";
  const cronSecret = process.env.CRON_SECRET;

  console.log("🔄 Syncing models from OpenRouter API...");
  console.log(`📍 Target: ${baseUrl}/api/models/sync`);
  if (cronSecret) {
    console.log("🔐 Using CRON_SECRET for authentication");
  }

  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    // Add authorization if CRON_SECRET is set
    if (cronSecret) {
      headers["Authorization"] = `Bearer ${cronSecret}`;
    }

    console.log("⏳ Sending sync request...");
    const response = await fetch(`${baseUrl}/api/models/sync`, {
      method: "POST",
      headers,
    });

    if (!response.ok) {
      let errorDetail = "";
      try {
        const contentType = response.headers.get("content-type");
        if (contentType?.includes("application/json")) {
          const errorJson = await response.json();
          errorDetail =
            errorJson.error || errorJson.message || JSON.stringify(errorJson);
        } else {
          errorDetail = await response.text();
        }
      } catch (parseError) {
        errorDetail = `Unable to parse error response: ${parseError}`;
      }

      if (!errorDetail.trim()) {
        errorDetail = response.statusText || "Unknown error";
      }

      throw new Error(`HTTP ${response.status}: ${errorDetail}`);
    }

    const result = await response.json();
    console.log("✓ Successfully synced models from OpenRouter");
    console.log("\n📊 Statistics:");
    console.log(
      `  - Total from OpenRouter: ${result.statistics.total_from_openrouter}`
    );
    console.log(`  - Added: ${result.statistics.added}`);
    console.log(`  - Updated: ${result.statistics.updated}`);
    console.log(`  - Deleted: ${result.statistics.deleted}`);

    if (result.deleted_model_ids && result.deleted_model_ids.length > 0) {
      console.log("\n🗑️  Deleted models (no longer available):");
      result.deleted_model_ids.forEach((id: string) => {
        console.log(`  - ${id}`);
      });
    }

    console.log(`\n✅ Sync completed at: ${result.timestamp}`);
  } catch (error) {
    console.error("❌ Error syncing models:", error);

    // Provide helpful hints
    if (error instanceof Error) {
      if (
        error.message.includes("ECONNREFUSED") ||
        error.message.includes("fetch failed")
      ) {
        console.error(
          "\n💡 Tip: Make sure your development server is running:"
        );
        console.error("   npm run dev");
      } else if (error.message.includes("401")) {
        console.error("\n💡 Tip: Check your CRON_SECRET environment variable");
      } else if (error.message.includes("500")) {
        console.error(
          "\n💡 Tip: Check your OPENROUTER_KEY environment variable"
        );
      }
    }

    process.exit(1);
  }
}

syncModelsFromOpenRouter();
