import { pool } from "../config/db";

export const createArtist = async (
  name: string,
  bio: string,
  image_url: string
) => {

  const result = await pool.query(
    `
    INSERT INTO artists(name,bio,image_url)
    VALUES($1,$2,$3)
    RETURNING *
    `,
    [name, bio, image_url]
  );

  return result.rows[0];
};

export const getAllArtists = async () => {

  const result = await pool.query(
    "SELECT * FROM artists ORDER BY created_at DESC"
  );

  return result.rows;
};

export const getArtistById = async (
  id: string
) => {

  const result = await pool.query(
    "SELECT * FROM artists WHERE id = $1",
    [id]
  );

  return result.rows[0];
};

// UPDATE ARTIST

export const updateArtist = async (
  id: string,
  name: string,
  bio: string,
  image_url: string
) => {
  const result = await pool.query(
    `
    UPDATE artists
    SET 
    name = $1, 
    bio = $2, 
    image_url = $3
    WHERE id = $4
    RETURNING *
    `,
    [
    name, 
    bio, 
    image_url, 
    id
    ]
  );

  return result.rows[0];
};

//DELETE ARTIST

export const deleteArtist = async (
  id: string
) => {
  const result = await pool.query(
    "DELETE FROM artists WHERE id = $1",
    [id]
  );

  return result.rows[0];
};

//GET ARTIST DETAILS WITH SONGS

export const getArtistTracks = async (
  artistId: string
) => {

  const result = await pool.query(
    `
    SELECT *
    FROM tracks
    WHERE artist_id = $1
    `,
    [artistId]
  );

  return result.rows;
};





