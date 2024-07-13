"use client";

import { CalendarIcon, MapPinIcon, UserIcon } from "@heroicons/react/16/solid";
import { Typography } from "@mui/joy";
import Link from "next/link";
import { CSSProperties, useMemo, useState } from "react";
import { format } from "timeago.js";

import { MapViewer } from "@/components/generic";
import { selfiePin, selfieTextColor } from "@/functions";
import { ISelfie } from "@/types";

interface SelfieHeaderProps {
  readonly selfie: ISelfie;
}

export const SelfieHeader = ({ selfie }: SelfieHeaderProps): JSX.Element => {
  const color: CSSProperties["color"] = selfieTextColor(selfie);
  const lcColor: CSSProperties["color"] = selfieTextColor(selfie, "lc");

  const [mapOpen, setMapOpen] = useState<boolean>(false);
  const marker = useMemo(() => selfiePin(selfie), [selfie]);

  const handleToggleMap = (): void => {
    setMapOpen(m => !m);
  };

  return (
    <>
      <div
        role="header"
        className="flex flex-col md:flex-row md:space-y-0 sm:space-x-0 md:space-x-4 space-y-2 justify-between p-4"
      >
        <Link href={`/s/${selfie.hash}`} className="flex flex-col as-link" style={{ color }}>
          <Typography level="h1" sx={({ color })}>{selfie.title}</Typography>
          <Typography level="h3" sx={({ color })}>{selfie.short_desc}</Typography>
        </Link>
        <div className={`flex flex-col text-base text-[${lcColor}] shrink-0`}>
          <span className="fric space-x-2">
            <CalendarIcon className="size-4" />
            <span title={`added on ${selfie.selfie_date}`}>{format(selfie.selfie_date)}</span>
          </span>
          <span className="fric space-x-2 cursor-pointer" onClick={handleToggleMap}>
            <MapPinIcon className="size-4" />
            <span>{selfie.selfie_place}</span>
          </span>
          <Link href={`/u/${selfie.username}`} className="fric space-x-2 as-link">
            <UserIcon className="size-4" />
            <span>@{selfie.username}</span>
          </Link>
        </div>
      </div>
      {
        mapOpen &&
        <MapViewer markers={[marker]} style="satellite" className="w-full h-96" />
      }
    </>
  );
};
