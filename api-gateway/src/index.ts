import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import musicRoutes from "./routes/music.routes";
import searchRoutes from "./routes/search.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/music", musicRoutes);
app.use("/api/search", searchRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "Gateway Running" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});