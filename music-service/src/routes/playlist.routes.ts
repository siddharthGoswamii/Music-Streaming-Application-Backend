import { Router } from "express";
//importing the functions from the playlist controller
import {
  addPlaylist,
  fetchPlaylists,
  fetchPlaylistById,
  addTrack,
  editPlaylist,
  removePlaylist,
  deleteTrackFromPlaylist
} from "../controllers/playlist.controller";

const router = Router();

router.post("/", addPlaylist);

router.get("/", fetchPlaylists);

router.get("/:id", fetchPlaylistById);

router.post("/:playlistId/tracks", addTrack);

router.put("/:id", editPlaylist);

router.delete("/:id", removePlaylist);

router.delete("/:playlistId/tracks/:trackId", deleteTrackFromPlaylist);

export default router;