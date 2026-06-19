import { Router } from "express";
//importing the functions from the playlist controller
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