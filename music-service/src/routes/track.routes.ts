import { Router } from "express";

import {
  addTrack,
  fetchTracks,
  fetchTrendingTracks,
  searchTrack,
  fetchTrackById,
  editTrack,
  removeTrack
} from "../controllers/track.controller";

const router = Router();

router.post("/", addTrack);

router.get("/", fetchTracks);

router.get("/trending", fetchTrendingTracks);

router.get("/search", searchTrack);

router.get("/:id", fetchTrackById);

router.put("/:id", editTrack);

router.delete("/:id", removeTrack);


export default router;