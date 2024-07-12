"use client";

import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { toast } from "sonner";

import { IRedirectionResponse, IResetPasswordFormFields } from "@/types";

import { resetPasswordSubmit } from "./reset-password-submit.function";
import { ResetPasswordFormFields } from "./ResetPasswordFormFields";

interface ResetPasswordFormProps {
  email: string;
  token: string;
}

const INITIAL_STATE: Partial<IResetPasswordFormFields> = {};

export const ResetPasswordForm = ({ email, token }: ResetPasswordFormProps): JSX.Element => {
  const router = useRouter();
  const [errors, formAction] = useFormState<Partial<IResetPasswordFormFields> & IRedirectionResponse, any>(
    resetPasswordSubmit,
    INITIAL_STATE,
  );

  if (errors.redirect && errors.message) {
    toast.success(errors.message);
    router.push(errors.redirect);
  }

  return (
    <>
      <form action={formAction}>
        <input type="hidden" name="token" value={token} />

        <ResetPasswordFormFields errors={errors} email={email} />
      </form>
    </>
  );
};
