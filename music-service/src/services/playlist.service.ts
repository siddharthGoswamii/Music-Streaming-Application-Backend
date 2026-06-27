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
    SELECT
      p.id AS playlist_id,
      p.name AS playlist_name,
      p.description,

      t.id AS track_id,
      t.title,
      t.duration,
      t.audio_url

    FROM playlists p

    LEFT JOIN playlist_tracks pt
      ON p.id = pt.playlist_id

    LEFT JOIN tracks t
      ON pt.track_id = t.id

    WHERE p.id = $1
    `,
    [id]
  );

  return result.rows;
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

// UPDATE PLAYLIST 

export const updatePlaylist = async (
  id: string,
  name: string,
  description: string
) => {

  const result = await pool.query(
    `
    UPDATE playlists
    SET
      name = $1,
      description = $2
    WHERE id = $3
    RETURNING *
    `,
    [
      name,
      description,
      id
    ]
  );

  return result.rows[0];
};

// DELETE PLAYLIST

export const deletePlaylist = async (
  id: string
) => {

  const result = await pool.query(
    `
    DELETE FROM playlists
    WHERE id = $1
    RETURNING *
    `,
    [id]
  );

  return result.rows[0];
};

// REMOVE TRACK FROM PLAYLIST

export const removeTrackFromPlaylist = async (
  playlistId: string,
  trackId: string
) => {

  const result = await pool.query(
    `
    DELETE FROM playlist_tracks
    WHERE playlist_id = $1
    AND track_id = $2
    RETURNING *
    `,
    [playlistId, trackId]
  );

  return result.rows[0];
};