"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface CreditsData {
  credits: number;
  subscriptionStatus: string;
  currentPeriodEnd: string | null;
}

interface CreditsDisplayProps {
  isCollapsed?: boolean;
}

export default function CreditsDisplay({ isCollapsed = false }: CreditsDisplayProps) {
  const router = useRouter();
  const { user, getIdToken } = useAuth();
  const [creditsData, setCreditsData] = useState<CreditsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 3;

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
          setError(null);
          retryCount = 0; // Reset retry count on success
        } else if (response.status === 404 && retryCount < maxRetries) {
          // Wallet might not be created yet for new users, retry
          retryCount++;
          console.log(`Credits not found, retrying (${retryCount}/${maxRetries})...`);
          setTimeout(fetchCredits, 1000 * retryCount); // Exponential backoff
          return; // Don't set loading to false yet
        } else {
          setError("Failed to fetch credits");
        }
      } catch (err) {
        console.error("Error fetching credits:", err);
        if (retryCount < maxRetries) {
          retryCount++;
          setTimeout(fetchCredits, 1000 * retryCount);
          return;
        }
        setError("Failed to fetch credits");
      } finally {
        if (retryCount === 0 || retryCount >= maxRetries) {
          setLoading(false);
        }
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
      <div className={`flex items-center gap-2 px-3 py-2 bg-[rgba(255,255,255,0.03)] rounded-xl ${isCollapsed ? 'justify-center' : ''}`}>
        <div className="w-4 h-4 border-2 border-[#5BF731] border-t-transparent rounded-full animate-spin" />
        {!isCollapsed && <span className="text-xs text-[rgba(255,255,255,0.4)]">Loading...</span>}
      </div>
    );
  }

  if (error || !creditsData) {
    return (
      <div className={`flex items-center gap-2 px-3 py-2 bg-[rgba(247,49,76,0.08)] border border-[rgba(247,49,76,0.2)] rounded-xl ${isCollapsed ? 'justify-center' : ''}`}>
        {!isCollapsed && <span className="text-xs text-[#F7314C]">Credits unavailable</span>}
        {isCollapsed && <span className="text-[#F7314C]">!</span>}
      </div>
    );
  }

  const isLowCredits = creditsData.credits < 100;
  const isSubscribed = creditsData.subscriptionStatus === "active";

  // Collapsed view
  if (isCollapsed) {
    return (
      <div className="flex flex-col items-center gap-2">
        <button
          onClick={() => router.push("/subscription")}
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
            isLowCredits
              ? "bg-[rgba(247,198,49,0.15)] text-[#F7C631] hover:bg-[rgba(247,198,49,0.25)]"
              : "bg-[rgba(91,247,49,0.1)] text-[#5BF731] hover:bg-[rgba(91,247,49,0.2)]"
          }`}
          title={`${creditsData.credits.toLocaleString()} credits`}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    );
  }

  // Expanded view
  return (
    <div className="space-y-2">
      {/* Credits Display */}
      <div
        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
          isLowCredits
            ? "bg-[rgba(247,198,49,0.08)] border border-[rgba(247,198,49,0.2)]"
            : "bg-[rgba(91,247,49,0.05)] border border-[rgba(91,247,49,0.15)]"
        }`}
      >
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
          isLowCredits ? "bg-[rgba(247,198,49,0.15)]" : "bg-[rgba(91,247,49,0.15)]"
        }`}>
          <svg
            className={`w-4 h-4 ${isLowCredits ? "text-[#F7C631]" : "text-[#5BF731]"}`}
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
        <div className="flex-1 min-w-0">
          <p
            className={`text-sm font-semibold ${
              isLowCredits ? "text-[#F7C631]" : "text-white"
            }`}
          >
            {creditsData.credits.toLocaleString()}
          </p>
          <p className="text-[0.65rem] text-[rgba(255,255,255,0.4)]">
            {isSubscribed ? "Pro Plan" : "Free Plan"}
          </p>
        </div>
        {isLowCredits && (
          <span className="px-2 py-0.5 bg-[rgba(247,198,49,0.15)] text-[#F7C631] text-[0.6rem] font-semibold rounded-full">
            LOW
          </span>
        )}
      </div>

      {/* Upgrade Button */}
      {!isSubscribed && (
        <button
          onClick={() => router.push("/subscription")}
          className="w-full px-3 py-2.5 bg-[rgba(91,247,49,0.1)] hover:bg-[rgba(91,247,49,0.15)] border border-[rgba(91,247,49,0.2)] hover:border-[rgba(91,247,49,0.3)] text-[#5BF731] text-sm font-medium rounded-xl transition-all flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          Upgrade to Pro
        </button>
      )}
    </div>
  );
}
