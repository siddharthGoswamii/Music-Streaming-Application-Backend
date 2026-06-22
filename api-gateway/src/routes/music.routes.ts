import { Router } from "express";
import axios from "axios";

const router = Router();

router.get("/tracks", async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.MUSIC_SERVICE}/tracks`
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      message: "Music service error"
    });
  }
});

export default router;