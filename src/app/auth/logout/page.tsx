"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useJwtTokenContext } from "@/context";

export default function Logout (): JSX.Element {
  const router = useRouter();
  const { setJwt } = useJwtTokenContext();

  useEffect(() => {
    const performLogout = async (): Promise<void> => {
      // Call the API route to delete the cookie
      const response = await fetch("/auth/logout/action", { method: "POST" });
      const data = await response.json();

      if (data.success) {
        // Remove the JWT token
        setJwt(null);
        // Redirect to the home page
        router.push("/");
      }
    };

    performLogout();
  }, [router, setJwt]);

  return (
    <>...</>
  );
}
