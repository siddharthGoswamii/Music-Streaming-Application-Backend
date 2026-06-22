import { Router } from "express";

import {
  addHistory,
  fetchRecentlyPlayed
} from "../controllers/history.controller";

const router = Router();

router.post("/", addHistory);

router.get("/:userId", fetchRecentlyPlayed);

export default router;