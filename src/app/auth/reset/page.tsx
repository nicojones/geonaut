
import { Metadata } from "next";
import { redirect } from "next/navigation";

import { AuthCard } from "@/components";
import { IUrlParams } from "@/types";

import { ResetPasswordForm } from "./ResetPasswordForm";

export const metadata: Metadata = {
  title: "reset password - geonaut",
  description: "reset your password to access your profile",
};

export default async function ResetPassword ({ searchParams }: IUrlParams<never, "token" | "email">): Promise<JSX.Element> {
  if (!searchParams.token) {
    redirect("/auth/sign-in");
  }

  return (
    <AuthCard
      title="enter new password"
    >
      <ResetPasswordForm
        token={searchParams.token}
        email={searchParams.email}
      />
    </AuthCard>
  );
}
