import { ArrowUpTrayIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { toast } from "sonner";

import { useEditSelfieContext, useJwtTokenContext } from "@/context";
import { lastElementIfArray, raiseOnError } from "@/functions";
import { IEditSelfieAttachment, IReadFile } from "@/types";

import { FileUploader } from "./FileUploader";
import { readAddedImage } from "./functions";

interface AttachmentUploaderProps {
  onUploadComplete?: (src: string) => any;
  onUseImage: (src: string) => any;
  /**
   * @default ""
   */
  className?: string;
}

export const AttachmentUploader = ({ className = "", onUseImage, onUploadComplete }: AttachmentUploaderProps): JSX.Element => {
  const { api } = useJwtTokenContext();
  const { hash } = useEditSelfieContext();
  const [images, setImages] = useState<Array<string | null>>([]);

  const handleImageChange = (files: FileList): void => {
    const file = files[0];
    if (!file?.type.startsWith("image/")) {
      toast.error("Invalid image type!");
      return;
    }

    const fileName = prompt("Name for the file?", file.name) ?? file.name;

    readAddedImage(file, (_result: IReadFile) => {
      setImages(_i => [..._i, null]);

      const formData = new FormData();
      formData.append("_file_", file);
      formData.append("hash", hash);
      formData.append("type", fileName);
      const uploadPromise = api<IEditSelfieAttachment, any>({
        method: "POST",
        body: formData,
        url: "/api/imageupload",
        contentType: false,
      })
        .then(raiseOnError)
        .then(r => {
          setImages(_i => {
            const _lastImage = _i.pop();
            return [..._i, r.src];
          });
          onUploadComplete?.(r.src);
          return r;
        });

      toast.promise(uploadPromise, {
        success: _data => _data.message,
        error: _data => _data.message,
      });
    });
  };

  return (
    <>
      <FileUploader
        onFileAdded={handleImageChange}
        className={className}
      >
        {
          lastElementIfArray(images)
            ? (
              <div className="text-inset-shadow text-sm fric space-x-2">
                <span>Uploading...</span>
                <ArrowUpTrayIcon className="size-4 animate-pulse" />
              </div>
            )
            : (
              <div className="text-inset-shadow text-sm">
                Drop an image to add it to the description
              </div>
            )
        }

      </FileUploader>
      <div className="flex flex-col">
        {
          images.map(i =>
            i
              ? (
                <a role="button" onClick={() => onUseImage(i)} key={i} className="fric space-x-4 cursor-pointer">
                  <img src={(process.env.NEXT_PUBLIC_API_URL as string) + i} alt={i} className="h-24"/>
                  <pre>{i}</pre>
                </a>
              )
              : null,
          )
        }
      </div>
    </>
  );
};
