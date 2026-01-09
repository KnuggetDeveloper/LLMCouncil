import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import {
  deductCredits,
  usdToMicrousd,
  checkSufficientCredits,
  microToDisplayCredits,
} from "@/lib/credits";
import { v4 as uuidv4 } from "uuid";

interface ImageAttachment {
  type: "image";
  data: string; // base64 data URL
  mimeType: string;
}

interface PDFAttachment {
  type: "pdf";
  data: string; // base64 content (raw, not data URL)
  name: string;
}

type Attachment = ImageAttachment | PDFAttachment;

interface ChatRequest {
  message: string;
  modelId: string;
  apiKey: string;
  attachments?: Attachment[];
  activityType?: string;
}

// Extract text from PDF using pdf-parse
async function extractPDFText(base64Data: string): Promise<string> {
  try {
    // Dynamic import with type assertion to handle different module formats
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pdfParseModule = (await import("pdf-parse")) as any;
    const pdfParse = pdfParseModule.default ?? pdfParseModule;

    // Convert base64 to buffer
    const buffer = Buffer.from(base64Data, "base64");

    // Parse PDF
    const data = await pdfParse(buffer);

    return data.text || "";
  } catch (error) {
    console.error("PDF parsing error:", error);
    return "[Error: Could not extract text from PDF]";
  }
}

// Build message content for OpenRouter API
async function buildMessageContent(
  message: string,
  attachments?: Attachment[]
): Promise<
  string | Array<{ type: string; text?: string; image_url?: { url: string } }>
> {
  if (!attachments || attachments.length === 0) {
    return message;
  }

  // Build multimodal content array
  const content: Array<{
    type: string;
    text?: string;
    image_url?: { url: string };
  }> = [];

  // Process PDFs first - extract text and prepend to message
  let pdfContext = "";
  for (const attachment of attachments) {
    if (attachment.type === "pdf") {
      const pdfText = await extractPDFText(attachment.data);
      if (pdfText && pdfText.length > 0) {
        pdfContext += `\n\n--- Content from PDF: ${attachment.name} ---\n${pdfText}\n--- End of PDF ---\n`;
      }
    }
  }

  // Add text content (with PDF context if any)
  const fullTextMessage = pdfContext ? `${pdfContext}\n\n${message}` : message;

  content.push({
    type: "text",
    text: fullTextMessage,
  });

  // Add images
  for (const attachment of attachments) {
    if (attachment.type === "image") {
      content.push({
        type: "image_url",
        image_url: {
          url: attachment.data, // This is already a data URL
        },
      });
    }
  }

  // If only text content, return as string
  if (content.length === 1 && content[0].type === "text") {
    return content[0].text || message;
  }

  return content;
}

