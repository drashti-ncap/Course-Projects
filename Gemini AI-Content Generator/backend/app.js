require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
    ],
  })
);

app.use(express.json());

// Initialize once
const genAI = new GoogleGenerativeAI(
  process.env.API_KEY
);

// Reuse model instance
const model = genAI.getGenerativeModel({
  model: "gemini-3.1-flash-lite",
});

app.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt?.trim()) {
      return res.status(400).json({
        message: "Prompt is required",
      });
    }

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: prompt.trim(),
            },
          ],
        },
      ],

      generationConfig: {
        maxOutputTokens: 300, // reduce output size
        temperature: 0.3, // more focused responses
        topP: 0.8,
        topK: 20,
      },
    });

    // Cleaner extraction
    const output =
      result.response.text()?.trim() ||
      "No response generated";

    // Optional: monitor usage
    console.log(
      "Token Usage:",
      result.response.usageMetadata
    );

    return res.status(200).json({
      output,
      usage:
        result.response.usageMetadata ||
        null,
    });
  } catch (error) {
    console.error("GEMINI ERROR:", error);

    return res.status(500).json({
      message:
        "Failed to generate content",
      error:
        error?.message ||
        "Unknown error",
    });
  }
});

app.get("/", (_, res) => {
  res.send("API running");
});

const PORT =
  process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(
    `Server running at http://localhost:${PORT}`
  );
});