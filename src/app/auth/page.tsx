"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import NetworkCanvas from "@/components/NetworkCanvas";
import Link from "next/link";

export default function AuthPage() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { user, isLoading: authLoading, signInWithGoogle } = useAuth();
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && user) {
      router.push("/dashboard");
    }
  }, [user, authLoading, router]);

  const handleGoogleSignIn = async () => {
    setError("");
    setIsLoading(true);

    const result = await signInWithGoogle();

    if (result.error) {
      setError(result.error);
      setIsLoading(false);
    }
  };

  // Show loading while checking auth state
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <NetworkCanvas />
        <div className="relative z-10 w-8 h-8 border-2 border-[#5BF731] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4 relative">
      <NetworkCanvas />

      <div className="w-full max-w-md relative z-10">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <Link href="/">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Image
                src="/logo.png"
                alt="Rigorus Logo"
                width={60}
                height={60}
                className="object-contain"
              />
              <h1 className="text-3xl font-bold text-white">rigorus</h1>
            </div>
          </Link>
          <p className="text-[rgba(255,255,255,0.7)] text-lg">
            Stop thinking alone
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-[rgba(91,247,49,0.03)] backdrop-blur-[20px] border border-[rgba(91,247,49,0.15)] rounded-3xl p-10">
          <h2 className="text-2xl font-semibold text-white text-center mb-8">
            Sign in to continue
          </h2>

          {error && (
            <div className="mb-6 p-4 bg-[rgba(247,49,76,0.1)] border border-[rgba(247,49,76,0.3)] rounded-xl text-[#F7314C] text-sm">
              {error}
            </div>
          )}

          {/* Google Sign-In Button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-white hover:bg-gray-100 disabled:bg-gray-300 text-gray-800 font-semibold rounded-full transition-all disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            {isLoading ? (
              <svg
                className="w-5 h-5 animate-spin text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : (
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            )}
            {isLoading ? "Signing in..." : "Continue with Google"}
          </button>

          <p className="mt-8 text-center text-xs text-[rgba(255,255,255,0.5)]">
            By signing in, you agree to our{" "}
            <a
              href="#"
              className="text-[#5BF731] hover:underline transition-colors"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="text-[#5BF731] hover:underline transition-colors"
            >
              Privacy Policy
            </a>
          </p>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-[rgba(255,255,255,0.5)] text-sm mb-4">
            Pressure-test your startup&apos;s decisions with an AI board of directors
          </p>
          <div className="flex items-center justify-center gap-6 text-xs text-[rgba(255,255,255,0.4)]">
            <span className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-[#5BF731]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Multiple AI Models
            </span>
            <span className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-[#5BF731]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Project Context
            </span>
            <span className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-[#5BF731]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Critique Chain
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
