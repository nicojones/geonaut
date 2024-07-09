import { IUserSettings } from "@/types";

export interface ILoggedIn {
  redirect: string;
  user: IUserSettings;
  token: string;
}

export type ILoggedInError<T extends Record<string, any> = Record<string, any>> = (
  Partial<Record<keyof T, string>> & { received: string; }
);

export interface ILoggedInErrorReceived<T extends string = string> {
  field: T;
  message: string;
  received: string;
}
