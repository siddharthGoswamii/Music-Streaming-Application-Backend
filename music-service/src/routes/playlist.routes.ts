import { Router } from "express";

import {
  addPlaylist,
  fetchPlaylists,
  fetchPlaylistById,
   addTrack
} from "../controllers/playlist.controller";

const router = Router();

router.post("/", addPlaylist);

router.get("/", fetchPlaylists);

router.get("/:id", fetchPlaylistById);

router.post("/:playlistId/tracks", addTrack);

export default router;