"use server";
import { decode } from "html-entities";

import { ISelfie } from "@/types";

import { getDbConnection } from "./db.config"; // Adjust the import path as necessary

export const dbGetSelfieByHash = async (
  hash: string,
  selfId: number | false = false,
  fetchLongDesc: boolean = false,
): Promise<ISelfie | null> => {
  "use server";

  const [connection, close] = await getDbConnection();
  let query = "";
  const params: Record<string, string | number> = { hash };

  if (selfId) {
    query = `
      SELECT
        s.*,
        IF(l.user_id = :selfId, 1, 0) AS love,
        IF(f.follower = :selfId, 1, 0) AS following,
        IF(s.user_id = :selfId, 'yes', 'no') AS is_owner,
        'selfie' AS 'type',
        COALESCE(lc.loves, 0) AS loves
      FROM selfies_with_user s
      LEFT JOIN love l ON (s.id = l.selfie_id AND :selfId = l.user_id)
      LEFT JOIN follow f ON s.user_id = f.followed
      LEFT JOIN love_count lc ON lc.selfie_id = s.id
      WHERE s.active_hash = :hash
      LIMIT 1
    `;
    params.selfId = selfId;
  } else {
    query = `
      SELECT
        s.*,
        0 AS love, 0 AS following, 'no' AS is_owner,
        'selfie' AS 'type',
        COALESCE(lc.loves, 0) AS loves
      FROM selfies_with_user s
      LEFT JOIN users u ON s.user_id = u.id
      LEFT JOIN love_count lc ON lc.selfie_id = s.id
      WHERE s.active_hash = :hash
      LIMIT 1
    `;
  }

  const [results] = await connection.query(query, params);
  close();

  if ((results as any[]).length === 0) {
    return null;
  }

  const selfie: ISelfie = (results as any[])[0];

  if (fetchLongDesc) {
    selfie.long_desc = await getLongDesc(selfie.id) ?? "";
  }

  return selfie;
};

// Placeholder function - replace with your actual implementation
const getLongDesc = async (id: number): Promise<string | null> => {
  const [connection, close] = await getDbConnection();
  const [results] = await connection.query("SELECT long_desc FROM selfies WHERE id = ?", [id]);
  close();

  if ((results as any[]).length === 0) {
    return null;
  }

  return decode((results as any[])[0]?.long_desc ?? "") ?? "";
};
