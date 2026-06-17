import { Request, Response } from "express";

import {
  createTrack,
  getAllTracks,
  getTrackById
} from "../services/track.service";

export const addTrack = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const {
      title,
      artistId,
      albumId,
      duration,
      audioUrl
    } = req.body;

    const track = await createTrack(
      title,
      artistId,
      albumId,
      duration,
      audioUrl
    );

    res.status(201).json({
      success: true,
      track
    });

  } catch (error: any) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

export const fetchTracks = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {
    const tracks = await getAllTracks();

    res.json({
      success: true,
      tracks
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }

};

export const fetchTrackById = async (
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

    const track = await getTrackById(id);

    if (!track) {
      res.status(404).json({
        success: false,
        message: 'Track not found'
      });
      return;
    }

    res.json({
      success: true,
      track
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }

};