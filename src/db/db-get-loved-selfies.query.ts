"use server";
import { IGetSelfiesOptions, ISelfie } from "@/types";

import { getDbConnection } from "./db.config";

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
export const dbGetLovedSelfies = async (
  { selfId = 0, start = 0, limit = 10 }: IGetSelfiesOptions,
): Promise<ISelfie[]> => {
  "use server";

  const [connection, close] = await getDbConnection();
  const [results, _fields] = await connection.query(
    `
        SELECT
          s.*,
          IF(l.user_id = :selfId, 1, 0) AS love,
          DATEDIFF(CURRENT_TIMESTAMP, s.selfie_date) AS ago,
          'selfie' AS 'type',
          1 as loves
        FROM selfies_with_user s
        LEFT JOIN love l ON s.id = l.selfie_id
        LEFT JOIN love_count lc ON lc.selfie_id = s.id
        WHERE (l.user_id = :selfId)
        GROUP BY s.id, l.love_on, s.user_id, s.active_hash, s.hash, s.title, s.short_desc, s.selfie_date,
                  s.selfie_place, s.lat, s.lng, s.selfietype_id, s.added_on, s.edited_on,
                  s.lc_color, s.lc_brightness, s.me_color, s.me_brightness, s.username, s.name, s.possessive, s.ago,
                  'type', ago, love, loves
        ORDER BY l.love_on DESC
        LIMIT :start, :limit
      `,
    {
      selfId,
      start,
      limit,
    },
  );

  close();

  return results as ISelfie[];
};
