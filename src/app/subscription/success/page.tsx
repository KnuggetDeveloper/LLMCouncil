"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function SubscriptionSuccessPage() {
  const router = useRouter();
  const { getIdToken } = useAuth();
  const [credits, setCredits] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
          setCredits(data.credits);
        }
      } catch (err) {
        console.error("Error fetching credits:", err);
      } finally {
        setLoading(false);
      }
    };

    // Wait a bit for webhook to process
    setTimeout(fetchCredits, 2000);
  }, [getIdToken]);

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800 rounded-2xl p-8 border border-gray-700 text-center">
        {/* Success Icon */}
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-green-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-white mb-3">
          Subscription Successful!
        </h1>
        <p className="text-gray-400 mb-8">
          Thank you for subscribing to the Pro Plan. Your credits have been
          added to your account.
        </p>

        {loading ? (
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-gray-400">Loading your new balance...</span>
          </div>
        ) : credits !== null ? (
          <div className="bg-gray-900 rounded-xl p-6 mb-8">
            <p className="text-sm text-gray-400 mb-2">Your New Balance</p>
            <p className="text-4xl font-bold text-white">
              {credits.toLocaleString()}
            </p>
            <p className="text-sm text-gray-400 mt-1">credits</p>
          </div>
        ) : null}

        <div className="space-y-3">
          <button
            onClick={() => router.push("/")}
            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Start Using Credits
          </button>
          <button
            onClick={() => router.push("/subscription")}
            className="w-full px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
          >
            View Subscription Details
          </button>
        </div>
      </div>
    </div>
  );
}
