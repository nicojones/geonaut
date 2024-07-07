import { getCoords } from "@/functions";
import { IEditSelfieGps, ISelfieEdit } from "@/types";

export const addCoordsAndPlace = (
  selfie: ISelfieEdit,
  coords: IEditSelfieGps,
  forceNewPlaceName: boolean = false,
): ISelfieEdit => ({
  ...selfie,
  lat: coords.lat || selfie.lat,
  lng: coords.lng || selfie.lng,
  place: forceNewPlaceName
    ? getCoords(coords)
    : selfie.place || getCoords(coords),
});
