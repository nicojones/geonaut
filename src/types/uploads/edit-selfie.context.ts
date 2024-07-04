import { IContext, IEditSelfieCoords, IEditSelfieData, IEditSelfieImagesAdded, IMapPin } from "@/types";
import { Dispatch, SetStateAction } from "react";

export interface IEditSelfieContext extends IContext {
  data: IEditSelfieData;
  setData: Dispatch<SetStateAction<IEditSelfieData>>;

  hasImages: IEditSelfieImagesAdded;
  hasLocation: boolean;

  markers: IMapPin[];

  hash: string;
}
