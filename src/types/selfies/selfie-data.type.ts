import { IBool, ISelfie, IUserData } from "@/types";

export interface ISelfiesData {
  more: IBool;
  title: string;
  selfies: ISelfie[];
}

export interface ISelfieData {
  title: string;
  selfie: ISelfie;
}

export interface ISelfiesWithUserData extends ISelfiesData {
  user: IUserData;
}

export interface ISelfiePrevNext {
  prev: ISelfie | null;
  next: ISelfie | null;
}

export interface ISelfiesAsyncLoad {
  more: boolean;
  start: number;
  selfies: ISelfie[];
  loading: boolean;
}
