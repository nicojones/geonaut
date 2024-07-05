import { IHistoricalMapPinData, ISelfie } from "@/types";

export interface IDashboardData extends IHistoricalMapPinData {
  following: ISelfie[];
  last: ISelfie[];
  unpublished: ISelfie | null;
}
