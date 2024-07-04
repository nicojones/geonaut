import { IReadFile } from "@/types";

export const readAddedImage = (
  file: File,
  callback: (data: IReadFile) => any,
): void => {
  const reader = new FileReader();
  reader.onloadend = () => {
    const img = new Image();
    img.addEventListener("load", function () {
      callback(reader.result as IReadFile);
    });
    img.src = reader.result as string;
  };
  reader.readAsDataURL(file);
};
