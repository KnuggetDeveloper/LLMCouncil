import { NextRequest } from "next/server";
import { verifyIdToken } from "./firebase-admin";

// Helper to get authenticated user from request
export async function getAuthUser(request: NextRequest) {
  const authHeader = request.headers.get("Authorization");
  
  if (!authHeader?.startsWith("Bearer ")) {
    return null;
  }

  const idToken = authHeader.split("Bearer ")[1];
  const user = await verifyIdToken(idToken);
  
  return user;
}
