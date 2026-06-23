import { Router } from "express";

import {
  addAlbum,
  fetchAlbums,
  fetchAlbumById,
  editAlbum
} from "../controllers/album.controller";

const router = Router();

router.post("/", addAlbum);

router.get("/", fetchAlbums);

router.get("/:id", fetchAlbumById);

router.put("/:id", editAlbum);


export default router;