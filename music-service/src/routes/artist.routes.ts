import { Router } from "express";

import {
  addArtist,
  fetchArtists,
  fetchArtistById,
  editArtist
} from "../controllers/artist.controller";

const router = Router();

router.post("/", addArtist);

router.get("/", fetchArtists);

router.get("/:id", fetchArtistById);

router.put("/:id", editArtist);


export default router;