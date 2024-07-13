import mysql, { Connection } from "mysql2/promise";
// @ts-expect-error invalid Typescript
import named from "named-placeholders";

const dbConnection = mysql.createPool({
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

export const getDbConnection = async (): Promise<[Connection, () => any]> => {
  const connection = await dbConnection.getConnection();

  return [
    connection,
    () => {
      dbConnection.releaseConnection(connection);
    },
  ];
};

export const namedPlaceholders: ((q: string, p: Record<string, any>) => { sql: string; values: any[]; }) = named();
