"use client";

import { createContext, useContext } from "react";

import { IJwtContext, IJwtContextOptions } from "@/types";

export const JwtTokenContext = createContext<IJwtContext>({
  jwt: null,
  setJwt: () => null,

  user: null,
  setUser: () => null,

  isAdmin: false,
  isAuthed: false,

  api: Promise.resolve,

  _insideContext_: false,
});

export const useJwtTokenContext = (options?: IJwtContextOptions): IJwtContext => {
  const context = useContext<IJwtContext>(JwtTokenContext);

  if (!context._insideContext_) {
    throw new Error("`useJwtTokenContext` must be used inside of `JwtTokenContext`.");
  }

  if (
    options?.redirect && // User wants redirection
    !context.isAuthed && // The user is NOT authenticated
    typeof context.jwt === "string" && // The context is loaded (so `jwt` is "" or ".....")
    typeof window !== "undefined" // The window object is defined
  ) {
    window.location.href = options.redirect;
  }

  return context;
};
