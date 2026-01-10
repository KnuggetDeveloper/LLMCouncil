"use client";

import { useEffect } from "react";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning";
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onCancel();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  const variantStyles = {
    danger: {
      icon: "text-[#F7314C]",
      iconBg: "bg-[rgba(247,49,76,0.15)]",
      button: "bg-[#F7314C] hover:bg-[#e02139] text-white shadow-[0_0_30px_rgba(247,49,76,0.3)] hover:shadow-[0_0_40px_rgba(247,49,76,0.4)]",
    },
    warning: {
      icon: "text-[#F7C631]",
      iconBg: "bg-[rgba(247,198,49,0.15)]",
      button: "bg-[#F7C631] hover:bg-[#e5b62d] text-[#050505] shadow-[0_0_30px_rgba(247,198,49,0.3)] hover:shadow-[0_0_40px_rgba(247,198,49,0.4)]",
    },
  };

  const styles = variantStyles[variant];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] animate-in fade-in duration-200"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-[rgba(20,20,20,0.95)] backdrop-blur-xl rounded-2xl border border-[rgba(255,255,255,0.1)] shadow-2xl max-w-md w-full p-6 pointer-events-auto animate-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Icon */}
          <div className={`w-14 h-14 rounded-xl ${styles.iconBg} flex items-center justify-center mx-auto mb-4`}>
            <svg
              className={`w-7 h-7 ${styles.icon}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          {/* Content */}
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-white mb-2">
              {title}
            </h3>
            <p className="text-sm text-[rgba(255,255,255,0.6)] leading-relaxed">
              {message}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-3 bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] text-[rgba(255,255,255,0.7)] hover:text-white border border-[rgba(255,255,255,0.1)] rounded-xl font-medium transition-all"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all ${styles.button}`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
