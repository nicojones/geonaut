"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { gFetch, raiseOnError } from "@/functions";
import { ILoggedIn, ILoggedInError, ILoggedInErrorReceived, IResponseData, ISignupBody, ISignupFormFields, IStorageKey } from "@/types";

export const signUpSubmit = async (_prevState: Partial<ISignupFormFields>, data: FormData): Promise<any> => {
  "use server";
  const result: ILoggedIn | ILoggedInError<ISignupFormFields> = await gFetch<ILoggedIn, ISignupBody>({
    method: "POST",
    url: "/login/auth/signup",
    body: {
      name: (data.get("name") as string) ?? "",
      email: (data.get("email") as string) ?? "",
      username: (data.get("username") as string) ?? "",
      password: (data.get("password") as string) ?? "",
    },
  })
    .then(raiseOnError)
    .then(r => {
      cookies().set("token" satisfies IStorageKey, r.token);
      return r as ILoggedIn;
    })
    .catch((e: IResponseData<ILoggedInErrorReceived<keyof ISignupFormFields>>) => {
      console.error(e);
      return { [e.field]: e.message, received: e.received } satisfies ILoggedInError<ISignupFormFields>;
    });

  if ("redirect" in result) {
    redirect(result.redirect);
  } else {
    return result;
  }
};