export async function POST(request: NextRequest) {
  try {
    const {
      message,
      modelId,
      apiKey,
      attachments,
      activityType = "chat",
    } = (await request.json()) as ChatRequest;

    if (!message || !modelId || !apiKey) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get authenticated user
    const user = await getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Generate unique request ID for idempotency
    const requestId = uuidv4();

    // Build message content (handles images and PDFs)
    const messageContent = await buildMessageContent(message, attachments);

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer":
            process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
          "X-Title": "LLM Council",
        },
        body: JSON.stringify({
          model: modelId,
          messages: [
            {
              role: "user",
              content: messageContent,
            },
          ],
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.error?.message || `API error: ${response.status}` },
        { status: response.status }
      );
    }

    // Return the stream
    const stream = response.body;
    if (!stream) {
      return NextResponse.json(
        { error: "No response stream" },
        { status: 500 }
      );
    }

    // Get generation ID from response headers (backup)
    let generationId = response.headers.get("x-openrouter-generation-id");

    console.log(
      `[Chat API] Request ${requestId} - Generation ID from headers: ${
        generationId || "NOT PROVIDED"
      }`
    );

    // Create a transform stream to parse generation ID from stream and track cost
    let capturedGenerationId: string | null = null;
    const { readable, writable } = new TransformStream({
      transform(chunk, controller) {
        // Pass through the chunk
        controller.enqueue(chunk);

        // Try to extract generation ID from the chunk if not already captured
        if (!capturedGenerationId) {
          try {
            const text = new TextDecoder().decode(chunk);
            const lines = text.split("\n");

            for (const line of lines) {
              if (line.startsWith("data: ")) {
                const data = line.slice(6).trim();
                if (data && data !== "[DONE]") {
                  try {
                    const parsed = JSON.parse(data);
                    if (parsed.id) {
                      capturedGenerationId = parsed.id;
                      console.log(
                        `[Chat API] Captured generation ID from stream: ${capturedGenerationId}`
                      );
                      break;
                    }
                  } catch {
                    // Skip invalid JSON
                  }
                }
              }
            }
          } catch {
            // Ignore decode errors
          }
        }
      },
    });

    // Pipe the response through the transform stream
    const pipePromise = stream.pipeTo(writable);

    // Use captured generation ID if header wasn't provided
    if (!generationId) {
      generationId = capturedGenerationId;
    }

    // Track cost after streaming completes
    pipePromise
      .then(async () => {
        console.log(`[Chat API] Stream completed for request ${requestId}`);

        // Use the captured generation ID if header wasn't available
        const finalGenerationId = generationId || capturedGenerationId;
        console.log(
          `[Chat API] Final generation ID: ${finalGenerationId || "NONE"}`
        );

        if (finalGenerationId) {
          try {
            // Wait a bit for OpenRouter to process the generation
            console.log(
              `[Chat API] Waiting 2s for OpenRouter to process generation ${finalGenerationId}...`
            );
            await new Promise((resolve) => setTimeout(resolve, 2000));

            // Query OpenRouter stats API for actual cost
            console.log(
              `[Chat API] Querying OpenRouter stats for generation ${finalGenerationId}...`
            );
            const statsResponse = await fetch(
              `https://openrouter.ai/api/v1/generation?id=${finalGenerationId}`,
              {
                headers: {
                  Authorization: `Bearer ${apiKey}`,
                },
              }
            );

            console.log(
              `[Chat API] Stats API response status: ${statsResponse.status}`
            );

            if (statsResponse.ok) {
              const statsData = await statsResponse.json();
              const costUsd = statsData.data?.total_cost || 0;

              console.log(`[Chat API] Cost from OpenRouter: $${costUsd}`);
              console.log(
                `[Chat API] Stats data:`,
                JSON.stringify(statsData, null, 2)
              );

              // Only deduct if there's a cost
              if (costUsd > 0) {
                const costMicrousd = usdToMicrousd(costUsd);

                console.log(
                  `[Chat API] Attempting to deduct ${costMicrousd} microusd from user ${user.uid}...`
                );

                // Deduct credits
                const deductResult = await deductCredits({
                  userId: user.uid,
                  requestId,
                  openrouterGenerationId: finalGenerationId,
                  modelUsed: modelId,
                  activityType,
                  costMicrousd,
                  tokenUsage: {
                    prompt_tokens: statsData.data?.tokens_prompt,
                    completion_tokens: statsData.data?.tokens_completion,
                    total_tokens:
                      (statsData.data?.tokens_prompt || 0) +
                      (statsData.data?.tokens_completion || 0),
                  },
                });

                if (!deductResult.success) {
                  console.error(
                    `[Chat API] ❌ Failed to deduct credits:`,
                    deductResult.error
                  );
                } else {
                  console.log(
                    `[Chat API] ✅ Credits deducted for user ${user.uid}. New balance: ${deductResult.balance}`
                  );
                }
              } else {
                console.warn(`[Chat API] ⚠️  Cost is $0, no credits deducted`);
              }
            } else {
              const errorText = await statsResponse.text();
              console.error(`[Chat API] ❌ Stats API failed:`, errorText);
            }
          } catch (error) {
            console.error(`[Chat API] ❌ Error tracking cost:`, error);
          }
        } else {
          console.warn(
            `[Chat API] ⚠️  No generation ID provided by OpenRouter, cannot track costs`
          );
        }
      })
      .catch((error) => {
        console.error(`[Chat API] ❌ Stream pipe error:`, error);
      });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "X-Request-Id": requestId,
        "X-Generation-Id": capturedGenerationId || generationId || "",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
