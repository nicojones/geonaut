"use client";

import { ArrowUpTrayIcon, CameraIcon, MapPinIcon, ShareIcon, UserIcon } from "@heroicons/react/16/solid";
import { Typography } from "@mui/joy";
import Image from "next/image";
import Link from "next/link";

import { renderDynamicSelfie } from "@/app/(selfies)/s/[hash]/render-dynamic-selfie.function";
import { CommentList, EditSelfieButton, LoveSelfie, SelfieDate } from "@/components";
import { CopyPath, MapViewer } from "@/components/generic";
import { NO_IMAGE } from "@/config";
import { useSingleSelfieContext } from "@/context/single-selfie.context";
import { selfieBackgroundStyle, selfieLcImage, selfieMyImage, selfiePin, selfieTextColor } from "@/functions";
import { IMapPin } from "@/types";

import { SelfiePrevNext } from "./SelfiePrevNext";

interface SingleSelfieProps {
  /**
   * Set to FALSE if you want this to look like an error page
   * @default true
   */
  exists?: boolean;
}

export const SingleSelfie = ({ exists = true }: SingleSelfieProps): JSX.Element => {
  const { selfie } = useSingleSelfieContext();

  const color = selfieTextColor(selfie);
  const lcColor = selfieTextColor(selfie, "lc");
  const markers: IMapPin = selfiePin(selfie);

  return (
    <div
      className="flex flex-col max-w-screen py-[var(--header-height)] relative fill-screen overflow-x-hidden"
      style={{ background: selfieBackgroundStyle(selfie.me_color, selfie.lc_color) }}
    >
      <div className="flex flex-col mx-auto w-[calc(100vw-100px)] md:w-[calc(100vw-200px)] lg:w-[calc(100vw-300px)]">
        <div
          role="header"
          className="flex md:flex-row md:items-center md:justify-between md:space-y-0 flex-col space-y-2 py-4"
        >
          <div className="flex flex-col space-y-4">
            <Typography level="h1" sx={({ color })}>{selfie.title}</Typography>
            <Typography level="h3" sx={({ color })}>{selfie.short_desc}</Typography>
          </div>

          {
            exists &&
            <div className={`flex flex-col min-w-max text-base text-[${lcColor}]`}>
              <span className="flex justify-between">
                <Link href={`/u/${selfie.username}`} className="fric space-x-2 as-link">
                  <UserIcon className="size-4" />
                  <small>by</small>
                  <span>
                    @{selfie.username}
                  </span>
                </Link>
                <CopyPath
                  className="bg-white p-1 text-black rounded-full"
                  icon={<ShareIcon className="size-4 hover:text-blue-500" />}
                />
              </span>
              <SelfieDate
                icon={<CameraIcon className="size-4" />}
                label="taken"
                date={selfie.selfie_date}
                isDate
              />
              <SelfieDate
                icon={<ArrowUpTrayIcon className="size-4" />}
                label="added"
                date={selfie.added_on}
              />
              <span className="fric space-x-2">
                <MapPinIcon className="size-4" />
                <small>in</small>
                <span>
                  {selfie.selfie_place}
                </span>
              </span>
            </div>
          }
        </div>

        <div role="content" className="grid grid-flow-col lg:grid-flow-row grid-cols-1 grid-rows-2 lg:grid-rows-1 lg:grid-cols-2 relative">
          {
            exists &&
            <>
              <LoveSelfie selfie={selfie} />
              <EditSelfieButton selfie={selfie} allowDelete />
            </>
          }
          <Image
            src={exists ? selfieMyImage(selfie) : NO_IMAGE}
            alt={"My image for " + selfie.title}
            className="w-full aspect-[4/3]"
            width={1000}
            height={750}
            priority
          />
          <Image
            src={exists ? selfieLcImage(selfie) : NO_IMAGE}
            alt={"Landscape image for " + selfie.title}
            className="w-full aspect-[4/3]"
            width={1000}
            height={750}
            priority
          />
          {
            exists &&
            <SelfiePrevNext />
          }
        </div>

        {
          exists &&
          <div className="grid grid-flow-col lg:grid-flow-row grid-rows-2 grid-cols-1 lg:grid-cols-2 lg:grid-rows-1">
            <MapViewer markers={[markers]} style="satellite" className="min-h-96 max-h-[45rem] w-full block" />
            <CommentList selfie={selfie} />
          </div>
        }

        {
          selfie.long_desc.length >= 5 &&
          <div
            className="w-full border mx-auto p-16 flex flex-col justify-center"
            style={{ color }}
          >
            {renderDynamicSelfie(selfie.long_desc)}
          </div>
        }
      </div>

    </div>
  );
};
