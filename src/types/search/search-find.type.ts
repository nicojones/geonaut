import { IFetchSelfieBodyGeneric, ISelfie, ISelfiesData } from "@/types";

export type ISearchFindAll =
  {
    redirect: string;
    searchType?: ISearchResultType;
  }
  |
  {
    selfies: ISelfie[];
    more?: boolean;
  };

export type ISearchFindMany = ISelfiesData;
export type ISearchResultType = "user" | "selfie" | "location" | "date";

export type ISearchResultData = Partial<Record<ISearchResultType, ISelfiesData>>;

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
