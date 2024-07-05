import { cookies } from "next/headers";

import { gFetch } from "@/functions/utils/fetch.function";
import { IFetch, IStorageKey } from "@/types";

export const serverFetch = <
  T extends Record<string, any> = Record<string, any>,
  Body extends Record<string, any> | never = never,
>(
  options: IFetch<Body>,
): Promise<T> => {
  return gFetch<T, Body>(options, cookies().get("token" satisfies IStorageKey)?.value ?? null);
};
