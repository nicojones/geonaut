"use client";

import { CameraIcon, UserIcon } from "@heroicons/react/16/solid";
import { Typography } from "@mui/joy";
import Link from "next/link";
import { CSSProperties } from "react";

import { selfieTextColor } from "@/functions";
import { ISelfie } from "@/types";

import { SelfieDate } from "./SelfieDate";
import { SelfieMap } from "./SelfieMap";

interface SelfieHeaderProps {
  readonly selfie: ISelfie;
}

const getMonday = (date: string): string => {
  const d = new Date(date); // Create a copy of the date
  const day = d.getDay(); // Get current day (0 = Sunday, 1 = Monday, etc.)
  const diff = (day === 0 ? -6 : 1) - day; // Adjust to the previous Monday
  d.setDate(d.getDate() + diff);
  return d.toISOString();
};

export const SelfieHeader = ({ selfie }: SelfieHeaderProps): JSX.Element => {
  const color: CSSProperties["color"] = selfieTextColor(selfie);
  const lcColor: CSSProperties["color"] = selfieTextColor(selfie, "lc");

  return (
    <SelfieMap selfie={selfie}>
      {
        (opener, map) =>
          <>
            <div
              role="header"
              className="flex flex-col md:flex-row md:space-y-0 sm:space-x-0 md:space-x-4 space-y-2 justify-between p-4"
            >
              <Link href={`/s/${selfie.hash}`} className="flex flex-col as-link" style={{ color }}>
                {getMonday(selfie.selfie_date).split("T")[0]}
                <Typography level="h1" sx={({ color })}>{selfie.title}</Typography>
                <Typography level="h3" sx={({ color })}>{selfie.short_desc}</Typography>
              </Link>
              <div className={`flex flex-col text-base text-[${lcColor}] shrink-0`}>
                {/* <SelfieDate
                  icon={<ArrowUpTrayIcon className="size-4" />}
                  date={selfie.added_on}
                  label="added"
                /> */}
                <SelfieDate
                  icon={<CameraIcon className="size-4" />}
                  label="taken"
                  date={selfie.selfie_date}
                  isDate
                />
                {opener}
                <Link href={`/u/${selfie.username}`} className="fric space-x-3 as-link">
                  <UserIcon className="size-4" />
                  <span>@{selfie.username}</span>
                </Link>
              </div>
            </div>
            {map}
          </>
      }
    </SelfieMap>
  );
};
