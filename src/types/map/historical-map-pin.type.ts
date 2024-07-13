import { ISelfie } from "@/types";

export type IHistoricalMapPin = Pick<ISelfie, "active_hash" | "hash" | "lat" | "lng" | "selfie_date" | "title">;

export interface IHistoricalMapPinData {
  mapSelfiesRange: [number, number] | null;
  mapSelfies: IHistoricalMapPin[];
}
