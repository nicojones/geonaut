import { IBool } from "@/types";

export interface IUserData {
  avatar: string;
  birthday: string | null;
  followers: number;
  following: number;
  gender: 0 | 1 | 2;
  hobbies: string;
  /**
   * 0 --> No follow button (UI)
   * 1/0 --> i follow them
   */
  ifollow: boolean | -1;
  isself: IBool;
  name: string;
  pictures: number;
  possessive: "their" | "his" | "her";
  profile: string;
  /**
   * @deprecated SERVER ONLY!
   */
  profile_pic: string;
  /**
   * @deprecated SERVER ONLY!
   */
  profile_pic_default: string;
  username: string;
}
