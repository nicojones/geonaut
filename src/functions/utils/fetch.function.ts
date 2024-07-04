
import { IFetch, IResponse } from "@/types";

export const gFetch = <
  T extends Record<string, any> = Record<string, any>,
  Body extends Record<string, any> | never = never,
>(
  {
    method = "POST",
    body,
    url = "/ajax/selfies",
    contentType = "application/x-www-form-urlencoded",
  }: IFetch<Body>,
  token: string | null = null,
): Promise<T> => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL as string}${url}`, {
    method: method ?? "POST",
    headers: {
      ...(contentType === false ? {} : { "Content-Type": contentType }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: (
      body
        ? (
          body instanceof FormData
            ? body
            : new URLSearchParams(body).toString()
        )
        : undefined
    ),
    credentials: "include",
  })
    .then(r => {
      console.log("RESPONSE HERE");
      return r.text().then(t => {
        console.log("original", t);
        try {
          return JSON.parse(t);
        } catch (e) {
          return {} as unknown as T;
        }
      });
      // return r.json();
    })
    .then((r: IResponse<T>) => {
      console.log(r);
      if (!r.success) {
        console.log(r);
        throw new Error(r.responseData.message);
      }
      return r.responseData;
    });
};
