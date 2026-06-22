import type { Request, Response } from "express";

import {
  addPlayHistory,
  getRecentlyPlayed
} from "../services/history.service";

export const addHistory = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const {
      user_id,
      track_id
    } = req.body;

    const history = await addPlayHistory(
      user_id,
      track_id
    );

    res.status(201).json({
      success: true,
      history
    });

  } catch (error: any) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

export const fetchRecentlyPlayed = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const { userId } = req.params;

    const tracks = await getRecentlyPlayed(userId as string);

    res.status(200).json({
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