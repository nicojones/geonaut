"use server";
import { IGetSelfiesOptions, ISelfie } from "@/types";

import { getDbConnection } from "./db.config";
import { attachCoauthors, followsAnAuthorSql } from "./selfie-authors.sql";

/**
 * Retrieves all the selfie (up to limit) for user userId (or everyone if userId = 0).
 *
 * Set the selfId parameter to include "love" and "edit" buttons.
 * @param int selfId The ID of the user, or 0 if is not authenticated
 * @param int userId The ID of the selfie-owner, or 0 to retrieve from all users
 * @param int start = 0 The index of the first selfie. LIMIT start, limit
 * @param int limit = 10 The max number of selfies. LIMIT start, limit
 *
 * @return array The result
 */
export const dbGetFollowedSelfies = async (
  { selfId = 0, skip: start = 0, limit = 10 }: IGetSelfiesOptions,
): Promise<ISelfie[]> => {
  "use server";

  const [connection, release] = await getDbConnection();
  const [results, _fields] = await connection.query(
    `
        SELECT
            'selfie' AS 'type',
            COALESCE (lc.loves, 0) AS loves,
            IF(l.user_id = :selfId, 1, 0) AS love,
            -- IF(f.follower = :selfId, 1, 0) AS following,
            s.*
        FROM selfies_with_user s
        LEFT JOIN love_count lc ON lc.selfie_id = s.id
        LEFT JOIN love l ON s.id = l.selfie_id AND l.user_id = :selfId
        -- posts by anyone I follow, creator or approved co-author; once each
        WHERE ${followsAnAuthorSql("s", "selfId")}
      ORDER BY s.added_on DESC LIMIT :start, :limit
      `,
    {
      selfId,
      start,
      limit,
    },
  );

  await attachCoauthors(connection, results as ISelfie[]);
  release();

  return results as ISelfie[];
};
