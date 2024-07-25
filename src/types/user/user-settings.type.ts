import { IUserData } from "@/types";

export type IUserSettingsBellPosition = "top" | "menu";

export interface ISimpleUserSettings {
  bell_position: IUserSettingsBellPosition;
  name: string;
  username: string;
  id: number;
}

export type IUserSettings = ISimpleUserSettings & IUserData & {
  avatar: string;
  email: string;
};
