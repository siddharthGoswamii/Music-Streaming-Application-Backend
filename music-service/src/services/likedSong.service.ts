import { pool } from "../config/db";

export const likeSong = async (
  userId: string,
  trackId: string
) => {

  const result = await pool.query(
    `
    INSERT INTO liked_songs
    (user_id, track_id)
    VALUES ($1, $2)
    RETURNING *
    `,
    [userId, trackId]
  );

  return result.rows[0];
};

export const getLikedSongs = async (
  userId: string
) => {

  const result = await pool.query(
    `
    SELECT
      t.*
    FROM liked_songs ls

    JOIN tracks t
      ON ls.track_id = t.id

    WHERE ls.user_id = $1
    `,
    [userId]
  );

  return result.rows;
};