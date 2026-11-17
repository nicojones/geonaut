import { IBool, ISelfieAuthor, ISelfieTypeKey } from "@/types";

export interface ISelfie {
  active_hash: string;
  /**
   * When the picture was uploaded
   * @type DateTime
   */
  added_on: string;
  /**
   * @type DateTime
   */
  edited_on: string;
  hash: string;
  /**
   * Icon for the map
   */
  icon: string;
  id: number;
  lat: number;
  lng: number;
  lc_brightness: number;
  lc_color: string;
  love: IBool;
  loves: number;
  me_brightness: number;
  me_color: string;
  name: string;
  possessive: string;
  /**
   * The date the picture was taken
   * @type Date
   */
  selfie_date: string;
  selfie_place: string;
  selfietype_id: ISelfieTypeKey;
  short_desc: string;
  title: string;
  type: "selfie";
  user_id: number;
  username: string;
  long_desc: string;
  /**
   * Approved co-authors (not the creator). Filled by `attachCoauthors`.
   */
  coauthors?: ISelfieAuthor[];
  /**
   * The current user created this selfie. Only the creator can delete it.
   */
  is_creator?: IBool;
  /**
   * The current user is an author (creator or approved co-author), as computed by some queries. UI only.
   */
  is_owner?: "yes" | "no" | 0;
}
