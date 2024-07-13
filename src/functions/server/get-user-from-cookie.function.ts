import { cookies } from "next/headers";

import { getUserFromJwt } from "@/functions/utils/jwt.function";
import { IStorageKey, IUserSettings } from "@/types";

export const getUserFromCookie = async (): Promise<IUserSettings | null> => {
  "use server";
  const jwt = cookies().get("token" satisfies IStorageKey)?.value ?? null;
  return getUserFromJwt(jwt);
};
