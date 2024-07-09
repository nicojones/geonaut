import { ArrowPathIcon, MapPinIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { Button, IconButton } from "@mui/joy";
import { CSSProperties, useMemo, useState } from "react";
import { toast } from "sonner";

import { AlertDialogModal } from "@/components/generic";
import { useEditSelfieContext, useJwtTokenContext } from "@/context";
import { getCoords, imageCachePurge, raiseOnError } from "@/functions";
import { IEditSelfieGps, IEditSelfieImageDetails, IReadFile } from "@/types";

import { FileUploader } from "./FileUploader";
import { addCoordsAndPlace, readAddedImage } from "./functions";

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
  const { data, hash, setData, hasLocation } = useEditSelfieContext();
  const [imageData, setImageData] = useState<string | ArrayBuffer | null>(null);
  const [invalidateCache, setInvalidateCache] = useState<number>(imageCachePurge());

  const imageSrc = useMemo(() => (
    imageData
      ? (imageData as any)
      : (
        src
          ? (process.env.NEXT_PUBLIC_API_URL as string) + src + `?t=${invalidateCache}`
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
      const uploadPromise = api<IEditSelfieImageDetails, any>({
        method: "POST",
        body: formData,
        url: "/ajax/selfieupload",
        contentType: false,
      })
        .then(raiseOnError)
        .then(r => {
          setImageData(null);
          setInvalidateCache(imageCachePurge());
          if (r.gps && !hasLocation) {
            // No images, and this one has GPS!
            setData({
              ...data,
              images: { ...data.images, [type]: r },
              selfie: addCoordsAndPlace(data.selfie, r.gps),
            });
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
      .then(raiseOnError)
      .then(_r => {
        setInvalidateCache(+new Date());
      });

    toast.promise(rotatePromise, {
      success: undefined,
      error: e => String(e),
    });
  };

  const handleSetCoordinates = (gps: IEditSelfieGps): void => {
    setData({ ...data, selfie: addCoordsAndPlace(data.selfie, gps, true) });
  };

  return (
    <>
      <FileUploader
        onFileAdded={handleImageChange}
        className={className}
      >
        {
          (imageSrc)
            ? (
              <div
                style={{
                  backgroundImage: `url(${imageSrc as string})`,
                  ...imageStyle,
                }}
                aria-description={type === "me" ? "My image" : "Landscape image"}
              />
            )
            : (
              <div className="text-inset-shadow text-lg">
                Drop an image of {type === "me" ? "yourself" : "what you see"}
              </div>
            )
        }

      </FileUploader>
      {
        src &&
        <IconButton
          onClick={() => handleRotateImage()}
          size="sm"
          variant="soft"
          color="neutral"
          sx={{ position: "absolute", right: 10, bottom: 10 }}
          title="rotate clockwise"
          className="group"
        >
          <ArrowPathIcon className="size-6 group-hover:animate-spin" />
        </IconButton>
      }
      {
        src && data.images[type].gps &&
        <AlertDialogModal
          title={<>Set coordinates?</>}
          content={(
            <div className="flex flex-col">
              <span>This will set your image coordinates for this selfie.</span>
              <kbd>{getCoords(data.images[type].gps)}</kbd>
              <span>The name of the location will also be changed.</span>
            </div>
          )}
          primaryButton={
            (onClose) =>
              <Button
                onClick={() => {
                  handleSetCoordinates(data.images[type].gps as IEditSelfieGps);
                  onClose();
                }}
                startDecorator={<MapPinIcon className="size-4" />}
              >
                set coordinates
              </Button>
          }
          secondaryButton={
            onClose =>
              <Button
                startDecorator={<XMarkIcon className="size-5" />}
                onClick={onClose}
                color="neutral"
                sx={{ marginRight: "auto" }}
              >
                cancel
              </Button>
          }
        >
          {(setOpen) =>
            <IconButton
              onClick={() => setOpen()}
              size="sm"
              variant="soft"
              color="neutral"
              title="use the coordinates of this image"
              className="group"
              sx={{ position: "absolute", left: 10, bottom: 10 }}
            >
              <MapPinIcon className="size-6 group-hover:animate-bounce" />
            </IconButton>}
        </AlertDialogModal>
      }
    </>
  );
};
