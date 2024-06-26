import { IUserSettings } from "@/types";

export interface ILoggedIn {
  redirect: string;
  user: IUserSettings;
  token: string;
}
