import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { IStorageKey } from "@/types";

/**
 * Redirect (in server components) if the user is not authenticated.
 */
export const mustBeAuthenticated = async (
  redirectTo: string = "/",
  mustBeAuthed: boolean = true,
): Promise<void> => {
  "use server"; // server only

  const jwt = cookies().get("token" satisfies IStorageKey)?.value ?? null;

  if ((!jwt && mustBeAuthed) || (jwt && !mustBeAuthed)) {
    redirect(redirectTo);
  }
};
