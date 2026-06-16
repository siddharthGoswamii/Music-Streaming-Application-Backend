import type { Request, Response } from "express";

import {
  createArtist,
  getAllArtists,
  getArtistById
} from "../services/artist.service";

export const addArtist = async (
  req: Request,
  res: Response
) => {

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
) => {

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
) => {

  try {

    const { id } = req.params;

    if (!id || typeof id !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Invalid artist ID'
      });
    }

    const artist = await getArtistById(id);

    if (!artist) {
      return res.status(404).json({
        success: false,
        message: 'Artist not found'
      });
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