import { pool } from "../config/db";
import bcrypt from "bcrypt";

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {

  const existingUser = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  if (existingUser.rows.length > 0) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 8);

  const result = await pool.query(
    `
    INSERT INTO users(name,email,password)
    VALUES($1,$2,$3)
    RETURNING id,name,email
    `,
    [name, email, hashedPassword]
  );

  return result.rows[0];
};