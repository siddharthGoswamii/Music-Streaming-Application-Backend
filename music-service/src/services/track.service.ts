import { pool } from "../config/db";

export const createTrack = async (
  title: string,
  artistId: string,
  albumId: string,
  duration: number,
  audioUrl: string
) => {

  // Insert track
  const insert = await pool.query(
    `
    INSERT INTO tracks
    (
      title,
      artist_id,
      album_id,
      duration,
      audio_url
    )
    VALUES ($1,$2,$3,$4,$5)
    RETURNING id
    `,
    [
      title,
      artistId,
      albumId,
      duration,
      audioUrl
    ]
  );

  const trackId = insert.rows[0].id;

  // Fetch complete track details
  const result = await pool.query(
    `
    SELECT
      t.id,
      t.title,
      t.duration,
      t.audio_url,
      ar.name AS artist_name,
      al.title AS album_title
    FROM tracks t
    JOIN artists ar
      ON ar.id = t.artist_id
    JOIN albums al
      ON al.id = t.album_id
    WHERE t.id = $1
    `,
    [trackId]
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
    ORDER BY play_count DESC
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

//UPDATE TRACKS(PUT REQUEST BODY)

export const updateTrack = async (
  id: string,
  title: string,
  artistId: string,
  albumId: string,
  duration: number,
  audioUrl: string
) => {

  await pool.query(
    `
    UPDATE tracks
    SET
      title = $1,
      artist_id = $2,
      album_id = $3,
      duration = $4,
      audio_url = $5
    WHERE id = $6
    `,
    [
      title,
      artistId,
      albumId,
      duration,
      audioUrl,
      id
    ]
  );

  const result = await pool.query(
    `
    SELECT
      tracks.*,
      artists.name AS artist_name,
      albums.title AS album_title
    FROM tracks
    JOIN artists
      ON tracks.artist_id = artists.id
    JOIN albums
      ON tracks.album_id = albums.id
    WHERE tracks.id = $1
    `,
    [id]
  );

  return result.rows[0];
};

//DELETE REQUEST  TRACKS(DELETE REQUEST BODY)

export const deleteTrack = async (
  id: string
) => {

  const result = await pool.query(
    `
    DELETE FROM tracks
    WHERE id = $1
    RETURNING *
    `,
    [id]
  );

  return result.rows[0];
};