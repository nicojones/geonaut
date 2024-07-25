
import { Metadata } from "next";

import { AuthCard } from "@/components";

import { SignInForm } from "./SignInForm";

export const metadata: Metadata = {
  title: "sign in - geonaut",
  description: "sign in to geonaut",
};

export default async function SignIn (): Promise<JSX.Element> {
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
