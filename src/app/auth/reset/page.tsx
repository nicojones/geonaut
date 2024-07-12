
import { redirect } from "next/navigation";

import { AuthCard } from "@/components";
import { mustBeAuthenticated } from "@/functions/server";
import { IUrlParams } from "@/types";

import { ResetPasswordForm } from "./ResetPasswordForm";

export default async function ResetPassword ({ searchParams }: IUrlParams<never, "token" | "email">): Promise<JSX.Element> {
  if (!searchParams.token) {
    redirect("/auth/sign-in");
  }
  await mustBeAuthenticated("/dashboard", false);

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
