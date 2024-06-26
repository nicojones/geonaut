import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { IStorageKey } from "@/types";

/**
 * Redirect (in server components) if the user is not authenticated.
 */
export const isAuthenticated = async (redirectTo: string = "/"): Promise<void> => {
  "use server"; // server only

  const jwt = cookies().get("token" satisfies IStorageKey)?.value ?? null;
  if (!jwt) {
    redirect(redirectTo);
  }
};
