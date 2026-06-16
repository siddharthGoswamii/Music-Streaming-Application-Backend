import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.json({
    success: true,
    service: "Music Service"
  });
});

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(` 🚀 Music Service running on ${PORT}`);
});