"use client";

import classNames from "classnames";
import { useState } from "react";

import { useJwtTokenContext } from "@/context";
import { ISelfie } from "@/types";

import { LoveButton } from "./LoveButton";

interface LoveProps {
  selfie: ISelfie;
}

export const LoveSelfie = ({ selfie }: LoveProps): JSX.Element => {
  const { api, isAuthed } = useJwtTokenContext();

  const [loves, setLoves] = useState<number>(selfie.loves);
  const [loved, setLoved] = useState<boolean>(selfie.love === 1);

  const handleToggleLove = (): void => {
    setLoves(l => loved ? l - 1 : l + 1);
    setLoved(l => !l);
    api<any, any>({ url: "/ajax/love", body: { selfie: selfie.hash } })
      .then(r => r.responseData)
      .catch(e => {
        console.error(e);
        setLoves(l => loved ? l + 1 : l - 1);
        setLoved(l => !l);
      });
  };

  return (
    <span className="absolute left-[50%] top-1/2 translate-y-[-50%] lg:translate-y-0 lg:-top-3 translate-x-[-50%]">
      {
        isAuthed
          ? (
            <a
              role="button"
              onClick={handleToggleLove}
              className={
                classNames(
                  "cursor-pointer hover:drop-shadow-sm transition-all relative select-none",
                  (!isAuthed || selfie.love ? "opacity-100" : "opacity-80 hover:opacity-100 hover:drop-shadow"),
                )
              }
            >
              <LoveButton count={loves} />
            </a>
          )
          : (
            <span className="relative">
              <LoveButton count={loves} />
            </span>
          )
      }
    </span>
  );
};
