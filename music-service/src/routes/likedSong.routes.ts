import { Router } from "express";

import {
  addLikedSong,
  fetchLikedSongs
} from "../controllers/likedSong.controller";

const router = Router();

router.post("/", addLikedSong);

router.get("/:userId", fetchLikedSongs);

export default router;