"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useJwtTokenContext } from "@/context";
import { raiseOnError, selfieLcImage, selfieMyImage } from "@/functions";
import { ISelfie, ISelfiePrevNext } from "@/types";

interface SelfiePrevNextProps {
  selfie: ISelfie;
}

export const SelfiePrevNext = ({ selfie }: SelfiePrevNextProps): JSX.Element => {
  const { api } = useJwtTokenContext();
  const [prevNext, setPrevNext] = useState<ISelfiePrevNext>({ prev: null, next: null });
  const { prev, next } = prevNext;

  useEffect(() => {
    const abortController = new AbortController();
    api<ISelfiePrevNext, Record<string, never>>({
      body: {},
      url: `/api/next/${selfie.hash}`,
      cacheTags: [selfie.hash],
      signal: abortController.signal,
    })
      .catch(raiseOnError)
      .then(v => setPrevNext(v.responseData));

    return () => abortController.abort();
  }, [selfie.hash]);

  return (
    <>
      {
        prev &&
        <Link
          className="cursor-pointer opacity-30 hover:opacity-50 left-0 h-full absolute translate-x-[-100%] transition-opacity"
          href={`/s/${prev.hash}`}
        >
          <Image
            src={selfieLcImage(prev)}
            alt={"Previous image: " + prev.title}
            className="h-full w-auto"
            width={1000}
            height={750}
          />
        </Link>
      }
      {
        next &&
        <Link
          className="cursor-pointer opacity-30 hover:opacity-50 right-0 h-full absolute translate-x-[100%] transition-opacity"
          href={`/s/${next.hash}`}
        >
          <Image
            src={selfieMyImage(next)}
            alt={"Next image: " + next.title}
            className="h-full w-auto"
            width={1000}
            height={750}
          />
        </Link>
      }
    </>
  );
};
