import { Request, Response } from "express";

import {
  likeSong,
  getLikedSongs
} from "../services/likedSong.service";

export const addLikedSong = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const { userId, trackId } = req.body;

    const song = await likeSong(
      userId,
      trackId
    );

    res.status(201).json({
      success: true,
      song
    });

  } catch (error: any) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

export const fetchLikedSongs = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const { userId } = req.params;

    const songs = await getLikedSongs(userId as string);

    res.status(200).json({
      success: true,
      songs
    });

  } catch (error: any) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};