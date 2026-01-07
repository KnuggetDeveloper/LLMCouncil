import { NextRequest, NextResponse } from "next/server";

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
}

// Extract text from PDF using pdf-parse
async function extractPDFText(base64Data: string): Promise<string> {
  try {
    // Dynamic import with type assertion to handle different module formats
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pdfParseModule = await import("pdf-parse") as any;
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
): Promise<string | Array<{ type: string; text?: string; image_url?: { url: string } }>> {
  if (!attachments || attachments.length === 0) {
    return message;
  }

  // Build multimodal content array
  const content: Array<{ type: string; text?: string; image_url?: { url: string } }> = [];
  
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
  const fullTextMessage = pdfContext 
    ? `${pdfContext}\n\n${message}`
    : message;
  
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
    const { message, modelId, apiKey, attachments } = (await request.json()) as ChatRequest;

    if (!message || !modelId || !apiKey) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Build message content (handles images and PDFs)
    const messageContent = await buildMessageContent(message, attachments);

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "LLM Compare",
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

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
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
