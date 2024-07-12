"use server";

import { gFetch, raiseOnError } from "@/functions";
import { ILoggedIn, ILoggedInError, ILoggedInErrorReceived, IResetPasswordFormFields, IResponseData } from "@/types";

export const resetPasswordSubmit = async (
  _prevState: Partial<IResetPasswordFormFields>,
  data: FormData,
): Promise<any> => {
  "use server";
  const result: ILoggedIn | ILoggedInError<IResetPasswordFormFields> =
    await gFetch<ILoggedIn, IResetPasswordFormFields>({
      method: "POST",
      url: "/login/reset/auth",
      body: {
        token: (data.get("token") as string) ?? "",
        password: (data.get("password") as string) ?? "",
        confirm: (data.get("confirm") as string) ?? "",
      },
    })
      .then(raiseOnError)
      .catch((e: IResponseData<ILoggedInErrorReceived<keyof IResetPasswordFormFields>>) => {
        console.error(e);
        return { [e.field]: e.message, received: e.received } satisfies ILoggedInError<IResetPasswordFormFields>;
      });

  return result;
};
