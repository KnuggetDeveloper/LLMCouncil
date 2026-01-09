"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface CreditsData {
  credits: number;
  subscriptionStatus: string;
  currentPeriodEnd: string | null;
}

export default function CreditsDisplay() {
  const router = useRouter();
  const { user, getIdToken } = useAuth();
  const [creditsData, setCreditsData] = useState<CreditsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCredits = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      const idToken = await getIdToken();
      if (!idToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/credits", {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCreditsData(data);
        } else {
          setError("Failed to fetch credits");
        }
      } catch (err) {
        console.error("Error fetching credits:", err);
        setError("Failed to fetch credits");
      } finally {
        setLoading(false);
      }
    };

    fetchCredits();

    // Refresh credits every 30 seconds
    const interval = setInterval(fetchCredits, 30000);
    return () => clearInterval(interval);
  }, [user, getIdToken]);

  if (!user) return null;

  if (loading) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 bg-gray-800 rounded-lg">
        <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-sm text-gray-400">Loading...</span>
      </div>
    );
  }

  if (error || !creditsData) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 bg-red-900/20 border border-red-500/30 rounded-lg">
        <span className="text-sm text-red-400">Credits unavailable</span>
      </div>
    );
  }

  const isLowCredits = creditsData.credits < 100;
  const isSubscribed = creditsData.subscriptionStatus === "active";

  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
          isLowCredits
            ? "bg-yellow-900/20 border border-yellow-500/30"
            : "bg-gray-800 border border-gray-700"
        }`}
      >
        <svg
          className={`w-4 h-4 ${
            isLowCredits ? "text-yellow-400" : "text-blue-400"
          }`}
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
        <div className="flex flex-col">
          <span
            className={`text-sm font-semibold ${
              isLowCredits ? "text-yellow-400" : "text-white"
            }`}
          >
            {creditsData.credits.toLocaleString()} credits
          </span>
          {isSubscribed && (
            <span className="text-xs text-gray-400">Pro Plan</span>
          )}
        </div>
      </div>

      {!isSubscribed && (
        <button
          onClick={() => router.push("/subscription")}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          Upgrade
        </button>
      )}

      {isLowCredits && !isSubscribed && (
        <div className="text-xs text-yellow-400">Running low on credits!</div>
      )}
    </div>
  );
}
