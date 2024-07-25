"use server";
import { IGetSelfiesOptions, ISelfie } from "@/types";

import { getDbConnection } from "./db.config";

export const dbGetUsersWithLastSelfie = async (
  { selfId = 0, start = 0, limit = 10 }: IGetSelfiesOptions,
): Promise<ISelfie[]> => {
  "use server";

  const [connection, close] = await getDbConnection();
  const [results, _fields] = await connection.query(
    `
        SELECT
            s.*,
            IF(l.user_id = :selfId, 1, 0) AS love,
            IF(:selfId = 0, 0,
            IF(:selfId = s.user_id, 'yes', 'no')) as is_owner,
            'user' AS 'type',
            COALESCE(lc.loves, 0) as loves,
            REPLACE(u.short_desc, '&#10;', '') AS profile
        FROM selfies_with_user s
        INNER JOIN selfies_added_on sao ON (s.added_on = sao.added_on AND s.user_id = sao.user_id)
        LEFT JOIN love l ON (s.id = l.selfie_id AND :selfId = l.user_id)
        LEFT JOIN love_count lc ON lc.selfie_id = s.id
        LEFT JOIN users u ON u.id = s.user_id
        GROUP BY s.id, s.user_id, s.active_hash, s.hash, s.title, s.short_desc, s.selfie_date,
                  s.selfie_place, s.lat, s.lng, s.selfietype_id, s.added_on, s.edited_on,
                  s.lc_color, s.me_color, s.me_brightness, s.lc_brightness, s.username, s.name, s.possessive,
                  is_owner, 'type', profile, love, loves
        ORDER BY s.added_on DESC
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
