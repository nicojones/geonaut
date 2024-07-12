"use server";

import { gFetch, raiseOnError } from "@/functions";
import { IForgotPasswordFormFields, ILoggedIn, ILoggedInError, ILoggedInErrorReceived, IResponseData } from "@/types";

export const forgotPasswordSubmit = async (
  _prevState: Partial<IForgotPasswordFormFields>,
  data: FormData,
): Promise<any> => {
  "use server";
  const result: ILoggedIn | ILoggedInError<IForgotPasswordFormFields> =
    await gFetch<ILoggedIn, IForgotPasswordFormFields>({
      method: "POST",
      url: "/login/forgot",
      body: {
        email: (data.get("email") as string) ?? "",
      },
    })
      .then(raiseOnError)
      .catch((e: IResponseData<ILoggedInErrorReceived<keyof IForgotPasswordFormFields>>) => {
        console.error(e);
        return { [e.field]: e.message, received: e.received } satisfies ILoggedInError<IForgotPasswordFormFields>;
      });

  return result;
};
