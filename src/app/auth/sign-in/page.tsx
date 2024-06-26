
import { AuthCard } from "@/components";

import { SignInForm } from "./form";

export default function SignIn (): JSX.Element {
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
