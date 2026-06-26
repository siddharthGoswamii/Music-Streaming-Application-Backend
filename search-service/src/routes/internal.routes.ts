import { Router } from "express";

import {
  indexTrack,
  updateTrack,
  deleteTrack
} from "../controllers/internal.controller";

const router = Router();

router.post("/index", indexTrack);

router.put("/index/:id", updateTrack);

router.delete("/index/:id", deleteTrack);

export default router;