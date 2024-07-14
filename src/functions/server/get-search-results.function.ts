"use server";

import { dbGetSearchResults, dbGetSelfieByHash, dbGetUserAndLastSelfie, ISearchResult } from "@/db";
import { getUserFromCookie } from "@/functions/server/get-user-from-cookie.function";
import { ISearchFindAll, ISearchResultType, ISelfie, ISelfiesData } from "@/types";

export const searchAll = async (searchQuery: string): Promise<ISearchResult[]> => {
  const results = await Promise.all([
    dbGetSearchResults("selfie", searchQuery, 0, 2),
    dbGetSearchResults("user", searchQuery, 0, 2),
    dbGetSearchResults("location", searchQuery, 0, 2),
    dbGetSearchResults("date", searchQuery, 0, 2),
  ]);

  // Flatten the array of results
  return results.flat();
};

export async function getSearchResults (
  type: ISearchResultType | "all",
  search: string,
  returnCount: boolean,
  start: number = 0,
  limit: number = 10,
): Promise<ISearchFindAll & ISelfiesData> {
  "use server";
  const loggedInUser = await getUserFromCookie();

  if (!search) {
    return {
      selfies: [],
      more: false,
    };
  }

  let searchResults: ISearchResult[] = [];

  if (type !== "all") {
    searchResults = await dbGetSearchResults(type, search, start, limit);
  } else {
    // Assuming you have a function `searchAll` in your model for general search
    searchResults = await searchAll(search);
  }

  const resultCount = searchResults.length;

  if (resultCount === 0) {
    return ({
      selfies: [],
      more: false,
    });
  } else if (resultCount === 1 && type === "all") {
    const result: ISearchResult = searchResults[0];
    if (result.hash === "0") {
      return ({
        redirect: `/u/${result.username as string}`,
        selfies: [],
        more: false,
      });
    } else {
      return ({
        redirect: `/s/${result.active_hash as string}`,
        selfies: [],
        more: false,
      });
    }
  } else {
    if (returnCount) {
      return ({
        redirect: `/search/${encodeURIComponent(search)}`,
        searchType: searchResults[0].type,
        selfies: [],
        more: false,
      });
    } else {
      const final = await Promise.all(
        searchResults.map(async result => {
          if (result.hash === "0") {
            return await dbGetUserAndLastSelfie(result.username as string, loggedInUser?.id ?? 0);
          } else {
            return await dbGetSelfieByHash(result.hash as string, loggedInUser?.id ?? 0);
          }
        }),
      );

      return ({
        selfies: final.filter(Boolean) as ISelfie[],
        more: final.length >= limit,
      });
    }
  }
}
