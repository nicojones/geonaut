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
export const dbGetSelfies = async (
  { selfId = 0, userId = 0, start = 0, limit = 10 }: IGetSelfiesOptions,
): Promise<ISelfie[]> => {
  "use server";

  const [connection, close] = await getDbConnection();
  if (userId) {
    const [results, _fields] = await connection.query(
      `
      SELECT
              s.id, s.user_id, s.active_hash, s.hash, s.title, s.short_desc, s.selfie_date,
              s.selfie_place, s.lat, s.lng, s.selfietype_id, s.added_on, s.edited_on,
              s.lc_color, s.me_color, s.lc_brightness, s.me_brightness, s.username, s.name, s.possessive,
              IF(l.user_id = :selfId, 1, 0) AS love,
              -- IF(f.follower = :selfId, 1, 0) AS following,
              'profile' AS 'type',
              COALESCE(lc.loves, 0) as loves
      FROM selfies_with_user s
      LEFT JOIN love l ON (s.id = l.selfie_id AND :selfId = l.user_id)
      -- LEFT JOIN follow f ON s.user_id = f.followed
      LEFT JOIN love_count lc ON lc.selfie_id = s.id
      WHERE (s.user_id = :userId)
      GROUP BY s.id, s.user_id, s.active_hash, s.hash, s.title, s.short_desc, s.selfie_date,
                s.selfie_place, s.lat, s.lng, s.selfietype_id, s.added_on, s.edited_on,
                s.lc_color, s.lc_brightness, s.me_color, s.me_brightness, s.username, s.name, s.possessive,
                'type', love, loves
      ORDER BY s.selfie_date DESC, s.added_on DESC LIMIT :start, :limit
      `,
      {
        userId,
        selfId,
        start,
        limit,
      },
    );

    close();

    return results as ISelfie[];
  } else {
    const [results, _fields] = await connection.query(
      `
        SELECT
              s.id, s.user_id, s.active_hash, s.hash, s.title, s.short_desc, s.selfie_date,
              s.selfie_place, s.lat, s.lng, s.selfietype_id, s.added_on, s.edited_on,
              s.lc_color, s.me_color, s.lc_brightness, s.me_brightness, s.username, s.name, s.possessive,
              IF(l.user_id = :selfId, 1, 0) AS love,
              -- IF(f.follower = :selfId, 1, 0) AS following,
              'selfie' AS 'type',
              COALESCE(lc.loves, 0) as loves
        FROM selfies_with_user s
        LEFT JOIN love l ON (s.id = l.selfie_id AND :selfId = l.user_id)
        -- LEFT JOIN follow f ON s.user_id = f.followed
        LEFT JOIN love_count lc ON lc.selfie_id = s.id
        GROUP BY s.id, s.user_id, s.active_hash, s.hash, s.title, s.short_desc, s.selfie_date,
                  s.selfie_place, s.lat, s.lng, s.selfietype_id, s.added_on, s.edited_on,
                  s.lc_color, s.lc_brightness, s.me_color, s.me_brightness,
                  s.username, s.name, s.possessive,
                  'type', love, loves
        ORDER BY s.added_on DESC LIMIT :start, :limit
      `,
      {
        selfId,
        start,
        limit,
      },
    );

    close();

    return results as ISelfie[];
  }
};
