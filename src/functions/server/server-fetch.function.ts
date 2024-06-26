import { cookies } from "next/headers";

import { gFetch } from "@/functions/fetch.function";
import { IFetch, IStorageKey } from "@/types";

export const serverFetch = <
  T extends Record<string, any> = Record<string, any>,
  Body extends Record<string, any> | never = never,
>(
  options: IFetch<Body>,
): Promise<T> => {
  // console.log("WILL USE COOKIE", cookies().get("token" satisfies IStorageKey)?.value);
  return gFetch<T, Body>(options, cookies().get("token" satisfies IStorageKey)?.value ?? null);
};
