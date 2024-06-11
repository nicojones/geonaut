import { ISelfie } from "./selfie.type";

export interface INextSelfie {
  prev: ISelfie | null;
  next: ISelfie | null;
}
