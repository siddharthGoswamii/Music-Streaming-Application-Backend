import { pool } from "../config/db";

/**
 * Add Track To Queue
 */
export const addToQueue = async (
  userId: string,
  trackId: string
) => {

  // Check track exists
  const track = await pool.query(
    `
    SELECT id
    FROM tracks
    WHERE id = $1
    `,
    [trackId]
  );

  if (track.rowCount === 0) {
    throw new Error("Track not found");
  }

  // Get last queue position
  const positionResult = await pool.query(
    `
    SELECT COALESCE(MAX(position),0) AS last_position
    FROM queue
    WHERE user_id = $1
    `,
    [userId]
  );

  const nextPosition =
    Number(positionResult.rows[0].last_position) + 1;

  // Insert into queue
  const result = await pool.query(
    `
    INSERT INTO queue
    (
        user_id,
        track_id,
        position
    )
    VALUES ($1,$2,$3)
    RETURNING *
    `,
    [
      userId,
      trackId,
      nextPosition
    ]
  );

  return result.rows[0];
};

/**
 * Get User Queue
 */
export const getQueue = async (
  userId: string
) => {

  const result = await pool.query(
    `
    SELECT
        q.id,
        q.position,
        q.created_at,

        t.id AS track_id,
        t.title,
        t.duration,
        t.audio_url,

        ar.name AS artist_name,

        al.title AS album_name

    FROM queue q

    JOIN tracks t
        ON q.track_id = t.id

    JOIN artists ar
        ON ar.id = t.artist_id

    JOIN albums al
        ON al.id = t.album_id

    WHERE q.user_id = $1

    ORDER BY q.position ASC
    `,
    [userId]
  );

  return result.rows;
};

/**
 * Play Next Track
 * Removes first song from queue
 */
export const playNextTrack = async (
  userId: string
) => {

  const firstSong = await pool.query(
    `
    SELECT *
    FROM queue
    WHERE user_id = $1
    ORDER BY position ASC
    LIMIT 1
    `,
    [userId]
  );

  if (firstSong.rowCount === 0) {
    throw new Error("Queue is empty");
  }

  const current = firstSong.rows[0];

  // Remove current song
  await pool.query(
    `
    DELETE FROM queue
    WHERE id = $1
    `,
    [current.id]
  );

  // Reorder queue
  await pool.query(
    `
    UPDATE queue
    SET position = position - 1
    WHERE
        user_id = $1
        AND position > $2
    `,
    [
      userId,
      current.position
    ]
  );

  return current;
};

/**
 * Remove Particular Song
 */
export const removeFromQueue = async (
  userId: string,
  trackId: string
) => {

  const song = await pool.query(
    `
    SELECT *
    FROM queue
    WHERE
        user_id = $1
        AND track_id = $2
    LIMIT 1
    `,
    [
      userId,
      trackId
    ]
  );

  if (song.rowCount === 0) {
    throw new Error("Track not found in queue");
  }

  const queueItem = song.rows[0];

  await pool.query(
    `
    DELETE FROM queue
    WHERE id = $1
    `,
    [queueItem.id]
  );

  await pool.query(
    `
    UPDATE queue
    SET position = position - 1
    WHERE
        user_id = $1
        AND position > $2
    `,
    [
      userId,
      queueItem.position
    ]
  );

  return {
    message: "Track removed from queue"
  };
};

/**
 * Clear Queue
 */
export const clearQueue = async (
  userId: string
) => {

  await pool.query(
    `
    DELETE
    FROM queue
    WHERE user_id = $1
    `,
    [userId]
  );

  return {
    message: "Queue cleared successfully"
  };
};

/**
 * Play Next
 * Inserts a song immediately after
 * the currently playing song.
 */
export const addPlayNext = async (
  userId: string,
  trackId: string
) => {

  // Shift existing queue
  await pool.query(
    `
    UPDATE queue
    SET position = position + 1
    WHERE
        user_id = $1
        AND position >= 2
    `,
    [userId]
  );

  const result = await pool.query(
    `
    INSERT INTO queue
    (
        user_id,
        track_id,
        position
    )
    VALUES ($1,$2,2)
    RETURNING *
    `,
    [
      userId,
      trackId
    ]
  );

  return result.rows[0];
};