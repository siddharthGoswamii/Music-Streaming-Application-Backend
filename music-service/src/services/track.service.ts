import { pool } from "../config/db";

export const createTrack = async (
  title: string,
  artistId: string,
  albumId: string,
  duration: number,
  audioUrl: string
) => {

  const result = await pool.query(
    `
    INSERT INTO tracks
    (
      title,
      artist_id,
      album_id,
      duration,
      audio_url
    )
    VALUES($1,$2,$3,$4,$5)
    RETURNING *
    `,
    [
      title,
      artistId,
      albumId,
      duration,
      audioUrl
    ]
  );

  return result.rows[0];
};

export const getAllTracks = async () => {

  const result = await pool.query(`
    SELECT
      tracks.*,
      artists.name AS artist_name,
      albums.title AS album_name
    FROM tracks
    JOIN artists
      ON tracks.artist_id = artists.id
    JOIN albums
      ON tracks.album_id = albums.id
  `);

  return result.rows;
};

export const getTrackById = async (
  id: string
) => {

  const result = await pool.query(
    `
    SELECT *
    FROM tracks
    WHERE id = $1
    `,
    [id]
  );

  return result.rows[0];
};

export const getTrendingTracks = async () => {
  const result = await pool.query(`
    SELECT *
    FROM tracks
    ORDER BY created_at DESC
    LIMIT 20
  `);

  return result.rows;
};

export const searchTracks = async (
  keyword: string
) => {

  const result = await pool.query(
    `
    SELECT *
    FROM tracks
    WHERE title ILIKE $1
    `,
    [`%${keyword}%`]
  );

  return result.rows;
};