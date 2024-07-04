import classNames from "classnames";
import { useState } from "react";
import { toast } from "sonner";

import { ALLOWED_CUSTOM_DATA_FILE_FORMATS } from "@/config";
import { IFileUploaderProps } from "@/types";

export const FileUploader = ({
  disabled = false,
  acceptTypes = ALLOWED_CUSTOM_DATA_FILE_FORMATS,
  onFileAdded,
  isUploading = false,
  children,
  className = "",
}: IFileUploaderProps): JSX.Element => {
  const [dragging, setDragging] = useState<boolean>(false);

  const handleFileChange = (list: FileList | null): void => {
    handleDrag(false);
    if (list?.length) {
      onFileAdded(list);
    } else {
      toast.error("You didn't add any files");
    }
  };

  const handleDrag = (enter: boolean): void => {
    setDragging(enter);
  };

  return (
    <label
      className={classNames(
        "border-2 border-dashed group cursor-pointer rounded-lg w-full items-center flex justify-center p-12 transition-colors h-full",
        (dragging ? "border-purple-300/30 bg-purple-300/20" : "hover:bg-pulze-200"),
        { "pointer-events-none": isUploading },
        className,
      )}
      onDragEnter={() => {
        handleDrag(true);
      }}
      onDragLeave={() => {
        handleDrag(false);
      }}
      onDragEnd={() => {
        handleDrag(false);
      }}
      onDragOver={e => {
        e.preventDefault();
        e.stopPropagation();
        handleDrag(true);
      }}
      onDrop={e => {
        e.preventDefault();
        e.stopPropagation();
        handleFileChange(e.dataTransfer.files);
      }}
    >
      {children}
      <input
        disabled={disabled}
        type="file"
        onChange={e => handleFileChange(e.target.files)}
        accept={acceptTypes ? Object.keys(acceptTypes).join(",") : "*"}
        className="fixed -left-[10000px] h-0 w-0"
      />
    </label>
  );
};
