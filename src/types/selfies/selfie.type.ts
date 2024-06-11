import { IBool, ISelfieTypeKey } from "@/types";

export interface ISelfie {
  aago: number;
  ago: number;
  active_hash: string;
  /**
   * @type DateTime
   */
  added_on: string;
  added_on_long: string;
  added_on_words: string;
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
  is_owner: IBool;
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
   * @type Date
   */
  selfie_date: string;
  selfie_date_long: string;
  selfie_date_words: string;
  selfie_place: string;
  selfietype_id: ISelfieTypeKey;
  short_desc: string;
  title: string;
  type: "selfie";
  user_id: number;
  username: string;
}
