"use client";

import { useEffect, useState } from "react";

import { useJwtTokenContext } from "@/context";
import { IFetchSelfieBody, ISelfie, ISelfieData } from "@/types";

import { SelfieCard } from "./SelfieCard";
import { SelfieCardSkeleton } from "./SelfieCardSkeleton";

interface SelfieCardProps {
  hash: string;
}

export const SelfieCardLoader = ({ hash }: SelfieCardProps): JSX.Element => {
  const { api } = useJwtTokenContext();
  const [selfie, setSelfie] = useState<ISelfie | null>(null);

  useEffect(() => {
    api<ISelfieData, IFetchSelfieBody>({ body: { s: "one", hash } })
      .then(r => {
        setSelfie(r.responseData.selfie);
      });
  }, [api, hash]);

  return (
    selfie
      ? (
        <SelfieCard
          selfie={selfie}
          priority={false}
          className="!max-w-[1000px] w-full my-24 mx-auto"
        />
      )
      : (
        <SelfieCardSkeleton
          className="!max-w-[1000px] w-full my-24 mx-auto"
        />
      )
  );
};
