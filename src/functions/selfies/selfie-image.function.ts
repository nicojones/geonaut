import { RESOURCE_URL } from "@/config";
import { ISelfie } from "@/types";

/**
 * My image
 */
export const selfieMyImage = (selfie: Pick<ISelfie, "hash">, mini: boolean = false): string => `${RESOURCE_URL}/images/pictures/uploads/${selfie.hash}/${mini ? "mini_" : ""}me.jpg`;

/**
 * The Landscape image
 */
export const selfieLcImage = (selfie: Pick<ISelfie, "hash">, mini: boolean = false): string => `${RESOURCE_URL}/images/pictures/uploads/${selfie.hash}/${mini ? "mini_" : ""}lc.jpg`;

/**
 * The composite image
 */
export const selfieCpImage = (selfie: Pick<ISelfie, "hash">): string => `${RESOURCE_URL}/images/pictures/uploads/${selfie.hash}/cp.jpg`;
