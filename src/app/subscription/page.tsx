"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

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
          returnUrl: `${window.location.origin}/subscription/success`,
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
      <div className="min-h-screen bg-linear-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const isSubscribed = creditsData?.subscriptionStatus === "active";

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Subscription Plans
          </h1>
          <p className="text-xl text-gray-400">
            Choose the plan that works best for you
          </p>
        </div>

        {/* Current Credits */}
        {creditsData && (
          <div className="max-w-md mx-auto mb-12 p-6 bg-gray-800 rounded-xl border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Current Balance</p>
                <p className="text-3xl font-bold text-white">
                  {creditsData.credits.toLocaleString()}
                </p>
                <p className="text-sm text-gray-400 mt-1">credits</p>
              </div>
              <div className="text-right">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    isSubscribed
                      ? "bg-green-900/30 text-green-400 border border-green-500/30"
                      : "bg-gray-700 text-gray-300"
                  }`}
                >
                  {isSubscribed ? "Pro Plan" : "Free Plan"}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Pricing Cards */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Free Plan */}
          <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-2">Free Plan</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-white">1,500</span>
              <span className="text-gray-400 ml-2">credits</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-green-400 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-300">
                  One-time 1,500 credits on signup
                </span>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-green-400 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-300">Access to all models</span>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-green-400 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-300">
                  Pay-as-you-go after credits run out
                </span>
              </li>
            </ul>
            <button
              disabled
              className="w-full px-6 py-3 bg-gray-700 text-gray-400 rounded-lg font-medium cursor-not-allowed"
            >
              Current Plan
            </button>
          </div>

          {/* Pro Plan */}
          <div className="bg-linear-to-b from-blue-600 to-blue-800 rounded-2xl p-8 border-2 border-blue-400 relative">
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 bg-yellow-400 text-gray-900 text-xs font-bold rounded-full">
                POPULAR
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Pro Plan</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-white">$20</span>
              <span className="text-blue-200 ml-2">/ month</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-green-300 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-white font-medium">
                  20,000 credits per month
                </span>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-green-300 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-white font-medium">
                  Unused credits roll over (up to 2 months)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-green-300 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-white font-medium">
                  40,000 credit cap maximum
                </span>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-green-300 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-white font-medium">
                  Access to all models
                </span>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-green-300 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-white font-medium">Priority support</span>
              </li>
            </ul>

            {error && (
              <div className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded-lg">
                <p className="text-sm text-red-200">{error}</p>
              </div>
            )}

            <button
              onClick={handleSubscribe}
              disabled={checkoutLoading || isSubscribed}
              className={`w-full px-6 py-3 rounded-lg font-medium transition-colors ${
                isSubscribed
                  ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                  : checkoutLoading
                  ? "bg-blue-700 text-white cursor-wait"
                  : "bg-white text-blue-600 hover:bg-gray-100"
              }`}
            >
              {checkoutLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  Loading...
                </span>
              ) : isSubscribed ? (
                "Already Subscribed"
              ) : (
                "Subscribe Now"
              )}
            </button>
          </div>
        </div>

        {/* Conversion Info */}
        <div className="max-w-3xl mx-auto mt-12 p-6 bg-gray-800/50 rounded-xl border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">
            How Credits Work
          </h3>
          <div className="space-y-3 text-gray-300">
            <p>
              • Credits are deducted based on actual API usage:{" "}
              <strong>$1 = 1,500 credits</strong>
            </p>
            <p>
              • Different models have different costs per request (charged by
              OpenRouter)
            </p>
            <p>
              • Example: If a request costs $0.01, you&apos;ll be charged 15
              credits
            </p>
            <p>
              • Pro plan credits roll over for up to 2 months (40,000 credit
              maximum)
            </p>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center mt-8">
          <button
            onClick={() => router.push("/")}
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
