import { z } from "zod";

import { ISelfieAuthor } from "@/types";
import { EditSelfieValidator } from "@/validators";

export interface IEditSelfieData {
  selfie: ISelfieEdit;
  images: IEditSelfieImages;
  constraints: IConstraints;
  attachmentPrefix: string;
  attachments: string[];
  /**
   * Everyone tagged on the selfie, with their status (from PHP `s=edit`)
   */
  coauthors?: ISelfieAuthor[];
  /**
   * The current user created the selfie (can remove approved co-authors and delete it)
   */
  is_creator?: boolean;
}

export type ISelfieEdit = z.infer<typeof EditSelfieValidator>;
export type ISelfieEditInput = z.input<typeof EditSelfieValidator>;

export interface IEditSelfieImages {
  me: IEditSelfieImageDetails | Record<keyof IEditSelfieImageDetails, undefined>;
  lc: IEditSelfieImageDetails | Record<keyof IEditSelfieImageDetails, undefined>;
}
export type IEditSelfieImagesAdded = Record<keyof IEditSelfieImages, boolean> | undefined;

export interface IEditSelfieCoords {
  lat: number;
  lng: number;
}

export interface IEditSelfieGps extends IEditSelfieCoords {
  place: string;
}

export interface IEditSelfieImageDetails {
  gps: IEditSelfieGps | null;
  finalName: string;
  img: string;
  mini: string;
  date: string;
  color: ISelfieColor;
  resized: number;
}

export interface ISelfieColor {
  color: string;
  brightness: number;
}

export interface IConstraints {
  titleML: number;
  titleXL: number;
  subtitleML: number;
  subtitleXL: number;
}

export interface IEditSelfieAttachment {
  uploadedType: string;
  attachment: string;
  attachmentPrefix: string;
  message: string;
}
