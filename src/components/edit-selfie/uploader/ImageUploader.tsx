import { ArrowPathIcon, MapPinIcon } from "@heroicons/react/16/solid";
import { Button } from "@mui/joy";
import classNames from "classnames";
import NextImage from "next/image";
import { CSSProperties, useMemo, useState } from "react";
import { toast } from "sonner";

import { API_URL } from "@/config";
import { useEditSelfieContext, useJwtTokenContext } from "@/context";
import { IEditSelfieGps, IEditSelfieImageDetails, IReadFile, IResponseData } from "@/types";

import { FileUploader } from "./FileUploader";
import { readAddedImage } from "./functions";

interface ImageUploaderProps {
  src: string | undefined;
  onUploadStatusChange: (uploadInProgress: boolean) => any;
  type: "me" | "lc";
  /**
   * @default ""
   */
  className?: string;
  /**
   * @default {}
   */
  imageStyle?: CSSProperties;
}

export const ImageUploader = ({ className = "", imageStyle = {}, onUploadStatusChange, src, type }: ImageUploaderProps): JSX.Element => {
  const { api } = useJwtTokenContext();
  const { data, hash, setData, hasImages, hasLocation } = useEditSelfieContext();
  const [imageData, setImageData] = useState<string | ArrayBuffer | null>(null);
  const [invalidateCache, setInvalidateCache] = useState<number>(+new Date());

  const imageSrc = useMemo(() => (
    imageData
      ? (imageData as any)
      : (
        src
          ? API_URL + src + `?t=${invalidateCache}`
          : undefined
      )
  ), [imageData, src, invalidateCache]);

  const handleImageChange = (files: FileList): void => {
    const file = files[0];
    if (!file?.type.startsWith("image/")) {
      toast.error("Invalid image type!");
      return;
    }

    readAddedImage(file, (result: IReadFile) => {
      setImageData(result);

      onUploadStatusChange(true);
      const formData = new FormData();
      formData.append("_file_", file);
      formData.append("hash", hash);
      formData.append("type", type);
      const uploadPromise = api<IResponseData<IEditSelfieImageDetails>, any>({
        method: "POST",
        body: formData,
        url: "/ajax/selfieupload",
        contentType: false,
      })
        .then(r => {
          setImageData(null);
          setInvalidateCache(+(new Date()));
          if (r.gps && !hasLocation) {
            // No images, and this one has GPS!
            setData({ ...data, images: { ...data.images, [type]: r }, selfie: { ...data.selfie, ...r } });
          } else {
            setData({ ...data, images: { ...data.images, [type]: r } });
          }
          return r;
        })
        .finally(() => onUploadStatusChange(false));

      toast.promise(uploadPromise, {
        success: _data => _data.message,
        error: _data => _data.message,
      });
    });
  };

  const handleRotateImage = (): void => {
    const rotatePromise = api<{ path: string; }, any>({
      url: "/ajax/rotate-image",
      body: { hash, type },
    })
      .then(_r => {
        setInvalidateCache(+new Date());
      });

    toast.promise(rotatePromise, {
      success: undefined,
      error: e => String(e),
    });
  };

  const handleSetCoordinates = (gps: IEditSelfieGps): void => {
    setData({ ...data, selfie: { ...data.selfie, ...gps } });
  };

  return (
    <>
      <FileUploader
        onFileAdded={handleImageChange}
        className={classNames(className, "min-h-96")}
      >
        {
          (imageSrc)
            ? (
              <NextImage
                src={imageSrc}
                width={500}
                height={375}
                alt={type === "me" ? "My image" : "Landscape image"}
                className="w-full"
                style={imageStyle}
              />
            )
            : (
              <>Drop files to upload</>
            )
        }

      </FileUploader>
      {
        src &&
        <Button
          onClick={() => handleRotateImage()}
          size="sm"
          variant="plain"
          color="neutral"
          sx={{ position: "absolute", right: 10, bottom: 10 }}
          title="rotate clockwise"
        >
          <ArrowPathIcon className="size-6" />
        </Button>
      }
      {
        src && data.images[type].gps &&
        <Button
          onClick={() => handleSetCoordinates(data.images[type].gps as IEditSelfieGps)}
          size="sm"
          variant="plain"
          color="neutral"
          title="use the coordinates of this image"
          sx={{ position: "absolute", left: 10, bottom: 10 }}
        >
          <MapPinIcon className="size-6" />
        </Button>
      }
    </>
  );
};
