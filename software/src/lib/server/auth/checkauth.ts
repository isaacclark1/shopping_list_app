import { auth } from "@/auth";
import ServerError from "@/lib/ServerError";
import type { Session } from "next-auth";
import { redirect } from "next/navigation";

/**
 * Check if a user has an active session.
 *
 * @returns The session if the user has an active session; otherwise redirects the user to the login page.
 */
export const getUserRedirect = async (): Promise<Session["user"]> => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  return session.user;
};

/**
 * Check if a user has an active session (don't redirect).
 *
 * @returns The session if the user has an active session; otherwise null.
 */
export const getUserNoRedirect = async (): Promise<Session["user"] | null> => {
  const session = await auth();
  if (!session) return null;
  return session.user;
};

/**
 * Check if a user has an active session. Throw an error if they do not.
 *
 * @returns The session if the user has an active sesion.
 * @throws A ServerError if the user doensn't have an active session.
 */
export const getUserThrowError = async (): Promise<Session["user"]> => {
  const session = await auth();
  if (!session) {
    throw new ServerError("Authentication failed", 401);
  }

  return session.user;
};

/**
 * Check if a user has an active session and is an admin.
 *
 * @returns The session if the user has an active session and is an admin; otherwise null.
 */
export const getAdmin = async (): Promise<Session["user"] | null> => {
  const session = await auth();

  // If there is an active session and the user's role is "admin" grant access to resource.
  if (!session || session.user.role !== "admin") return null;

  return session.user;
};
