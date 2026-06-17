import { Router } from "express";

import {
  addAlbum,
  fetchAlbums,
  fetchAlbumById
} from "../controllers/album.controller";

const router = Router();

router.post("/", addAlbum);

router.get("/", fetchAlbums);

router.get("/:id", fetchAlbumById);

export default router;