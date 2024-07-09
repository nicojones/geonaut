"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { gFetch, raiseOnError } from "@/functions";
import { ILoggedIn, ILoggedInError, ILoggedInErrorReceived, ILoginBody, ILoginFormFields, IResponseData, IStorageKey } from "@/types";

export const signInSubmit = async (_prevState: Partial<ILoginFormFields>, data: FormData): Promise<any> => {
  "use server";
  const result: ILoggedIn | ILoggedInError<ILoginFormFields> = await gFetch<ILoggedIn, ILoginBody>({
    method: "POST",
    url: "/login/auth",
    body: {
      username: (data.get("username") as string) ?? "",
      password: (data.get("password") as string) ?? "",
    },
  })
    .then(raiseOnError)
    .then(r => {
      cookies().set("token" satisfies IStorageKey, r.token);
      return r as ILoggedIn;
    })
    .catch((e: IResponseData<ILoggedInErrorReceived<keyof ILoginFormFields>>) => {
      console.error(e);
      return { [e.field]: e.message, received: e.received } satisfies ILoggedInError<ILoginFormFields>;
    });

  if ("redirect" in result) {
    redirect(result.redirect);
  } else {
    return result;
  }
};
