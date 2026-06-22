console.log("RECOMMENDATION CONTROLLER LOADED");
import { Request, Response } from "express";

import {
  getRecommendations
} from "../services/recommendation.service";

export const fetchRecommendations = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const { userId } = req.params;

    // Ensure userId is a string (Express params can be string | string[])
    const userIdString = Array.isArray(userId) ? userId[0] : userId;

    const tracks = await getRecommendations(userIdString);

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