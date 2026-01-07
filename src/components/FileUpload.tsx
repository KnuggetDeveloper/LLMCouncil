"use client";

import React, { useRef, useState, useCallback, memo } from "react";
import { FileAttachment } from "../../types";
import { v4 as uuidv4 } from "uuid";

interface FileUploadProps {
  attachments: FileAttachment[];
  onAttachmentsChange: (attachments: FileAttachment[]) => void;
  disabled?: boolean;
  maxFiles?: number;
  maxSizeMB?: number;
}

// Supported file types
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
];
const ACCEPTED_PDF_TYPE = "application/pdf";
const ACCEPTED_TYPES = [...ACCEPTED_IMAGE_TYPES, ACCEPTED_PDF_TYPE];

function FileUploadInner({
  attachments,
  onAttachmentsChange,
  disabled = false,
  maxFiles = 5,
  maxSizeMB = 20,
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  const processFile = useCallback(
    async (file: File): Promise<FileAttachment | null> => {
      // Validate file type
      if (!ACCEPTED_TYPES.includes(file.type)) {
        setError(
          `Unsupported file type: ${file.type}. Use images (JPEG, PNG, GIF, WebP) or PDF.`
        );
        return null;
      }

      // Validate file size
      if (file.size > maxSizeBytes) {
        setError(
          `File too large: ${file.name}. Maximum size is ${maxSizeMB}MB.`
        );
        return null;
      }

      return new Promise((resolve) => {
        const reader = new FileReader();

        reader.onload = async (e) => {
          const result = e.target?.result as string;

          if (ACCEPTED_IMAGE_TYPES.includes(file.type)) {
            // For images, store the base64 data URL
            const base64 = result.split(",")[1]; // Remove the data URL prefix
            resolve({
              id: uuidv4(),
              type: "image",
              name: file.name,
              size: file.size,
              data: result, // Full data URL
              base64,
              mimeType: file.type,
              previewUrl: result,
            });
          } else if (file.type === ACCEPTED_PDF_TYPE) {
            // For PDFs, we'll extract text on the server side
            // Store the base64 for now
            const base64 = result.split(",")[1];
            resolve({
              id: uuidv4(),
              type: "pdf",
              name: file.name,
              size: file.size,
              data: base64, // Raw base64 for PDF
              base64,
              mimeType: file.type,
            });
          } else {
            resolve(null);
          }
        };

        reader.onerror = () => {
          setError(`Failed to read file: ${file.name}`);
          resolve(null);
        };

        reader.readAsDataURL(file);
      });
    },
    [maxSizeBytes, maxSizeMB]
  );

  const handleFiles = useCallback(
    async (files: FileList | File[]) => {
      setError(null);

      const fileArray = Array.from(files);
      const remainingSlots = maxFiles - attachments.length;

      if (fileArray.length > remainingSlots) {
        setError(
          `Can only add ${remainingSlots} more file(s). Maximum is ${maxFiles}.`
        );
        return;
      }

      setIsProcessing(true);

      const newAttachments: FileAttachment[] = [];
      for (const file of fileArray) {
        const attachment = await processFile(file);
        if (attachment) {
          newAttachments.push(attachment);
        }
      }

      if (newAttachments.length > 0) {
        onAttachmentsChange([...attachments, ...newAttachments]);
      }

      setIsProcessing(false);
    },
    [attachments, maxFiles, onAttachmentsChange, processFile]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        handleFiles(e.target.files);
      }
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [handleFiles]
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) {
        setIsDragging(true);
      }
    },
    [disabled]
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (disabled) return;

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFiles(e.dataTransfer.files);
      }
    },
    [disabled, handleFiles]
  );

  const removeAttachment = useCallback(
    (id: string) => {
      onAttachmentsChange(attachments.filter((a) => a.id !== id));
    },
    [attachments, onAttachmentsChange]
  );

  const handleButtonClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-3">
      {/* Upload button and drop zone */}
      <div
        className={`relative flex items-center gap-2 ${
          isDragging
            ? "ring-2 ring-blue-500 ring-offset-2 ring-offset-gray-900 rounded-xl"
            : ""
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED_TYPES.join(",")}
          multiple
          onChange={handleInputChange}
          className="hidden"
          disabled={disabled || isProcessing || attachments.length >= maxFiles}
        />

        <button
          type="button"
          onClick={handleButtonClick}
          disabled={disabled || isProcessing || attachments.length >= maxFiles}
          className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-gray-300 text-sm transition-colors border border-gray-700"
          title="Attach images or PDFs"
        >
          {isProcessing ? (
            <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              />
            </svg>
          )}
          <span>Attach</span>
        </button>

        <span className="text-xs text-gray-500">
          {attachments.length}/{maxFiles} files • Images & PDFs up to{" "}
          {maxSizeMB}MB
        </span>
      </div>

      {/* Error message */}
      {error && (
        <div className="flex items-center gap-2 px-3 py-2 bg-red-900/30 border border-red-500/30 rounded-lg text-red-400 text-sm">
          <svg
            className="w-4 h-4 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
          <button
            onClick={() => setError(null)}
            className="ml-auto text-red-400 hover:text-red-300"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}

      {/* Attachment previews */}
      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {attachments.map((attachment) => (
            <AttachmentPreview
              key={attachment.id}
              attachment={attachment}
              onRemove={removeAttachment}
              formatFileSize={formatFileSize}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Memoized attachment preview
const AttachmentPreview = memo(function AttachmentPreview({
  attachment,
  onRemove,
  formatFileSize,
}: {
  attachment: FileAttachment;
  onRemove: (id: string) => void;
  formatFileSize: (bytes: number) => string;
}) {
  return (
    <div className="relative group flex items-center gap-2 px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl">
      {attachment.type === "image" && attachment.previewUrl ? (
        <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-900 flex-shrink-0">
          <img
            src={attachment.previewUrl}
            alt={attachment.name}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="w-10 h-10 rounded-lg bg-red-900/30 border border-red-500/30 flex items-center justify-center flex-shrink-0">
          <svg
            className="w-5 h-5 text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
        </div>
      )}

      <div className="min-w-0 flex-1">
        <p
          className="text-sm text-white truncate max-w-[150px]"
          title={attachment.name}
        >
          {attachment.name}
        </p>
        <p className="text-xs text-gray-500">
          {attachment.type === "pdf" ? "PDF" : "Image"} •{" "}
          {formatFileSize(attachment.size)}
        </p>
      </div>

      <button
        onClick={() => onRemove(attachment.id)}
        className="p-1 rounded-lg bg-gray-700 hover:bg-red-600 text-gray-400 hover:text-white transition-colors"
        title="Remove attachment"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
});

const FileUpload = memo(FileUploadInner);
FileUpload.displayName = "FileUpload";

export default FileUpload;
