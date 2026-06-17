import { pool } from "../config/db";

export const createAlbum = async (
  title: string,
  artistId: string,
  coverImage: string,
  releaseDate: string
) => {

  const result = await pool.query(
    `
    INSERT INTO albums
    (title, artist_id, cover_image, release_date)
    VALUES($1,$2,$3,$4)
    RETURNING *
    `,
    [title, artistId, coverImage, releaseDate]
  );

  return result.rows[0];
};

export const getAllAlbums = async () => {

  const result = await pool.query(`
    SELECT
      albums.*,
      artists.name AS artist_name
    FROM albums
    JOIN artists
    ON albums.artist_id = artists.id
  `);

  return result.rows;
};

export const getAlbumById = async (
  id: string
) => {

  const result = await pool.query(
    `
    SELECT *
    FROM albums
    WHERE id = $1
    `,
    [id]
  );

  return result.rows[0];
};