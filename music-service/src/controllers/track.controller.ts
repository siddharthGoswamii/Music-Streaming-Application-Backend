import { Request, Response } from "express";

import {
  createTrack,
  getAllTracks,
  getTrackById,
  getTrendingTracks,
  searchTracks,
  updateTrack
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
    
    console.log("FETCH TRACK BY ID HIT - ID:", id);

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

export const fetchTrendingTracks = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    console.log("TRENDING CONTROLLER HIT");

    const tracks = await getTrendingTracks();

    console.log("TRACKS:", tracks);

    res.status(200).json({
      success: true,
      tracks
    });

  } catch (error: any) {

    console.log("TRENDING ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

export const searchTrack = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const { q } = req.query;

    if (!q || typeof q !== "string") {
      res.status(400).json({
        success: false,
        message: "Search keyword is required"
      });
      return;
    }

    const tracks = await searchTracks(q);

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

// UPDATE TRACKS

export const editTrack = async (
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
      title,
      artistId,
      albumId,
      duration,
      audioUrl
    } = req.body;

    const track = await updateTrack(
      id,
      title,
      artistId,
      albumId,
      duration,
      audioUrl
    );

    if (!track) {
      res.status(404).json({
        success: false,
        message: 'Track not found'
      });
      return;
    }

    res.status(200).json({
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