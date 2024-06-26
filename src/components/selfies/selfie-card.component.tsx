import { CalendarIcon, MapPinIcon, UserIcon } from "@heroicons/react/16/solid";
import { Typography } from "@mui/joy";
import Image from "next/image";
import Link from "next/link";
import { CSSProperties } from "react";

import { selfieLcImage, selfieMyImage, selfieTextColor } from "@/functions";
import { ISelfie } from "@/types";

import { Love } from "./love/love";

interface SelfieCardProps {
  selfie: ISelfie;
}

export const SelfieCard = ({ selfie }: SelfieCardProps): JSX.Element => {
  const color: CSSProperties["color"] = selfieTextColor(selfie);

  return (
    <div
      className="flex flex-col max-w-full"
      style={{ background: `linear-gradient(0.25turn,rgb(${selfie.me_color}),rgb(${selfie.lc_color}))`, boxShadow: `0 1px 60px 20px rgb(${selfie.me_color})` }}
    >
      <div
        role="header"
        className="flex flex-col md:flex-row md:space-y-0 sm:space-x-0 md:space-x-4 space-y-2 justify-between p-4"
      >
        <Link href={`/s/${selfie.hash}`} className="flex flex-col as-link" style={{ color }}>
          <Typography level="h1" sx={({ color })}>{selfie.title}</Typography>
          <Typography level="h3" sx={({ color })}>{selfie.short_desc}</Typography>
        </Link>
        <div className={`flex flex-col text-base text-[${color}] shrink-0`}>
          <span className="fric space-x-2">
            <CalendarIcon className="size-4" />
            <span title={`added on ${selfie.added_on_words}`}>{selfie.selfie_date_words}</span>
          </span>
          <span className="fric space-x-2">
            <MapPinIcon className="size-4" />
            <span>{selfie.selfie_place}</span>
          </span>
          <Link href={`/u/${selfie.username}`} className="fric space-x-2 as-link">
            <UserIcon className="size-4" />
            <span>@{selfie.username}</span>
          </Link>
        </div>
      </div>

      <div role="content" className="flex flex-col md:flex-row relative">
        <Love selfie={selfie} />
        <Image
          src={selfieMyImage(selfie.hash)}
          alt="My image"
          className="w-full md:w-1/2"
          width={1000}
          height={750}
        />
        <Image
          src={selfieLcImage(selfie.hash)}
          alt="Landscape image"
          className="w-full md:w-1/2"
          width={1000}
          height={750}
        />
      </div>

    </div>
  );
};
