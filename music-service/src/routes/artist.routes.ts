import { Router } from "express";

import {
  addArtist,
  fetchArtists,
  fetchArtistById
} from "../controllers/artist.controller";

const router = Router();

router.post("/", addArtist);

router.get("/", fetchArtists);

router.get("/:id", fetchArtistById);

export default router;