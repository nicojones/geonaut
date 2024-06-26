import { AuthCard } from "@/components";

import { SignUpForm } from "./form";

export default async function SignUp (): Promise<JSX.Element> {
  return (
    <AuthCard
      title="create an account"
      orElse={{
        text: ["already have an account?", "sign in"],
        url: "/auth/sign-in",
      }}
    >
      <SignUpForm />
    </AuthCard>
  );
}
