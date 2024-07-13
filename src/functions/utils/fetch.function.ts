
import { IFetch, IResponse } from "@/types";

export const gFetch = <
  T extends Record<string, any> = Record<string, any>,
  Body extends Record<string, any> | never = never,
>(
  {
    method = "POST",
    body,
    url = "/api/selfies",
    contentType = "application/x-www-form-urlencoded",
    signal,
    cache = undefined,
  }: IFetch<Body>,
  token: string | null = null,
): Promise<IResponse<T>> => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL as string}${url}`, {
    signal,
    next: { cache } as any,
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
    .then((r: Response) => {
      const status = r.status;
      const ok = r.ok;
      return (
        r.json()
          .then((response: IResponse<T>) => {
            response.responseData.status = status;
            if (ok) {
              return response;
            } else {
              // eslint-disable-next-line @typescript-eslint/no-throw-literal
              throw response;
            }
          })
      );
    //   return r.text().then(t => {
    //     try {
    //       console.log(t);
    //       const parsed = JSON.parse(t);
    //       parsed.responseData.status = status;
    //       if (ok) {
    //         return parsed;
    //       } else {
    //         // eslint-disable-next-line @typescript-eslint/no-throw-literal
    //         throw parsed;
    //       }
    //     } catch (e) {
    //       return {} as unknown as T;
    //     }
    //   });
    });
};
