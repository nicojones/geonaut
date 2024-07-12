
import { AuthCard } from "@/components";
import { mustBeAuthenticated } from "@/functions/server";

import { SignInForm } from "./SignInForm";

export default async function SignIn (): Promise<JSX.Element> {
  await mustBeAuthenticated("/dashboard", false);

  return (
    <AuthCard
      title="sign in to geonaut"
      orElse={{
        text: ["don't have an account?", "sign up"],
        url: "/auth/sign-up",
      }}
    >
      <SignInForm />
    </AuthCard>
  );
}
