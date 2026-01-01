import { IEditSelfieCoords } from "@/types";

const PRECISION = 4;

export const getCoords = (coords: IEditSelfieCoords): string =>
  `(${coords.lat.toFixed(PRECISION)}, ${coords.lng.toFixed(PRECISION)})`;
