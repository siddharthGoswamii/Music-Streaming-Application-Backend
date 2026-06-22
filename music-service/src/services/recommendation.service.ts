import { pool } from "../config/db";

export const getRecommendations = async (
  userId: string
) => {

  const result = await pool.query(
    `
    SELECT DISTINCT t.*
    FROM tracks t
    WHERE t.artist_id IN (
      SELECT tr.artist_id
      FROM liked_songs ls
      JOIN tracks tr
        ON ls.track_id = tr.id
      WHERE ls.user_id = $1
    )
    LIMIT 20
    `,
    [userId]
  );

  return result.rows;
};