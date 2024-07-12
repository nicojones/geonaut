
import { AuthCard } from "@/components";
import { mustBeAuthenticated } from "@/functions/server";

import { ForgotPasswordForm } from "./ForgotPasswordForm";

export default async function ResetPassword (): Promise<JSX.Element> {
  await mustBeAuthenticated("/dashboard", false);

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
