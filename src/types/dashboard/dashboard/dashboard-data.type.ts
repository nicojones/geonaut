import { ISelfie } from "@/types/selfies";

export type IDashboardMapSelfie = Pick<ISelfie, "active_hash" | "hash" | "lat" | "lng" | "selfie_date" | "title">;

export interface IDashboardData {
  following: ISelfie[];
  last: ISelfie[];
  mapSelfiesSpan: [string, string];
  mapSelfies: IDashboardMapSelfie[];
  unpublished: ISelfie | null;
}
