"use client";

import Image from "next/image";
import { useState } from "react";

import { imageThatsAllFolks } from "@/assets";

interface ThatsAllFolksProps {
  /**
   * Component shown when `hidden === false`
   */
  hidden: boolean;
}

const THATS_ALL_FOLKS_VIDEO_URL = "https://www.youtube.com/embed/Q3bbsDJWlXQ?autoplay=1&controls=0&rel=0&modestbranding=1&autohide=1&mute=1";

export const ThatsAllFolks = ({ hidden }: ThatsAllFolksProps): JSX.Element => {
  const [playVideo, setPlayVideo] = useState<boolean>(false);

  const handlePlayVideo = (): void => {
    setPlayVideo(true);
  };

  return (
    hidden
      ? (
        // preload image
        <Image
          src={imageThatsAllFolks}
          className="w-7/12 inline-block invisible size-0"
          alt="No more selfies to show"
        />
      )
      : (

        <div
          role="button"
          onClick={handlePlayVideo}
          style={{ backgroundImage: `url(${imageThatsAllFolks.default.src})` }}
          className="bg-center bg-cover inline-block h-96 opacity-30"
        >
          {
            playVideo &&
            <iframe src={THATS_ALL_FOLKS_VIDEO_URL} className="w-full h-full"></iframe>
          }
        </div>
      )
  );
};
