import { Router } from "express";

import {
  addTrack,
  fetchTracks,
  fetchTrackById
} from "../controllers/track.controller";

const router = Router();

router.post("/", addTrack);

router.get("/", fetchTracks);

router.get("/:id", fetchTrackById);

export default router;