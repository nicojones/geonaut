"use server";
import { getDbConnection } from "./db.config";

export const dbGetUserIdFromUsername = async (username: string): Promise<number> => {
  "use server";

  const [connection, release] = await getDbConnection();
  const [userInfo, _] = await connection.query(
    "SELECT u.id FROM users u WHERE LOWER(u.username) = :username LIMIT 1",
    { username },
  );

  release();

  if (!(userInfo as any[]).length) {
    throw new Error(`no user exists with username ${username}`);
  }

  return (userInfo as any[])[0].id as number;
};
