import { Router } from "express";

import {
  addArtist,
  fetchArtists,
  fetchArtistById,
  editArtist,
  removeArtist
} from "../controllers/artist.controller";

const router = Router();

router.post("/", addArtist);

router.get("/", fetchArtists);

router.get("/:id", fetchArtistById);

router.put("/:id", editArtist);

router.delete("/:id", removeArtist);


export default router;