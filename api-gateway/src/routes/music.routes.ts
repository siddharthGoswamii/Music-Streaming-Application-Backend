import { Router, Request, Response } from "express";
import axios, { AxiosError } from "axios";

const router = Router();

router.get("/tracks", async (req: Request, res: Response) => {
  try {
    const response = await axios.get(
      `${process.env.MUSIC_SERVICE}/tracks`
    );

    res.json(response.data);
  } catch (error) {
    console.error("Music service error:", error);
    
    if (error instanceof AxiosError) {
      const status = error.response?.status || 500;
      const message = error.response?.data?.message || "Music service error";
      return res.status(status).json({ message });
    }
    
    res.status(500).json({
      message: "Music service error"
    });
  }
});

export default router;