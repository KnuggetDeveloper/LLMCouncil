import { NextRequest, NextResponse } from "next/server";
import { verifyIdToken } from "@/lib/firebase-admin";
import { prisma } from "@/lib/prisma";
import { SIGNUP_GRANT_MICRO } from "@/lib/credits";

// POST /api/auth/sync - Sync Firebase user to our database
export async function POST(request: NextRequest) {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const idToken = authHeader.split("Bearer ")[1];
    const firebaseUser = await verifyIdToken(idToken);

    if (!firebaseUser) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const now = new Date();

    // Upsert user (create if not exists, update if exists)
    await prisma.user.upsert({
      where: { id: firebaseUser.uid },
      update: {
        email: firebaseUser.email || "",
        name: firebaseUser.name || null,
        photoURL: firebaseUser.picture || null,
        updatedAt: now,
      },
      create: {
        id: firebaseUser.uid,
        email: firebaseUser.email || "",
        name: firebaseUser.name || null,
        photoURL: firebaseUser.picture || null,
        createdAt: now,
        updatedAt: now,
      },
    });

    // Create wallet if it doesn't exist (grant signup credits)
    await prisma.userWallet.upsert({
      where: { userId: firebaseUser.uid },
      update: {}, // No-op if wallet exists
      create: {
        userId: firebaseUser.uid,
        balanceMicrocredits: SIGNUP_GRANT_MICRO,
        subscriptionStatus: "free",
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Sync error:", error);
    return NextResponse.json({ error: "Failed to sync user" }, { status: 500 });
  }
}
