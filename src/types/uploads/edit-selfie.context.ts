import { Dispatch, SetStateAction } from "react";

import { IContext, IEditSelfieData, IEditSelfieImagesAdded, IMapPin } from "@/types";

export interface IEditSelfieContext extends IContext {
  data: IEditSelfieData;
  setData: Dispatch<SetStateAction<IEditSelfieData>>;

  hasImages: IEditSelfieImagesAdded;
  hasLocation: boolean;

  markers: IMapPin[];

  hash: string;
}
