"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

import { useJwtTokenContext } from "@/context";
import { IUrlParams } from "@/types";

export default function Logout ({ searchParams }: IUrlParams<never, "status">): JSX.Element {
  const router = useRouter();
  const { setJwt } = useJwtTokenContext();
  const loggedOutRef = useRef<boolean>(false);

  useEffect(() => {
    if (loggedOutRef.current) {
      return;
    }
    loggedOutRef.current = true;

    // Remove the JWT token
    setJwt(null);
    // the type of logout
    const authIssue = (["401"].includes(searchParams.status));
    // Show a message
    toast.success(
      authIssue
        ? "Token expired"
        : "Logged out successfully",
    );
    // Redirect to the home page
    router.push(
      authIssue
        ? "/auth/sign-in"
        : "/",
    );
  }, [router, searchParams.status, setJwt]);

  return (
    <>...</>
  );
}
