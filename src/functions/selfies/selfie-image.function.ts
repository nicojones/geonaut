import { ISelfie } from "@/types";

type SelfieImageSource = Pick<ISelfie, "hash"> & Partial<Pick<ISelfie, "edited_on">>;

/**
 * The files keep their names when an image is replaced, so browsers, the image optimizer and
 * og:image scrapers (WhatsApp, Facebook…) would keep the old picture. `edited_on` changes on every
 * save, so it makes the URL change exactly when the images may have.
 */
const selfieImageUrl = (selfie: SelfieImageSource, file: string): string => {
  const url = `${process.env.NEXT_PUBLIC_RESOURCES_URL as string}/images/pictures/uploads/${selfie.hash}/${file}`;
  return selfie.edited_on ? `${url}?v=${encodeURIComponent(selfie.edited_on)}` : url;
};

/**
 * My image
 */
export const selfieMyImage = (selfie: SelfieImageSource, mini: boolean = false): string =>
  selfieImageUrl(selfie, `${mini ? "mini_" : ""}me.jpg`);

/**
 * The Landscape image
 */
export const selfieLcImage = (selfie: SelfieImageSource, mini: boolean = false): string =>
  selfieImageUrl(selfie, `${mini ? "mini_" : ""}lc.jpg`);

/**
 * The composite image
 */
export const selfieCpImage = (selfie: SelfieImageSource): string =>
  selfieImageUrl(selfie, "cp.jpg");
