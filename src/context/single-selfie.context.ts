"use client";

import { createContext, useContext } from "react";

import { ISelfie, ISingleSelfieContex } from "@/types";

export const SingleSelfieContext = createContext<ISingleSelfieContex>({
  selfie: {} as unknown as ISelfie,
  prev: null,
  next: null,
  exists: false,
  loadSelfie: () => null,

  _insideContext_: false,
});

export const useSingleSelfieContext = (): ISingleSelfieContex => {
  const context = useContext<ISingleSelfieContex>(SingleSelfieContext);

  if (!context._insideContext_) {
    throw new Error("`useSingleSelfieContext` must be used inside of `SingleSelfieContext`.");
  }

  return context;
};
