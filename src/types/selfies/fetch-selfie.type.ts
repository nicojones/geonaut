import { IBool } from "@/types";

export type ISelfieSection = "home" | "discover" | "loves" | "users" | "user" | "one" | "search";

export interface IFetchSelfieBodyGeneric {

  /**
   * The section for which to return the content
   */
  s: ISelfieSection;
  /**
   * @default 10
   */
  limit?: number;
  /**
   * @default 0
   */
  start?: number;
}

export interface IFetchSelfieBody extends IFetchSelfieBodyGeneric {
  /**
   * The username of the user we want to retrieve
   */
  username?: string;
  /**
   * For users, if `true`, it also returns the user information
   */
  info?: IBool;
  /**
   * For "one", pass the hash
   */
  hash?: string;
}
