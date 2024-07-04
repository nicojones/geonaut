"use client";

import { createContext, useContext } from "react";

import { IEditSelfieContext, IEditSelfieData } from "@/types";

export const EditSelfieContext = createContext<IEditSelfieContext>({
  data: {} as unknown as IEditSelfieData,
  setData: () => null,
  hash: "",
  hasImages: undefined,
  hasLocation: false,
  markers: [],

  _insideContext_: false,
});

export const useEditSelfieContext = (): IEditSelfieContext => {
  const context = useContext<IEditSelfieContext>(EditSelfieContext);

  if (!context._insideContext_) {
    throw new Error("`useEditSelfieContext` must be used inside of `EditSelfieContext`.");
  }

  return context;
};
