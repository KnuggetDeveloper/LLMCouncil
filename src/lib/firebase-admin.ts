import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getAuth, Auth } from "firebase-admin/auth";

let app: App | null = null;
let adminAuth: Auth | null = null;

// Lazy initialization of Firebase Admin
function getAdminAuth(): Auth {
  if (adminAuth) return adminAuth;

  if (!process.env.FIREBASE_ADMIN_PROJECT_ID) {
    throw new Error("FIREBASE_ADMIN_PROJECT_ID is not set");
  }
  if (!process.env.FIREBASE_ADMIN_CLIENT_EMAIL) {
    throw new Error("FIREBASE_ADMIN_CLIENT_EMAIL is not set");
  }
  if (!process.env.FIREBASE_ADMIN_PRIVATE_KEY) {
    throw new Error("FIREBASE_ADMIN_PRIVATE_KEY is not set");
  }

  if (getApps().length === 0) {
    app = initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        // Private key needs newlines to be properly parsed
        privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, "\n"),
      }),
    });
  } else {
    app = getApps()[0];
  }

  adminAuth = getAuth(app);
  return adminAuth;
}

// Verify Firebase ID token and return user data
export async function verifyIdToken(idToken: string) {
  try {
    const auth = getAdminAuth();
    const decodedToken = await auth.verifyIdToken(idToken);
    return {
      uid: decodedToken.uid,
      email: decodedToken.email,
      name: decodedToken.name,
      picture: decodedToken.picture,
    };
  } catch (error) {
    console.error("Error verifying Firebase token:", error);
    return null;
  }
}
