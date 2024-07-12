"use client";

import { Alert, Typography } from "@mui/joy";
import { useFormState } from "react-dom";
import { toast } from "sonner";

import { IForgotPasswordFormFields, IRedirectionResponse } from "@/types";

import { forgotPasswordSubmit } from "./forgot-password-submit.function";
import { ForgotPasswordFormFields } from "./ForgotPasswordFormFields";

const INITIAL_STATE: Partial<IForgotPasswordFormFields> = {};

export const ForgotPasswordForm = (): JSX.Element => {
  const [errors, formAction] = useFormState<Partial<IForgotPasswordFormFields> & IRedirectionResponse, any>(
    forgotPasswordSubmit,
    INITIAL_STATE,
  );

  if (errors.message) {
    toast.success(errors.message);
    return (
      <Alert color="success" className="flex flex-col space-y-2">
        <p>if such an account exists, an email has been sent</p>
        <Typography level="body-lg">check your email</Typography>
      </Alert>
    );
  }

  return (
    <>
      <form action={formAction}>
        <ForgotPasswordFormFields errors={errors} />
      </form>
    </>
  );
};
