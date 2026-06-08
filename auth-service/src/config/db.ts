import { Pool } from "pg";

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "music_streaming",
  password: "admin123",
  port: 5432,
});