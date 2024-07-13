import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { raiseOnError, toQuery } from "@/functions/utils";
import { gFetch } from "@/functions/utils/fetch.function";
import { IFetch, IResponse, IResponseData, IStorageKey } from "@/types";

export const serverFetch = <
  T extends Record<string, any> = Record<string, any>,
  Body extends Record<string, any> | never = never,
>(
  options: IFetch<Body>,
): Promise<IResponseData<T>> => {
  return gFetch<T, Body>(options, cookies().get("token" satisfies IStorageKey)?.value ?? null)
    .catch((e: IResponse<T>) => {
      if (!e?.responseData) {
        console.error(e);
      } else if (e.responseData.status === 401) {
        redirect("/auth/logout" + toQuery({ status: e.responseData.status }));
      }
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw e;
    })
    .then(raiseOnError);
};
