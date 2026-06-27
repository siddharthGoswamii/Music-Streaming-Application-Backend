import { Request, Response } from "express";

import {
  createAlbum,
  getAllAlbums,
  getAlbumById,
  updateAlbum,
  deleteAlbum,
  getAlbumTracks
} from "../services/album.service";

export const addAlbum = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const {
      title,
      artistId,
      coverImage,
      releaseDate
    } = req.body;

    const album = await createAlbum(
      title,
      artistId,
      coverImage,
      releaseDate
    );

    res.status(201).json({
      success: true,
      album
    });

  } catch (error: any) {

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const fetchAlbums = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {
    const albums = await getAllAlbums();

    res.json({
      success: true,
      albums
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const fetchAlbumById = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {
    const { id } = req.params;

    if (!id || typeof id !== 'string') {
      res.status(400).json({
        success: false,
        message: 'Invalid album ID'
      });
      return;
    }

    const album = await getAlbumById(id);

    if (!album) {
      res.status(404).json({
        success: false,
        message: 'Album not found'
      });
      return;
    }

    res.json({
      success: true,
      album
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// UPDATE ALBUM

export const editAlbum = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const { id } = req.params;

    if (!id || typeof id !== 'string') {
      res.status(400).json({
        success: false,
        message: 'Invalid album ID'
      });
      return;
    }

    const {
      title,
      artistId,
      coverImage,
      releaseDate
    } = req.body;

    const album = await updateAlbum(
      id,
      title,
      artistId,
      coverImage,
      releaseDate
    );

    if (!album) {
      res.status(404).json({
        success: false,
        message: 'Album not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      album
    });

  } catch (error: any) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

//DELETE ALBUM

export const removeAlbum = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const { id } = req.params;

    if (!id || typeof id !== "string") {
      res.status(400).json({
        success: false,
        message: "Invalid album ID"
      });
      return;
    }

    const album = await deleteAlbum(id);

    if (!album) {
      res.status(404).json({
        success: false,
        message: "Album not found"
      });
      return;
    }

    res.status(200).json({
      success: true,
      album
    });

  } catch (error: any) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

// GET ALBUM DETAILS WITH SONGS

export const fetchAlbumTracks = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const { id } = req.params;

    const tracks = await getAlbumTracks(id as string);

    res.status(200).json({
      success: true,
      count: tracks.length,
      tracks
    });

  } catch (error: any) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};