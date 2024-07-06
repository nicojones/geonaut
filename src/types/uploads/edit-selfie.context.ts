import { Dispatch, SetStateAction } from "react";

import { IContext, IEditSelfieData, IEditSelfieImagesAdded, IMapPin, ISelfieEdit, ZodErrorMapping } from "@/types";

export interface IEditSelfieContext extends IContext {
  data: IEditSelfieData;
  setData: Dispatch<SetStateAction<IEditSelfieData>>;
  setSelfieData: (data: Partial<ISelfieEdit>) => any;

  hasImages: IEditSelfieImagesAdded;
  hasLocation: boolean;

  errors: ZodErrorMapping<ISelfieEdit>;
  setErrors: Dispatch<SetStateAction<ZodErrorMapping<ISelfieEdit>>>;

  markers: IMapPin[];

  hash: string;
}
