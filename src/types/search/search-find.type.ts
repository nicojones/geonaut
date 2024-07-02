import { IFetchSelfieBodyGeneric, ISelfie, ISelfiesData } from "@/types";

export interface ISearchFindAll {
  redirect: string;
  searchType?: ISearchResultType;
}

export type ISearchFindMany = ISelfiesData;
export type ISearchResultType = "user" | "selfie" | "location" | "date";

export type ISearchResultData = Partial<Record<ISearchResultType, ISelfie[]>>;

export interface ISearchBody extends IFetchSelfieBodyGeneric {
  /**
   * The search query
   */
  search: string;
  /**
   * Return instead of redirecting in the server. Leave undefined for `false`.
   */
  return?: 1;
  /**
   * The section name
   */
  s: "search";
  /**
   * @default "all"
   */
  type?: ISearchResultType;
}
