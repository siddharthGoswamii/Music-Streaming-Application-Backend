import { Router } from "express";

import {
  addTrack,
  fetchTracks,
  fetchTrackById,
  fetchTrendingTracks,
  searchTrack
} from "../controllers/track.controller";

const router = Router();

router.post("/", addTrack);

router.get("/", fetchTracks);

router.get("/search", searchTrack);

router.get("/:id", fetchTrackById);

router.get("/trending", fetchTrendingTracks);


export default router;