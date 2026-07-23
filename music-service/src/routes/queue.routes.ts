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


router.post("/add", addTrackToQueue);


router.get("/:userId", getUserQueue);


router.patch("/play-next", playNext);


router.post("/play-next/add", playTrackNext);


router.delete("/:userId/:trackId", deleteTrackFromQueue);


router.delete("/clear/:userId", clearUserQueue);

export default router;