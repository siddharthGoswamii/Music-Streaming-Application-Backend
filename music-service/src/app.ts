import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import artistRoutes from "./routes/artist.routes";

dotenv.config();

import "./config/db";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/artists", artistRoutes);

app.get("/", (_, res) => {
  res.json({
    success: true,
    service: "Music Service Running"
  });
});

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`🚀 Music Service running on port ${PORT}`);
});