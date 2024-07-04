import { ArrowPathIcon, MapPinIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { Button } from "@mui/joy";
import classNames from "classnames";
import { CSSProperties, useMemo, useState } from "react";
import { toast } from "sonner";

import { AlertDialogModal } from "@/components/generic";
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
  const { data, hash, setData, hasLocation } = useEditSelfieContext();
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
              <div
                style={{
                  backgroundImage: `url(${imageSrc as string})`,
                  ...imageStyle,
                }}
                aria-description={type === "me" ? "My image" : "Landscape image"}
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
      {console.log(data.images[type].gps)}
      {
        src && data.images[type].gps &&
        <AlertDialogModal
          title={<>Set coordinates?</>}
          content={(
            <div className="flex flex-col">
              <span>This will set your image coordinates for this selfie.</span>
              <kbd>({data.images[type].gps.lat}, {data.images[type].gps.lng})</kbd>
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
            onClose => <Button startDecorator={<XMarkIcon className="size-4" />} onClick={onClose}>cancel</Button>
          }
        >
          {(setOpen) =>
            <Button
              onClick={() => setOpen()}
              size="sm"
              variant="plain"
              color="neutral"
              title="use the coordinates of this image"
              sx={{ position: "absolute", left: 10, bottom: 10 }}
            >
              <MapPinIcon className="size-6" />
            </Button>}
        </AlertDialogModal>
      }
    </>
  );
};
