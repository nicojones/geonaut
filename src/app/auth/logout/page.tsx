"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

import { useJwtTokenContext } from "@/context";
import { IUrlParams } from "@/types";

export default function Logout ({ searchParams }: IUrlParams<never, "status">): JSX.Element {
  const router = useRouter();
  const { setJwt } = useJwtTokenContext();

  useEffect(() => {
    const abort = new AbortController();
    const performLogout = async (): Promise<void> => {
      // Call the API route to delete the cookie
      const response = await fetch("/auth/logout/action", { method: "POST", signal: abort.signal });
      const data = await response.json();

      if (data.success) {
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
      }
    };

    performLogout();
    return () => abort.abort();
  }, [router, setJwt]);

  return (
    <>...</>
  );
}
