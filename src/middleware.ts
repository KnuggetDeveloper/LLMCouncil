/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware for route protection
// Note: Firebase auth state is managed client-side
// This middleware only provides basic API protection
// The actual token verification happens in API routes

export function middleware(request: NextRequest) {
  // Allow all requests to pass through
  // Auth is handled client-side by Firebase and server-side by token verification
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Only run on API routes (except auth endpoints)
    "/api/((?!auth).*)",
  ],
};
