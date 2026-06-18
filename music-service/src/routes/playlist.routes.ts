import { Router } from "express";

import {
  addPlaylist,
  fetchPlaylists,
  fetchPlaylistById
} from "../controllers/playlist.controller";

const router = Router();

router.post("/", addPlaylist);

router.get("/", fetchPlaylists);

router.get("/:id", fetchPlaylistById);

export default router;