import dotenv from "dotenv";
dotenv.config();
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const dbSingleton = async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: Number(process.env.DB_PORT),
    keepAliveInitialDelay: 10000,
    enableKeepAlive: true,
    connectTimeout: 60000,
  });

  return drizzle(connection, { mode: "default" });
};

declare const globalThis: {
  dbGlobal: Awaited<ReturnType<typeof dbSingleton>>;
} & typeof global;

const conn = globalThis.dbGlobal ?? (await dbSingleton());

export default conn;

if (process.env.NODE_ENV !== "production") globalThis.dbGlobal = conn;
