import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import artistRoutes from "./routes/artist.routes";
import albumRoutes from "./routes/album.routes";
import trackRoutes from "./routes/track.routes";
import playlistRoutes from "./routes/playlist.routes";
import likedSongRoutes from "./routes/likedSong.routes";
import historyRoutes from "./routes/history.routes";
import recommendationRoutes from "./routes/recommendation.routes";
import queueRoutes from "./routes/queue.routes";

dotenv.config();

import "./config/db";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/artists", artistRoutes);
app.use("/albums", albumRoutes);
app.use("/tracks", trackRoutes);
app.use("/playlists", playlistRoutes);
app.use("/liked-songs", likedSongRoutes);
app.use("/history", historyRoutes);
app.use("/recommendations", recommendationRoutes);
app.use("/queue", queueRoutes);


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