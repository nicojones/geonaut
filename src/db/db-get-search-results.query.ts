import { ISearchResultType } from "@/types";

import { getDbConnection } from "./db.config";

export interface ISearchResult {
  type: ISearchResultType;
  username?: string;
  hash?: string;
  active_hash?: string;
  added_on: string;
}

export const dbGetSearchResults = async (
  type: ISearchResultType,
  searchQuery: string,
  start: number,
  limit: number,
): Promise<ISearchResult[]> => {
  const searchQueryLower = searchQuery.toLowerCase();
  let query = "";
  let params: Record<string, any> = {};

  switch (type) {
    case "selfie":
      query = `
        SELECT DISTINCT sout.id as ID, 'selfie' as type, '' as username, sout.hash, sout.active_hash, sout.added_on FROM (
          SELECT s.id, s.active_hash, s.hash, s.added_on FROM selfies_with_user s WHERE (s.hash = :q OR s.active_hash = :q)
          UNION
          SELECT s.id, s.active_hash, s.hash, s.added_on FROM selfies_with_user s WHERE LOWER(s.title) LIKE :qAprox OR SOUNDEX(s.title) = SOUNDEX(:q)
          UNION
          SELECT s.id, s.active_hash, s.hash, s.added_on FROM selfies_with_user s WHERE LOWER(s.short_desc) LIKE :qAprox OR SOUNDEX(s.short_desc) = SOUNDEX(:q)
          UNION
          (
            SELECT s.id, s.active_hash, s.hash, s.added_on
            FROM selfies_with_user s
            INNER JOIN selfies ON s.id = selfies.id
            WHERE LOWER(selfies.long_desc) LIKE :qAprox
          )
          ORDER BY added_on DESC
        ) sout
        LIMIT :start, :limit
      `;
      params = {
        qAprox: `%${searchQueryLower}%`,
        q: searchQueryLower,
        start,
        limit,
      };
      break;

    case "user":
      query = `
        SELECT 'user' as type, u.username, '' as hash, '' as active_hash, s.added_on
        FROM users u
        LEFT JOIN selfies_added_on s ON u.id = s.user_id
        WHERE u.username LIKE :userQuery
        OR u.name LIKE :userQuery
        GROUP BY u.username, s.added_on, hash, active_hash
        LIMIT :start, :limit
      `;
      params = {
        userQuery: `${searchQueryLower}%`,
        start,
        limit,
      };
      break;

    case "location":
      query = `
        SELECT 'location' as type, '' as username, s.hash, s.active_hash, s.added_on
        FROM selfies_with_user s
        WHERE s.selfie_place LIKE :qAprox
        LIMIT :start, :limit
      `;
      params = {
        qAprox: `%${searchQueryLower}%`,
        start,
        limit,
      };
      break;

    case "date": {
      const date = new Date(searchQuery);
      if (isNaN(date.getTime())) {
        return [];
      }

      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      query = `
        SELECT 'date' as type, '' as username, s.hash, s.active_hash, s.added_on
        FROM selfies_with_user s
        WHERE MONTH(s.selfie_date) = :month AND YEAR(s.selfie_date) = :year
        LIMIT :start, :limit
      `;
      params = {
        month,
        year,
        start,
        limit,
      };
      break;
    }
    default: {
      const _exhaustiveSearch: never = type;
      return [];
    }
  }

  const [connection, close] = await getDbConnection();
  const [results] = await connection.query(query, params);
  close();

  return results as ISearchResult[];
};
