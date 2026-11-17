import { IHistoricalMapPinData, ISelfie } from "@/types";

export interface IDashboardData extends IHistoricalMapPinData {
  following: ISelfie[];
  last: ISelfie[];
  unpublished: ISelfie | null;
  /**
   * How many tag requests are waiting for the current user's answer
   */
  pendingTags?: number;
}
