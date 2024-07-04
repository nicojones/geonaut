import { CalendarIcon, CameraIcon, MapPinIcon, ShareIcon, UserIcon } from "@heroicons/react/16/solid";
import { Typography } from "@mui/joy";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { EditSelfieButton, LoveSelfie } from "@/components";
import { CopyPath, MapViewer } from "@/components/generic";
import { Comments } from "@/components/selfies/comments";
import { selfieBackgroundStyle, selfieLcImage, selfieMetadata, selfieMyImage, selfiePin, selfieTextColor } from "@/functions";
import { serverFetch } from "@/functions/server";
import { IFetchSelfieBody, IMapPin, ISelfieData, ISelfiePrevNext, IUrlParams } from "@/types";

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
  const markers: IMapPin = selfiePin(selfie);

  return (
    <div
      className="flex flex-col max-w-full py-[var(--header-height)] relative min-h-screen"
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

          <div className={`flex flex-col min-w-max text-base text-[${color}]`}>
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
        </div>

        <div role="content" className="grid grid-flow-col lg:grid-flow-row grid-cols-1 lg:grid-cols-2 relative">
          <LoveSelfie selfie={selfie} />
          <EditSelfieButton selfie={selfie} allowDelete />
          <Image
            src={selfieMyImage(selfie)}
            alt={"My image for " + selfie.title}
            className="w-full"
            width={1000}
            height={750}
          />
          <Image
            src={selfieLcImage(selfie)}
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
        </div>

        <div className="grid grid-flow-col lg:grid-flow-row grid-cols-1 lg:grid-cols-2">
          <MapViewer markers={[markers]} style="satellite" className="min-h-96 max-h-[45rem] w-full block" />
          <Comments selfie={selfie} />
        </div>
      </div>

    </div>
  );
}
