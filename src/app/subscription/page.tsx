"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface CreditsData {
  credits: number;
  subscriptionStatus: string;
  currentPeriodEnd: string | null;
}

export default function SubscriptionPage() {
  const { user, getIdToken } = useAuth();
  const router = useRouter();
  const [creditsData, setCreditsData] = useState<CreditsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      router.push("/auth");
      return;
    }

    const fetchCredits = async () => {
      const idToken = await getIdToken();
      if (!idToken) return;

      try {
        const response = await fetch("/api/credits", {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCreditsData(data);
        }
      } catch (err) {
        console.error("Error fetching credits:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCredits();
  }, [user, getIdToken, router]);

  const handleSubscribe = async () => {
    const idToken = await getIdToken();
    if (!idToken) return;

    setCheckoutLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/subscription/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          returnUrl: `${window.location.origin}/dashboard`,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const data = await response.json();

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (err) {
      console.error("Error creating checkout:", err);
      setError("Failed to start checkout. Please try again.");
      setCheckoutLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-[#5BF731] border-t-transparent rounded-full animate-spin" />
          <p className="text-[rgba(255,255,255,0.5)] text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  const isSubscribed = creditsData?.subscriptionStatus === "active";

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(91,247,49,0.08),transparent_60%)]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(91,247,49,0.05),transparent_60%)]" />
      </div>

      <div className="relative container mx-auto px-4 py-12">
        {/* Header with Logo */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <Image
            src="/logo.png"
            alt="Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <span className="font-bold text-2xl text-white">rigorus</span>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Choose Your Plan
          </h1>
          <p className="text-lg text-[rgba(255,255,255,0.6)] max-w-md mx-auto">
            Unlock the full potential of AI-powered decision making
          </p>
        </div>

        {/* Current Credits Card */}
        {creditsData && (
          <div className="max-w-md mx-auto mb-12 p-6 bg-[rgba(255,255,255,0.02)] rounded-2xl border border-[rgba(255,255,255,0.08)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[rgba(91,247,49,0.1)] flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-[#5BF731]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-[rgba(255,255,255,0.5)] mb-1">
                    Current Balance
                  </p>
                  <p className="text-2xl font-bold text-white">
                    {creditsData.credits.toLocaleString()}
                    <span className="text-sm font-normal text-[rgba(255,255,255,0.4)] ml-2">
                      credits
                    </span>
                  </p>
                </div>
              </div>
              <span
                className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                  isSubscribed
                    ? "bg-[rgba(91,247,49,0.15)] text-[#5BF731] border border-[rgba(91,247,49,0.3)]"
                    : "bg-[rgba(255,255,255,0.05)] text-[rgba(255,255,255,0.5)] border border-[rgba(255,255,255,0.1)]"
                }`}
              >
                {isSubscribed ? "Pro Plan" : "Free Plan"}
              </span>
            </div>
          </div>
        )}

        {/* Pricing Cards */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          {/* Free Plan */}
          <div className="bg-[rgba(255,255,255,0.02)] rounded-2xl p-8 border border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.15)] transition-colors">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-2">Free Plan</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-white">1,500</span>
                <span className="text-[rgba(255,255,255,0.4)]">credits</span>
              </div>
              <p className="text-sm text-[rgba(255,255,255,0.4)] mt-2">
                One-time on signup
              </p>
            </div>

            <ul className="space-y-3 mb-8">
              {[
                "One-time 1,500 credits on signup",
                "Access to all AI models",
                "All thinking modes available",
                "Project-based organization",
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-[#5BF731] mt-0.5 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-[rgba(255,255,255,0.7)] text-sm">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <button
              disabled
              className="w-full px-6 py-3.5 bg-[rgba(255,255,255,0.03)] text-[rgba(255,255,255,0.3)] border border-[rgba(255,255,255,0.08)] rounded-xl font-medium cursor-not-allowed"
            >
              Current Plan
            </button>
          </div>

          {/* Pro Plan */}
          <div className="relative bg-[rgba(91,247,49,0.03)] rounded-2xl p-8 border-2 border-[rgba(91,247,49,0.3)] hover:border-[rgba(91,247,49,0.5)] transition-colors">
            {/* Popular Badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="px-4 py-1.5 bg-[#5BF731] text-[#050505] text-xs font-bold rounded-full shadow-[0_0_20px_rgba(91,247,49,0.4)]">
                RECOMMENDED
              </span>
            </div>

            <div className="mb-6 mt-2">
              <h3 className="text-xl font-bold text-white mb-2">Pro Plan</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-[#5BF731]">$20</span>
                <span className="text-[rgba(255,255,255,0.4)]">/ month</span>
              </div>
              <p className="text-sm text-[rgba(255,255,255,0.4)] mt-2">
                20,000 credits monthly
              </p>
            </div>

            <ul className="space-y-3 mb-8">
              {[
                "20,000 credits per month",
                "Unused credits roll over (up to 2 months)",
                "40,000 credit cap maximum",
                "Access to all AI models",
                "Priority support",
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-[#5BF731] mt-0.5 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-white text-sm font-medium">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {error && (
              <div className="mb-4 p-3 bg-[rgba(247,49,76,0.1)] border border-[rgba(247,49,76,0.3)] rounded-xl">
                <p className="text-sm text-[#F7314C]">{error}</p>
              </div>
            )}

            <button
              onClick={handleSubscribe}
              disabled={checkoutLoading || isSubscribed}
              className={`w-full px-6 py-3.5 rounded-xl font-semibold transition-all ${
                isSubscribed
                  ? "bg-[rgba(255,255,255,0.03)] text-[rgba(255,255,255,0.3)] border border-[rgba(255,255,255,0.08)] cursor-not-allowed"
                  : checkoutLoading
                  ? "bg-[rgba(91,247,49,0.2)] text-[#5BF731] cursor-wait"
                  : "bg-[#5BF731] hover:bg-[#4de028] text-[#050505] shadow-[0_0_30px_rgba(91,247,49,0.3)] hover:shadow-[0_0_40px_rgba(91,247,49,0.4)]"
              }`}
            >
              {checkoutLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-[#5BF731] border-t-transparent rounded-full animate-spin" />
                  Processing...
                </span>
              ) : isSubscribed ? (
                "Already Subscribed"
              ) : (
                "Subscribe Now"
              )}
            </button>
          </div>
        </div>

        {/* How Credits Work */}
        <div className="max-w-3xl mx-auto mt-12 p-6 bg-[rgba(255,255,255,0.02)] rounded-2xl border border-[rgba(255,255,255,0.08)]">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <svg
              className="w-5 h-5 text-[#5BF731]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            How Credits Work
          </h3>
          <div className="space-y-3 text-[rgba(255,255,255,0.6)] text-sm">
            <p className="flex items-start gap-2">
              <span className="text-[#5BF731]">•</span>
              Credits are deducted based on actual API usage:{" "}
              <strong className="text-white">$1 = 1,500 credits</strong>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-[#5BF731]">•</span>
              Different models have different costs per request (charged by
              OpenRouter)
            </p>
            <p className="flex items-start gap-2">
              <span className="text-[#5BF731]">•</span>
              Example: If a request costs $0.01, you&apos;ll be charged 15
              credits
            </p>
            <p className="flex items-start gap-2">
              <span className="text-[#5BF731]">•</span>
              Pro plan credits roll over for up to 2 months (40,000 credit
              maximum)
            </p>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center mt-8">
          <button
            onClick={() => router.push("/dashboard")}
            className="text-[rgba(255,255,255,0.5)] hover:text-[#5BF731] transition-colors flex items-center gap-2 mx-auto"
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
