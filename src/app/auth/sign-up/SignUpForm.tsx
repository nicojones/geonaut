"use client";

import Cookies from "js-cookie";
import { useFormState } from "react-dom";

import { useJwtTokenContext } from "@/context";
import { ISignupFormFields, IStorageKey } from "@/types";

import { signUpSubmit } from "./sign-up-submit.function";
import { SignUpFormFields } from "./SignUpFormFields";

const INITIAL_STATE: Partial<ISignupFormFields> = {};

export const SignUpForm = (): JSX.Element => {
  const { setJwt } = useJwtTokenContext();

  const handleFormSubmit = (_prevState: Partial<ISignupFormFields>, data: FormData): Promise<any> => {
    return signUpSubmit(_prevState, data).then((r) => {
      const tokenCookie: string | undefined = Cookies.get("token" satisfies IStorageKey);
      if (tokenCookie) {
        setJwt(tokenCookie);
      }
      return r;
    });
  };

  const [errors, formAction] = useFormState<Partial<ISignupFormFields>, any>(handleFormSubmit, INITIAL_STATE);

  return (
    <>
      <form action={formAction}>
        <SignUpFormFields errors={errors} />
      </form>
    </>
  );
};
