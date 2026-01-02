"use server";

import mysql from "mysql2/promise";
// @ts-expect-error invalid Typescript
import named from "named-placeholders";

const globalForDb = global as unknown as { dbPool: mysql.Pool; };

const dbPool = globalForDb.dbPool || mysql.createPool({
  host: process.env.DB_HOST ?? "",
  user: process.env.DB_USER ?? "",
  database: process.env.DB_NAME ?? "",
  password: process.env.DB_PASS ?? "",
  ...(process.env.DB_PORT ? { port: +process.env.DB_PORT } : {}),
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  namedPlaceholders: true,
});

if (process.env.NODE_ENV !== "production") {
  // use fresh connections except in production
  globalForDb.dbPool = dbPool;
};

export const getDbConnection = async (): Promise<[mysql.PoolConnection, () => void]> => {
  // 2. Get a connection from the pool
  const connection = await dbPool.getConnection();

  // 3. Return the connection and a proper release function
  return [
    connection,
    () => connection.release(), // Use the connection's own release method
  ];
};

export const namedPlaceholders: ((q: string, p: Record<string, any>) => { sql: string; values: any[]; }) = named();
