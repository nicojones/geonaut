"use client";

import { useFormState } from "react-dom";

import { ILoginFormFields } from "@/types";

import { signInSubmit } from "./sign-in-submit.function";
import { SignInFormFields } from "./SignInFormFields";

const INITIAL_STATE: Partial<ILoginFormFields> = {};

export const SignInForm = (): JSX.Element => {
  const [errors, formAction] = useFormState<Partial<ILoginFormFields>, any>(signInSubmit, INITIAL_STATE);

  return (
    <>
      <form action={formAction}>
        <SignInFormFields errors={errors} />
      </form>
    </>
  );
};
