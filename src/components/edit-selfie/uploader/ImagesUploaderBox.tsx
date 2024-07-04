
import { CSSProperties } from "react";

import { useEditSelfieContext } from "@/context";
import { selfieBoxShadowStyle } from "@/functions";

import { ImageUploader } from "./ImageUploader";

export const ImagesUploaderBox = (): JSX.Element => {
  const { data } = useEditSelfieContext();

  const handleUploadedImage = (type: "me" | "lc", progress: boolean): void => {
    // toast(`${type} selfie uploaded!`);
  };

  const imageStyles = (type: "me" | "lc"): CSSProperties => {
    if (!data.images[type].img) {
      return {};
    }
    return ({
      boxShadow: data.images[type].img ? selfieBoxShadowStyle(data.images[type].color.color) : undefined,
      border: `14px solid rgb(${data.images[type].color.color})`,
      backgroundColor: `rgb(${data.images[type].color.color})`,
      width: 500 * 1.3,
      height: 375 * 1.3,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
    });
  };

  return (
    <div className="grid grid-flow-row grid-cols-2 gap-10">
      <div className="relative">
        <ImageUploader
          src={data.images.me.img}
          type="me"
          onUploadStatusChange={(progress: boolean) => handleUploadedImage("me", progress)}
          className="relative"
          imageStyle={imageStyles("me")}
        />
      </div>
      <div className="relative">
        <ImageUploader
          src={data.images.lc.img}
          type="lc"
          onUploadStatusChange={(progress: boolean) => handleUploadedImage("lc", progress)}
          className="relative"
          imageStyle={imageStyles("lc")}
        />
      </div>
    </div>
  );
};
