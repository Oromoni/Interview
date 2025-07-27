"use server";

import { db, auth } from "@/firebase/admin";
import { cookies } from "next/headers";

const ONE_WEEK = 60 * 60 * 24 * 7; // 1 week in seconds

// ---- SIGN UP ----
export async function SignUp(params: SignUpParams) {
  const { uid, name, email } = params;

  try {
    const userRecord = await db.collection("users").doc(uid).get();

    if (userRecord.exists) {
      return {
        success: false,
        message: "User already exists. Please sign in instead",
      };
    }

    await db.collection("users").doc(uid).set({ name, email });

    return {
      success: true,
      message: "User created successfully",
    };
  } catch (error: any) {
    console.error("Error during sign up:", error);

    if (error.code === "auth/email-already-exist") {
      return {
        success: false,
        message: "This email is already in use.",
      };
    }

    return {
      success: false,
      message: "Failed to create an account.",
    };
  }
}

// ---- SET SESSION COOKIE ----
export async function setSessionCookie(idToken: string) {
  const cookieStore = cookies();
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: ONE_WEEK * 1000, // Convert to milliseconds
  });

  // @ts-expect-error: TypeScript doesn't recognize .set here, but it's valid in server actions
  cookieStore.set("session", sessionCookie, {
    maxAge: ONE_WEEK,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
}

// ---- SIGN IN ----
export async function signIn(params: SignInParams) {
  const { email, idToken } = params;

  try {
    const userRecord = await auth.getUserByEmail(email);

    if (!userRecord) {
      return {
        success: false,
        message: "User not found. Please sign up.",
      };
    }

    await setSessionCookie(idToken);

    return {
      success: true,
      message: "Signed in successfully",
    };
  } catch (e) {
    console.error("Sign in error:", e);

    return {
      success: false,
      message: "Failed to sign in.",
    };
  }
}

// ---- GET CURRENT USER ----
export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get("session")?.value;

  if (!sessionCookie) return null;

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
    const userRecord = await db.collection("users").doc(decodedClaims.uid).get();

    if (!userRecord.exists) return null;

    return {
      ...userRecord.data(),
      id: userRecord.id,
    } as User;
  } catch (e) {
    console.error("Error getting current user:", e);
    return null;
  }
}

// ---- IS AUTHENTICATED ----
export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}

// ---- LOGOUT ----
export async function logout() {
  const cookieStore = cookies();

  // @ts-expect-error: cookies().set is valid in server actions
  cookieStore.set("session", "", {
    maxAge: 0,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });

  return { success: true };
}
