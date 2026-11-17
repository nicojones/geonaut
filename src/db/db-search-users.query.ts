"use server";
import { ISelfieAuthor } from "@/types";

import { getDbConnection } from "./db.config";

/**
 * Users whose username or name starts with `query`, for the co-author picker. Public profile fields only.
 */
export const dbSearchUsers = async (query: string, selfId: number = 0, limit: number = 8): Promise<ISelfieAuthor[]> => {
  "use server";

  const q = query.trim().replace(/^@/, "").toLowerCase();
  if (!q) {
    return [];
  }

  const [connection, release] = await getDbConnection();
  const [results] = await connection.query(
    `
      SELECT u.id, u.username, u.name, u.profile_pic, u.profile_pic_default
      FROM users u
      WHERE (LOWER(u.username) LIKE :prefix OR LOWER(u.name) LIKE :prefix OR LOWER(u.name) LIKE :wordPrefix)
        AND u.id <> :selfId
      ORDER BY (LOWER(u.username) = :exact) DESC, u.username ASC
      LIMIT :limit
    `,
    {
      prefix: `${q.replace(/[%_\\]/g, "\\$&")}%`,
      wordPrefix: `% ${q.replace(/[%_\\]/g, "\\$&")}%`,
      exact: q,
      selfId,
      limit: Math.min(Math.max(1, limit), 20),
    },
  );
  release();

  return (results as Array<ISelfieAuthor & { profile_pic: string | null; profile_pic_default: string | null; }>)
    .map(({ profile_pic: profilePic, profile_pic_default: profilePicDefault, ...u }) => ({
      ...u,
      avatar: profilePic
        ? `${process.env.NEXT_PUBLIC_RESOURCES_URL as string}/images/pictures/uploads/${profilePic}/mini_me.jpg`
        : `${process.env.NEXT_PUBLIC_FRONTEND_URL as string}/images/icons/default_profile/${profilePicDefault ?? ""}`,
    }));
};
