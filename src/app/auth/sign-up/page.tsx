import { Metadata } from "next";

import { AuthCard } from "@/components";
import { mustBeAuthenticated } from "@/functions/server";

import { SignUpForm } from "./SignUpForm";

export const metadata: Metadata = {
  title: "sign up - geonaut",
  description: "create an account in geonaut",
};

export default async function SignUp (): Promise<JSX.Element> {
  await mustBeAuthenticated("/dashboard", false);

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
