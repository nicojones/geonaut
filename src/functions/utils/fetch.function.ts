
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
    // return fetch(`${'https://travel.kupfer.es' as string}${url}`, {

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
            if (ok) {
              response.status = status;
              return response;
            } else if (response) {
              // eslint-disable-next-line @typescript-eslint/no-throw-literal
              throw { ...response, status } satisfies IResponse<T>;
            } else {
              // eslint-disable-next-line @typescript-eslint/no-throw-literal
              throw { success: 0, status, responseData: response } satisfies IResponse<T>;
            }
          })
      );
      // return r.text().then(unparsed => {
      //   try {
      //     console.log(unparsed);
      //     const response: IResponse = JSON.parse(unparsed);
      //     response.status = status;
      //     if (ok) {
      //       response.status = status;
      //       return response;
      //     } else if (response) {
      //       // eslint-disable-next-line @typescript-eslint/no-throw-literal
      //       throw { ...response, status };
      //     } else {
      //       // eslint-disable-next-line @typescript-eslint/no-throw-literal
      //       throw { success: 0, responseData: { status, response } };
      //     }
      //   } catch (e) {
      //     return {} as unknown as T;
      //   }
      // });
    });
};
