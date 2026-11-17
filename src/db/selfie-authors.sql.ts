import type { PoolConnection } from "mysql2/promise";

import { ISelfie, ISelfieAuthor } from "@/types";

/**
 * SQL condition: user `:param` is an author of selfie `alias` (the creator, or an approved co-author).
 *
 * Use it in WHERE clauses. Never JOIN `selfie_authors` into a list query: a selfie with several authors
 * would come back once per author.
 */
export const authoredBySql = (alias: string, param: string): string => `
  (${alias}.user_id = :${param} OR EXISTS (
    SELECT 1 FROM selfie_authors sa_ab
    WHERE sa_ab.selfie_id = ${alias}.id AND sa_ab.user_id = :${param} AND sa_ab.status = 'approved'
  ))
`;

/**
 * SQL condition: the viewer `:param` follows an author of selfie `alias`. EXISTS, so the selfie shows once
 * even when the viewer follows several of its authors.
 */
export const followsAnAuthorSql = (alias: string, param: string): string => `
  EXISTS (
    SELECT 1 FROM follow f_fa
    WHERE f_fa.follower = :${param}
      AND (f_fa.followed = ${alias}.user_id OR f_fa.followed IN (
        SELECT sa_fa.user_id FROM selfie_authors sa_fa WHERE sa_fa.selfie_id = ${alias}.id AND sa_fa.status = 'approved'
      ))
  )
`;

/**
 * Adds `coauthors` (approved only) to each selfie with one extra query, so the selfie rows never fan out.
 */
export const attachCoauthors = async <T extends Pick<ISelfie, "id" | "coauthors">>(
  connection: PoolConnection,
  selfies: T[],
): Promise<T[]> => {
  if (!selfies.length) {
    return selfies;
  }
  const ids = Array.from(new Set(selfies.map(s => s.id)));
  const [rows] = await connection.query(
    `
      SELECT sa.selfie_id, u.id, u.username, u.name
      FROM selfie_authors sa
      INNER JOIN users u ON u.id = sa.user_id
      WHERE sa.selfie_id IN (:ids) AND sa.status = 'approved'
      ORDER BY sa.responded_on ASC
    `,
    { ids },
  );

  const bySelfie = new Map<number, ISelfieAuthor[]>();
  (rows as Array<ISelfieAuthor & { selfie_id: number; }>).forEach(({ selfie_id: selfieId, ...author }) => {
    bySelfie.set(selfieId, [...(bySelfie.get(selfieId) ?? []), author]);
  });

  selfies.forEach(s => {
    s.coauthors = bySelfie.get(s.id) ?? [];
  });
  return selfies;
};
