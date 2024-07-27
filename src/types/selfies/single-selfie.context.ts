import { IContext } from "@/types/generic";

import { ISelfie } from "./selfie.type";

export interface ISingleSelfieContex extends IContext {
  exists?: boolean;
  selfie: ISelfie;
  prev: ISelfie | null;
  next: ISelfie | null;
  loadSelfie: (hash: string) => void;
}
