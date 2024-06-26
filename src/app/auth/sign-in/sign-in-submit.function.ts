"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { gFetch } from "@/functions";
import { ILoggedIn, ILoginBody, IStorageKey } from "@/types";

export const signInSubmit = async (data: FormData): Promise<any> => {
  "use server";
  const result: ILoggedIn = await gFetch<ILoggedIn, ILoginBody>({
    method: "POST",
    url: "/login/auth",
    body: {
      username: (data.get("username") as string) ?? "",
      password: (data.get("password") as string) ?? "",
    },
  })
    .then(r => {
      cookies().set("token" satisfies IStorageKey, r.token);
      return r;
    });

  redirect(result.redirect);
};
