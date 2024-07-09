"use client";

import { useFormState } from "react-dom";

import { ISignupFormFields } from "@/types";

import { signUpSubmit } from "./sign-up-submit.function";
import { SignUpFormFields } from "./SignUpFormFields";

const INITIAL_STATE: Partial<ISignupFormFields> = {};

export const SignUpForm = (): JSX.Element => {
  const [errors, formAction] = useFormState<Partial<ISignupFormFields>, any>(signUpSubmit, INITIAL_STATE);

  return (
    <>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form action={formAction}>
        <SignUpFormFields errors={errors} />
      </form>
    </>
  );
};
