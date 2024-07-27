"use client";
import Image from "next/image";

import { useSingleSelfieContext } from "@/context/single-selfie.context";
import { selfieLcImage, selfieMyImage } from "@/functions";

export const SelfiePrevNext = (): JSX.Element => {
  const { prev, next, loadSelfie } = useSingleSelfieContext();

  return (
    <>
      {
        prev &&
        <a
          role="button"
          className="cursor-pointer opacity-30 hover:opacity-50 left-0 h-full absolute translate-x-[-100%] transition-opacity"
          onClick={() => loadSelfie(prev.hash)}
        >
          <Image
            src={selfieLcImage(prev)}
            alt={"Previous image: " + prev.title}
            className="h-full w-auto"
            width={1000}
            height={750}
          />
        </a>
      }
      {
        next &&
        <a
          role="button"
          className="cursor-pointer opacity-30 hover:opacity-50 right-0 h-full absolute translate-x-[100%] transition-opacity"
          onClick={() => loadSelfie(next.hash)}
        >
          <Image
            src={selfieMyImage(next)}
            alt={"Next image: " + next.title}
            className="h-full w-auto"
            width={1000}
            height={750}
          />
        </a>
      }
    </>
  );
};