import { ISelfie, ISelfiesData } from "@/types";

export const selfieResults = (selfies: ISelfie[], limit: number, title?: string): ISelfiesData => ({
  selfies,
  more: selfies.length === limit,
  title,
});
