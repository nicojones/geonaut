
import { CSSProperties } from "react";

import { useEditSelfieContext } from "@/context";
import { selfieBoxShadowStyle } from "@/functions";

import { ImageUploader } from "./ImageUploader";

export const ImagesUploaderBox = (): JSX.Element => {
  const { data } = useEditSelfieContext();

  const handleUploadedImage = (_type: "me" | "lc", _progress: boolean): void => {
    // toast(`${type} selfie uploaded!`);
  };

  const imageStyles = (type: "me" | "lc"): CSSProperties => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const color = data.images[type]!.color?.color ?? "";

    if (!data.images[type].img || !color) {
      return {};
    }
    return ({
      boxShadow: data.images[type].img ? selfieBoxShadowStyle(color) : undefined,
      border: `10px solid rgb(${color})`,
      backgroundColor: `rgb(${color})`,
      width: "100%",
      aspectRatio: "4 / 3",
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
