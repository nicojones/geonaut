import { IBool, ISelfie } from "@/types";

export interface ISelfiesData {
  title: 0;
  more: IBool;
  selfies: ISelfie[];
}

export interface ISelfieData {
  title: string;
  selfie: ISelfie;
}
