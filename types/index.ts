export interface Model {
  id: string;
  name: string; // Display name (can be same as id or customized)
}

// Available model from the database catalog
export interface AvailableModel {
  id: string;
  name: string;
  description: string | null;
  contextLength: number | null;
  pricing: {
    prompt: string;
    completion: string;
    image?: string;
    request?: string;
  } | null;
}

export interface ModelResponse {
  modelId: string;
  content: string;
  isLoading: boolean;
  error?: string;
}

// File attachment types
export interface FileAttachment {
  id: string;
  type: "image" | "pdf";
  name: string;
  size: number;
  // For images: base64 data URL
  // For PDFs: extracted text content
  data: string;
  // Original base64 for images (without data URL prefix)
  base64?: string;
  // MIME type
  mimeType: string;
  // Preview URL for images
  previewUrl?: string;
}

// Message content can be text or multimodal
export interface MessageContent {
  type: "text" | "image_url";
  text?: string;
  image_url?: {
    url: string; // base64 data URL for images
  };
}
