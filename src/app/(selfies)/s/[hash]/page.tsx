import { CalendarIcon, CameraIcon, MapPinIcon, UserIcon } from "@heroicons/react/16/solid";
import { Typography } from "@mui/joy";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { selfieLcImage, selfieMetadata, selfieMyImage, selfieTextColor } from "@/functions";
import { serverFetch } from "@/functions/server";
import { IFetchSelfieBody, ISelfieData, ISelfiePrevNext, IUrlParams } from "@/types";

export async function generateMetadata (
  { params }: IUrlParams<"hash">,
): Promise<Metadata> {
  const selfie = (await getSelfie(params.hash)).selfie;
  return selfieMetadata(selfie);
}

const getSelfie = (hash: string): Promise<ISelfieData> =>
  serverFetch<ISelfieData, IFetchSelfieBody>({ body: { s: "one", hash } });

const getPrevNext = (hash: string): Promise<ISelfiePrevNext> =>
  serverFetch<ISelfiePrevNext, Record<string, never>>({ body: {}, url: `/ajax/next/${hash}` });

export default async function SingleSelfiePage ({ params }: IUrlParams<"hash">): Promise<JSX.Element> {
  const selfie = (await getSelfie(params.hash)).selfie;
  const { prev, next } = (await getPrevNext(params.hash));

  const color = selfieTextColor(selfie);

  return (
    <div
      className="flex flex-col max-w-full mt-[var(--header-height)] relative"
      style={{ background: `linear-gradient(0.25turn,rgb(${selfie.me_color}),rgb(${selfie.lc_color}))` }}
    >
      <div className="flex flex-col mx-auto max-w-[92vw] md:max-w-[88vw] lg:max-w-[80vw]">
        <div
          role="header"
          className="flex flex-col space-y-2 p-4"
        >
          <div className="flex flex-col">
            <Typography level="h1" sx={({ color })}>{selfie.title}</Typography>
            <Typography level="h3" sx={({ color })}>{selfie.short_desc}</Typography>
          </div>
        </div>

        <div role="content" className="grid grid-flow-col lg:grid-flow-row grid-cols-1 lg:grid-cols-2 relative">
          <Image
            src={selfieMyImage(selfie.hash)}
            alt={"My image for " + selfie.title}
            className="w-full"
            width={1000}
            height={750}
          />
          <Image
            src={selfieLcImage(selfie.hash)}
            alt={"Landscape image for " + selfie.title}
            className="w-full"
            width={1000}
            height={750}
          />
          {
            prev &&
            <Link
              className="cursor-pointer opacity-30 hover:opacity-50 left-0 h-full absolute translate-x-[-100%] transition-opacity"
              href={`/s/${prev.hash}`}
            >
              <Image
                src={selfieLcImage(prev.hash)}
                alt={"Previous image: " + prev.title}
                className="w-auto"
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
                src={selfieMyImage(next.hash)}
                alt={"Next image: " + next.title}
                className="w-auto"
                width={1000}
                height={750}
              />
            </Link>
          }
        </div>

        <div className="grid grid-flow-col lg:grid-flow-row grid-cols-1 lg:grid-cols-2">
          <div className={`flex flex-col text-base text-[${color}]`}>
            <Link href={`/u/${selfie.username}`} className="fric space-x-2 as-link">
              <UserIcon className="size-4" />
              <small>by</small>
              <span>
                @{selfie.username}
              </span>
            </Link>
            <span className="fric space-x-2" title={selfie.selfie_date_long}>
              <CameraIcon className="size-4" />
              <small>taken</small>{" "}
              <span>
                {selfie.selfie_date_words}
              </span>
            </span>
            <span className="fric space-x-2" title={selfie.added_on_long}>
              <CalendarIcon className="size-4" />
              <small>added</small>
              <span>
                {selfie.added_on_words}
              </span>
            </span>
            <span className="fric space-x-2">
              <MapPinIcon className="size-4" />
              <small>in</small>
              <span>
                {selfie.selfie_place}
              </span>
            </span>
          </div>
          <div className="">
            <Typography level="h1">Map goes here</Typography>
          </div>
        </div>

      </div>
    </div>
  );
}
