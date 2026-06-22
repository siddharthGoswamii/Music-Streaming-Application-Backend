import { Router } from "express";

import {
  addTrack,
  fetchTracks,
  fetchTrendingTracks,
  searchTrack,
  fetchTrackById
} from "../controllers/track.controller";

const router = Router();

router.post("/", addTrack);

router.get("/", fetchTracks);

router.get("/trending", fetchTrendingTracks);

router.get("/search", searchTrack);

router.get("/:id", fetchTrackById);



export default router;