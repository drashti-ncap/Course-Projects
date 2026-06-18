const express = require("express");
const spellChecker = express.Router();
const axios = require("axios");

spellChecker.post("/", async (req, res) => {
  const { text } = req.body;

  if (!text || typeof text !== "string") {
    return res.status(400).json({ error: "Missing or invalid 'text' in request body." });
  }

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant that checks and corrects spelling errors in the following text. Only return the corrected text without any additional comments or context.",
          },
          {
            role: "user",
            content: text,
          },
        ],
        max_tokens: 150,
        n: 1,
        stop: null,
        temperature: 0.5,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const correctedText = response.data.choices?.[0]?.message?.content?.trim() || "";
    res.json({ correctedText });
  } catch (error) {
    const openaiError = error.response?.data?.error?.message || error.message;
    console.error("Error checking spelling:", error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ error: openaiError });
  }
});
module.exports = spellChecker;