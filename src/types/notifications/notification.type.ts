import { IBool, IUserData } from "@/types";

export interface INotification {
  active_hash: string;
  added_on: string;
  avatar: string;
  comment: string;
  comment_id: number;
  extra: IBool;
  hash: string;
  id: number;
  name: string;
  notif_type: "comment" | "like" | "post";
  // profile_pic: string;
  // profile_pic_default: string;
  seen: null | string;
  selfie_added_on: string;
  title: string;
  username: IUserData["username"];
}

export interface INotificationResponse {
  unread: number;
  notifications: INotification[];
}
