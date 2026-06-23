import type { Request, Response } from "express";

import {
  createArtist,
  getAllArtists,
  getArtistById,
  updateArtist
} from "../services/artist.service";

export const addArtist = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const {
      name,
      bio,
      image_url
    } = req.body;

    const artist = await createArtist(
      name,
      bio,
      image_url
    );

    res.status(201).json({
      success: true,
      artist
    });

  } catch (error: any) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

export const fetchArtists = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const artists = await getAllArtists();

    res.json({
      success: true,
      artists
    });

  } catch (error: any) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

export const fetchArtistById = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const { id } = req.params;

    if (!id || typeof id !== 'string') {
      res.status(400).json({
        success: false,
        message: 'Invalid artist ID'
      });
      return;
    }

    const artist = await getArtistById(id);

    if (!artist) {
      res.status(404).json({
        success: false,
        message: 'Artist not found'
      });
      return;
    }

    res.json({
      success: true,
      artist
    });

  } catch (error: any) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

//UPDATE ARTIST 

export const editArtist = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const { id } = req.params;

    if (!id || typeof id !== 'string') {
      res.status(400).json({
        success: false,
        message: 'Invalid track ID'
      });
      return;
    }

    const {
      name,
      bio,
      image_url
    } = req.body;

    const artist = await updateArtist(
      id,
      name,
      bio,
      image_url
    );

    if (!artist) {
      res.status(404).json({
        success: false,
        message: 'Artist not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      artist
    });

  } catch (error: any) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};