import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import OpenAI from "openai";
import axios from "axios";
import fs from "fs";
import path from "path";

const app = express();
const PORT = 9000;

// Connect mongodb
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(console.log);

// Serve public folder

// Gallery model
const gallerySchema = new mongoose.Schema(
  {
    prompt: String,
    url: String,
  },
  {
    timestamps: true,
  }
);

const Gallery = mongoose.model("Gallery", gallerySchema);

// OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Cors
app.use(
  cors({
    origin: ["http://localhost:5174", "http://localhost:5173"],
  })
);

app.use(express.json());
app.use(express.static("public"));

// Create images folder if not exists
const IMAGE_DIR = path.join(process.cwd(), "public", "images");

if (!fs.existsSync(IMAGE_DIR)) {
  fs.mkdirSync(IMAGE_DIR, { recursive: true });
}

// Generate image
app.post("/generate-image", async (req, res) => {
  try {
    const { prompt } = req.body;

    const imageResponse = await openai.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "1024x1024",
    });

    const imageBase64 = imageResponse.data[0].b64_json;

    // Generate filename once
    const fileName = `${Date.now()}.png`;
    const filePath = path.join(IMAGE_DIR, fileName);

    // Save image
    fs.writeFileSync(filePath, imageBase64, "base64");

    // URL for frontend
    const localUrl = `/images/${fileName}`;

    // Save MongoDB
    const imageCreated = await Gallery.create({
      prompt,
      url: localUrl,
    });

    res.json(imageCreated);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error generating image",
      error: error.message,
    });
  }
});;

// List images
app.get("/gallery", async (req, res) => {
  try {
    const images = await Gallery.find();
    res.json(images);
  } catch {
    res.status(500).json({
      message: "Error fetching images",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});