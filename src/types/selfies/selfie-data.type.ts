import { IBool, ISelfie, IUserData } from "@/types";

export interface ISelfiesData {
  more: IBool | boolean;
  title?: string;
  selfies: ISelfie[];
}

export interface ISelfieData<T = ISelfie> {
  title: string;
  selfie: T;
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
  skip: number;
  selfies: ISelfie[];
  loading: boolean;
}
