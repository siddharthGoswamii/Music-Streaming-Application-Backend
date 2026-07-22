import { Router } from "express";

import {
  addTrackToQueue,
  getUserQueue,
  playNext,
  deleteTrackFromQueue,
  clearUserQueue,
  playTrackNext,
} from "../controllers/queue.controller";

const router = Router();

/**
 * Add Track To Queue
 * POST /queue/add
 */
router.post("/add", addTrackToQueue);

/**
 * Get User Queue
 * GET /queue/:userId
 */
router.get("/:userId", getUserQueue);

/**
 * Play Next Track
 * Removes the currently playing track
 * PATCH /queue/play-next
 */
router.patch("/play-next", playNext);

/**
 * Add Track As Next Song
 * POST /queue/play-next/add
 */
router.post("/play-next/add", playTrackNext);

/**
 * Remove Particular Track
 * DELETE /queue/:userId/:trackId
 */
router.delete("/:userId/:trackId", deleteTrackFromQueue);

/**
 * Clear Queue
 * DELETE /queue/clear/:userId
 */
router.delete("/clear/:userId", clearUserQueue);

export default router;