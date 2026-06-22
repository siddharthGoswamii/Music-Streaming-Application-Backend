import { Router } from "express";

import {
  addTrack,
  fetchTracks,
  fetchTrackById,
  fetchTrendingTracks
} from "../controllers/track.controller";

const router = Router();

router.post("/", addTrack);

router.get("/", fetchTracks);

router.get("/:id", fetchTrackById);

router.get("/trending", fetchTrendingTracks);

export default router;