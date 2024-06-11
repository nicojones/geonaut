import { IThemeType } from "@/types";

export type IUserSettingsBellPosition = "top" | "menu";

export interface ISimpleUserSettings {
  bell_position: IUserSettingsBellPosition;
  name: string;
  username: string;
}

export interface IUserSettings extends ISimpleUserSettings {
  avatar: string;
  email: string;
  theme: IThemeType;
}
