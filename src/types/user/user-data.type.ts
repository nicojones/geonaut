import { IBool } from "@/types";

export interface IUserData {
  avatar: string;
  birthday: string | null;
  followers: number;
  following: number;
  gender: 0 | 1 | 2;
  hobbies: string;
  ifollow: number;
  isself: IBool;
  name: string;
  pictures: number;
  possessive: "their" | "his" | "her";
  profile: string;
  // profile_pic: string;
  // profile_pic_default: string;
  username: string;
}
