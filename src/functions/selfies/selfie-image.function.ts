import { API_URL } from "@/config";

/**
 * My image
 */
export const selfieMyImage = (hash: string, mini: boolean = false): string => `${API_URL}/images/pictures/uploads/${hash}/${mini ? "mini_" : ""}me.jpg`;

/**
 * The Landscape image
 */
export const selfieLcImage = (hash: string, mini: boolean = false): string => `${API_URL}/images/pictures/uploads/${hash}/${mini ? "mini_" : ""}lc.jpg`;
