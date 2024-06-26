
import { API_URL } from "@/config";
import { IFetch, IResponse } from "@/types";

export const gFetch = <
  T extends Record<string, any> = Record<string, any>,
  Body extends Record<string, any> | never = never,
>(
  {
    method = "POST",
    body,
    url = "/ajax/selfies",
  }: IFetch<Body>,
  token: string | null = null,
): Promise<T> => {
  return fetch(`${API_URL}${url}`, {
    method: method ?? "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? new URLSearchParams(body).toString() : undefined,
    credentials: "include",
  })
    .then(r => {
      // r.text().then(console.log);
      return r.json();
    })
    .then((r: IResponse<T>) => {
      if (!r.success) {
        console.log(r);
        throw new Error(r.responseData.message);
      }
      return r.responseData;
    });
};
