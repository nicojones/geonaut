import { ArrowUpTrayIcon, PhotoIcon, TrashIcon } from "@heroicons/react/16/solid";
import { Button, IconButton } from "@mui/joy";
import { useCallback, useState } from "react";
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
  const { data, hash } = useEditSelfieContext();
  const [images, setImages] = useState<Array<string | null>>(data.attachments);

  const handleImageChange = useCallback((files: FileList): void => {
    const file = files[0];
    if (!file?.type.startsWith("image/")) {
      toast.error("Invalid image type!");
      return;
    }

    const extension = file.name.split(".").pop() ?? "";
    let fileName =
      prompt(`Name for the file? ${extension ? `(.${extension})` : ""}`, file.name) ??
      file.name;

    if (!fileName.endsWith(`.${extension}`)) {
      fileName += `.${extension}`;
    }

    readAddedImage(file, (_result: IReadFile) => {
      setImages(_i => [..._i, null]);

      const formData = new FormData();
      formData.append("_file_", file);
      formData.append("hash", hash);
      formData.append("type", fileName);
      const uploadPromise = api<IEditSelfieAttachment, any>({
        method: "POST",
        body: formData,
        url: "/api/upload-attachment",
        contentType: false,
      })
        .then(raiseOnError)
        .then(r => {
          setImages(_i => {
            return [..._i.filter(Boolean), r.attachment];
          });
          onUploadComplete?.(r.attachment);
          return r;
        });

      toast.promise(uploadPromise, {
        success: _data => _data.message,
        error: _data => _data.message,
      });
    });
  }, [api, hash, onUploadComplete]);

  const handleDeleteImage = useCallback((src: string): void => {
    if (confirm("this image will be deleted.\n\nplease delete any references to it in the description!")) {
      const deletePromise = api<IEditSelfieAttachment, any>({
        method: "POST",
        url: "/api/delete-attachment",
        body: {
          hash,
          src,
        },
      })
        .then(raiseOnError)
        .then(r => {
          setImages(sources => [...sources.filter(_src => _src !== src)]);
          return r;
        });

      toast.promise(deletePromise, {
        success: _data => _data.message,
        error: _data => _data.message,
      });
    }
  }, [api, hash]);

  return (
    <>

      <div className="flex flex-col space-y-2 py-4">
        {
          images.map(src =>
            src &&
            (
              <div key={src} className="fric space-x-4">
                <IconButton color="danger" onClick={() => handleDeleteImage(src)} title="delete">
                  <TrashIcon className="size-5" />
                </IconButton>
                <Button
                  onClick={() => onUseImage(data.attachmentPrefix + src)}
                  title="use"
                  variant="plain"
                  endDecorator={<PhotoIcon className="size-5" />}
                  className="flex gap-4 items-center"
                >
                  <div
                    className="aspect-square h-16 bg-no-repeat bg-center bg-cover rounded-sm"
                    style={{ backgroundImage: `url(${(process.env.NEXT_PUBLIC_API_URL as string) + data.attachmentPrefix + src})` }}
                  />
                  <pre className="text-secondary">{src.split("attachment_").pop()}</pre>
                </Button>
              </div>
            ),
          )
        }
        <FileUploader
          onFileAdded={handleImageChange}
          className={className}
        >
          {
            lastElementIfArray(images) === null
              ? (
                <div className="text-inset-shadow text-sm fric space-x-2">
                  <span>Uploading...</span>
                  <ArrowUpTrayIcon className="size-4 animate-pulse" />
                </div>
              )
              : (
                <div className="text-inset-shadow text-sm">
                  Click or drop an image here to add it to the description
                </div>
              )
          }
        </FileUploader>
      </div>
    </>
  );
};
