const express = require("express");
const analyzeRouter = express.Router();
const axios = require("axios");

analyzeRouter.post("/", async (req, res) => {
  const { sentence } = req.body;

  if (!sentence || typeof sentence !== "string") {
    return res.status(400).json({ error: "Missing or invalid 'sentence' in request body." });
  }
      console.log("API Key Loaded:", !!process.env.OPENAI_API_KEY);


  try {
    const response = await axios.post(
      
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant that rephrases sentences. Return only the rephrased sentence.",
          },
          {
            role: "user",
            content: sentence,
          },
        ],
        max_tokens: 150,
        n: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const rephrasedSentences =
      response.data.choices?.map((choice) => choice.message?.content?.trim()) || [];

    res.json({ rephrasedSentences });

  } catch (error) {
    const openaiError = error.response?.data?.error?.message || error.message;
    console.error(error.response?.data || error.message);

    res.status(error.response?.status || 500).json({
      error: openaiError,
    });
  }
});

module.exports = analyzeRouter;