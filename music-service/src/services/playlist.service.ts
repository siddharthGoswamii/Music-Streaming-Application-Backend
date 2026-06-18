import { pool } from "../config/db";

export const createPlaylist = async (
  userId: string,
  name: string,
  description: string
) => {

  const result = await pool.query(
    `
    INSERT INTO playlists
    (user_id,name,description)
    VALUES($1,$2,$3)
    RETURNING *
    `,
    [userId, name, description]
  );

  return result.rows[0];
};

export const getAllPlaylists = async () => {

  const result = await pool.query(
    `
    SELECT *
    FROM playlists
    ORDER BY created_at DESC
    `
  );

  return result.rows;
};

export const getPlaylistById = async (
  id: string
) => {

  const result = await pool.query(
    `
    SELECT *
    FROM playlists
    WHERE id = $1
    `,
    [id]
  );

  return result.rows[0];
};

export const addTrackToPlaylist = async (
  playlistId: string,
  trackId: string
) => {

  const result = await pool.query(
    `
    INSERT INTO playlist_tracks
    (
      playlist_id,
      track_id
    )
    VALUES ($1,$2)
    RETURNING *
    `,
    [playlistId, trackId]
  );

  return result.rows[0];
};