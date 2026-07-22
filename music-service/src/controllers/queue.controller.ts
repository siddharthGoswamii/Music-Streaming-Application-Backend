import { Request, Response } from "express";

import {
  addToQueue,
  getQueue,
  playNextTrack,
  removeFromQueue,
  clearQueue,
  addPlayNext,
} from "../services/queue.service";

/**
 * Add Track To Queue
 * POST /queue/add
 */
export const addTrackToQueue = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId, trackId } = req.body;

    if (!userId || !trackId) {
      return res.status(400).json({
        success: false,
        message: "userId and trackId are required",
      });
    }

    const queue = await addToQueue(userId, trackId);

    return res.status(201).json({
      success: true,
      message: "Track added to queue successfully",
      data: queue,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get Queue
 * GET /queue/:userId
 */
export const getUserQueue = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.params.userId as string;

    const queue = await getQueue(userId);

    return res.status(200).json({
      success: true,
      count: queue.length,
      data: queue,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Play Next Track
 * PATCH /queue/play-next
 */
export const playNext = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId } = req.body;

    const song = await playNextTrack(userId);

    return res.status(200).json({
      success: true,
      message: "Now playing next track",
      data: song,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Remove Track From Queue
 * DELETE /queue/:userId/:trackId
 */
export const deleteTrackFromQueue = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId, trackId } = req.params;

    const result = await removeFromQueue(
      userId,
      trackId
    );

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Clear Queue
 * DELETE /queue/clear/:userId
 */
export const clearUserQueue = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId } = req.params;

    const result = await clearQueue(userId);

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Play Next (Insert Song At Position 2)
 * POST /queue/play-next/add
 */
export const playTrackNext = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId, trackId } = req.body;

    if (!userId || !trackId) {
      return res.status(400).json({
        success: false,
        message: "userId and trackId are required",
      });
    }

    const queue = await addPlayNext(
      userId,
      trackId
    );

    return res.status(201).json({
      success: true,
      message: "Track added to play next",
      data: queue,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};