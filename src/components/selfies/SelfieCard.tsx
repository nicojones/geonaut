import Image from "next/image";

import { selfieBackgroundStyle, selfieBoxShadowStyle, selfieLcImage, selfieMyImage } from "@/functions";
import { ISelfie } from "@/types";

import { EditSelfieButton } from "./edit";
import { LoveSelfie } from "./love/love";
import { SelfieHeader } from "./SelfieHeader";

interface SelfieCardProps {
  selfie: ISelfie;
  /**
   * Load images with priority
   * @default false
   */
  priority?: boolean;
}

export const SelfieCard = ({ priority = false, selfie }: SelfieCardProps): JSX.Element => {
  return (
    <div
      className="flex flex-col max-w-full"
      style={{
        background: selfieBackgroundStyle(selfie.me_color, selfie.lc_color),
        boxShadow: selfieBoxShadowStyle(selfie.me_color),
      }}
    >
      <SelfieHeader selfie={selfie} />

      <div role="content" className="flex flex-col md:flex-row relative">
        <LoveSelfie selfie={selfie} />
        <EditSelfieButton selfie={selfie} />
        <Image
          src={selfieMyImage(selfie)}
          alt="My image"
          className="w-full md:w-1/2"
          width={1000}
          height={750}
          priority={priority}
        />
        <Image
          src={selfieLcImage(selfie)}
          alt="Landscape image"
          className="w-full md:w-1/2"
          width={1000}
          height={750}
          priority={priority}
        />
      </div>

    </div>
  );
};
