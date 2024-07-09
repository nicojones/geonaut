import { cookies } from "next/headers";

import { raiseOnError } from "@/functions/utils";
import { gFetch } from "@/functions/utils/fetch.function";
import { IFetch, IResponseData, IStorageKey } from "@/types";

export const serverFetch = <
  T extends Record<string, any> = Record<string, any>,
  Body extends Record<string, any> | never = never,
>(
  options: IFetch<Body>,
): Promise<IResponseData<T>> => {
  return gFetch<T, Body>(options, cookies().get("token" satisfies IStorageKey)?.value ?? null)
    .then(raiseOnError);
};
