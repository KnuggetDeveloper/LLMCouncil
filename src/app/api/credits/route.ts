import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { getUserWallet, microToDisplayCredits } from "@/lib/credits";

// GET /api/credits - Get user's credit balance
export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request);
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const wallet = await getUserWallet(user.uid);

    if (!wallet) {
      return NextResponse.json(
        { error: "Wallet not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      credits: microToDisplayCredits(wallet.balanceMicrocredits),
      subscriptionStatus: wallet.subscriptionStatus,
      currentPeriodEnd: wallet.currentPeriodEnd,
    });
  } catch (error) {
    console.error("Error fetching credits:", error);
    return NextResponse.json(
      { error: "Failed to fetch credits" },
      { status: 500 }
    );
  }
}

