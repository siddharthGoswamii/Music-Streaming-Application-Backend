import { Router } from "express";
import axios from "axios";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.SEARCH_SERVICE}/search`,
      {
        params: req.query
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Search service error"
    });
  }
});

export default router;