"use client";

import Cookies from "js-cookie";
import { useFormState } from "react-dom";

import { useJwtTokenContext } from "@/context";
import { ILoginFormFields, IStorageKey } from "@/types";

import { signInSubmit } from "./sign-in-submit.function";
import { SignInFormFields } from "./SignInFormFields";

const INITIAL_STATE: Partial<ILoginFormFields> = {};

export const SignInForm = (): JSX.Element => {
  const { setJwt } = useJwtTokenContext();

  const handleFormSubmit = (_prevState: Partial<ILoginFormFields>, data: FormData): Promise<any> => {
    return signInSubmit(_prevState, data).then((r) => {
      const tokenCookie: string | undefined = Cookies.get("token" satisfies IStorageKey);
      if (tokenCookie) {
        setJwt(tokenCookie);
      }
      return r;
    });
  };

  const [errors, formAction] = useFormState<Partial<ILoginFormFields>, any>(handleFormSubmit, INITIAL_STATE);

  return (
    <>
      <form action={formAction}>
        <SignInFormFields errors={errors} />
      </form>
    </>
  );
};
