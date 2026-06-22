import { pool } from "../config/db";

export const addPlayHistory = async (
  userId: string,
  trackId: string
) => {

  const result = await pool.query(
    `
    INSERT INTO play_history
    (user_id, track_id)
    VALUES ($1, $2)
    RETURNING *
    `,
    [userId, trackId]
  );

  return result.rows[0];
};

export const getRecentlyPlayed = async (
  userId: string
) => {

  const result = await pool.query(
    `
    SELECT
      ph.played_at,
      t.id AS track_id,
      t.title,
      t.duration,
      t.audio_url
    FROM play_history ph
    JOIN tracks t
      ON ph.track_id = t.id
    WHERE ph.user_id = $1
    ORDER BY ph.played_at DESC
    LIMIT 20
    `,
    [userId]
  );

  return result.rows;
};