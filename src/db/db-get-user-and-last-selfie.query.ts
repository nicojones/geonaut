"use server";

import { ISelfie } from "@/types";

import { getDbConnection } from "./db.config";

export const dbGetUserAndLastSelfie = async (username: string, selfId: number = 0): Promise<ISelfie | null> => {
  "use server";

  const [connection, close] = await getDbConnection();
  let query = "";
  const params: Record<string, string | number> = { username };

  if (selfId) {
    query = `
      SELECT
        s.*,
        IF(l.user_id = :selfId, 1, 0) AS love,
        IF(f.follower = :selfId, 1, 0) AS following,
        IF(s.user_id = :selfId, 'yes', 'no') AS is_owner,
        'user' AS 'type',
        COALESCE(lc.loves, 0) AS loves
      FROM selfies_with_user s
      INNER JOIN selfies_added_on sao
        ON (sao.user_id = s.user_id) AND (sao.added_on = s.added_on)
      LEFT JOIN love l ON (s.id = l.selfie_id AND :selfId = l.user_id)
      LEFT JOIN follow f ON s.user_id = f.followed
      LEFT JOIN love_count lc ON lc.selfie_id = s.id
      WHERE (s.username = :username)
      LIMIT 1
    `;
    params.selfId = selfId;
  } else {
    query = `
      SELECT
        s.*,
        0 AS love, 0 AS following, 'no' AS is_owner,
        'user' AS 'type',
        COALESCE(lc.loves, 0) AS loves
      FROM selfies_with_user s
      INNER JOIN selfies_added_on sao
        ON (sao.user_id = s.user_id) AND (sao.added_on = s.added_on)
      LEFT JOIN users u ON s.user_id = u.id
      LEFT JOIN love_count lc ON lc.selfie_id = s.id
      WHERE (s.username = :username)
      LIMIT 1
    `;
  }

  const [results] = await connection.query(query, params);
  close();

  if ((results as any[]).length === 0) {
    return null;
  }

  const userAndSelfie: ISelfie = (results as any[])[0];
  return userAndSelfie;
};
