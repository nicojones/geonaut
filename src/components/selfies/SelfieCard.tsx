import classNames from "classnames";
import Image from "next/image";

import { NO_IMAGE } from "@/config";
import { selfieBackgroundStyle, selfieBoxShadowStyle, selfieLcImage, selfieMyImage } from "@/functions";
import { IClassName, ISelfie } from "@/types";

import { EditSelfieButton } from "./edit";
import { LoveSelfie } from "./love/LoveSelfie";
import { SelfieHeader } from "./SelfieHeader";

interface SelfieCardProps extends IClassName {
  selfie: ISelfie;
  /**
   * Load images with priority
   * @default false
   */
  priority?: boolean;
  /**
   * @default false
   */
  disabled?: boolean;

}

export const SelfieCard = ({ className = "", disabled = false, priority = false, selfie }: SelfieCardProps): JSX.Element => {
  return (
    <div
      className={classNames("flex flex-col max-w-full", className, { "pointer-events-none select-none": disabled })}
      style={{
        background: selfieBackgroundStyle(selfie.me_color, selfie.lc_color),
        boxShadow: selfieBoxShadowStyle(selfie.me_color),
      }}
    >
      <SelfieHeader selfie={selfie} />

      <div role="content" className="flex flex-col md:flex-row relative">
        {
          !disabled &&
          <>
            <LoveSelfie selfie={selfie} />
            <EditSelfieButton selfie={selfie} />
          </>
        }
        {selfieMyImage(selfie)}
        {process.env.NEXT_PUBLIC_RESOURCES_URL}
        <Image
          src={disabled ? NO_IMAGE : selfieMyImage(selfie)}
          alt="My image"
          className="w-full md:w-1/2"
          width={1000}
          height={750}
          priority={priority}
        />
        <Image
          src={disabled ? NO_IMAGE : selfieLcImage(selfie)}
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
