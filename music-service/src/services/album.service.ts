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

//UPDATE ALBUM

export const updateAlbum = async (
  id: string,
  title: string,
  artistId: string,
  coverImage: string,
  releaseDate: string
) => {
  const result = await pool.query(
    `
    UPDATE albums
    SET 
    title = $1, 
    artist_id = $2,
    cover_image = $3,
    release_date = $4
    WHERE id = $5
    RETURNING *
    `,
    [title, artistId, coverImage, releaseDate, id]
  );
  
  return result.rows[0];
};

//DELETE ALBUM

export const deleteAlbum = async (
  id: string
) => {
  const result = await pool.query(
    `
    DELETE FROM albums
    WHERE id = $1
    RETURNING *
    `,
    [id]
  );
  return result.rows[0];  
};
