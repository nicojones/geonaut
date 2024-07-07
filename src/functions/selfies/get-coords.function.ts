import { IEditSelfieCoords } from "@/types";

export const getCoords = (coords: IEditSelfieCoords): string =>
  `(${coords.lat}, ${coords.lng})`;
