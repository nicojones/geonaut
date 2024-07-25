
import { Metadata } from "next";

import { AuthCard } from "@/components";

import { ForgotPasswordForm } from "./ForgotPasswordForm";

export const metadata: Metadata = {
  title: "forgot password - geonaut",
  description: "reset your password to access your profile",
};

export default async function ResetPassword (): Promise<JSX.Element> {
  return (
    <AuthCard
      title="forgot your login?"
      orElse={{
        text: ["remembering again?", "sign in"],
        url: "/auth/sign-in",
      }}
    >
      <ForgotPasswordForm />
    </AuthCard>
  );
}
