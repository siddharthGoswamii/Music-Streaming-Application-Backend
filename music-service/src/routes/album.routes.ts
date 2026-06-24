import { Router } from "express";

import {
  addAlbum,
  fetchAlbums,
  fetchAlbumById,
  editAlbum,
  removeAlbum,
  fetchAlbumTracks
} from "../controllers/album.controller";

const router = Router();

router.post("/", addAlbum);

router.get("/", fetchAlbums);

router.get("/:id/tracks", fetchAlbumTracks);

router.get("/:id", fetchAlbumById);

router.put("/:id", editAlbum);

router.delete("/:id", removeAlbum);

export default router;