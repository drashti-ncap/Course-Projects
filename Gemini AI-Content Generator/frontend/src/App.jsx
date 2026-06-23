import { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import "./App.css";

// API request
const makeRequestAPI = async (prompt) => {
  const res = await axios.post(
    "http://localhost:8080/generate",
    {
      prompt,
    }
  );

  return res.data;
};

function App() {
  const [prompt, setPrompt] = useState("");

  const mutation = useMutation({
    mutationFn: makeRequestAPI,
    mutationKey: ["gemini-ai-request"],
  });

  const submitHandler = (e) => {
    e.preventDefault();

    if (!prompt.trim()) return;

    mutation.mutate(prompt);
  };

  return (
    <div className="App">
      <header>
        Gemini AI Content Generator
      </header>

      <p>
        Enter a prompt and let Gemini AI
        generate content.
      </p>

      <form
        className="App-form"
        onSubmit={submitHandler}
      >
        <input
          type="text"
          value={prompt}
          onChange={(e) =>
            setPrompt(e.target.value)
          }
          placeholder="Write a content about..."
          className="App-input"
        />

        <button
          className="App-button"
          type="submit"
          disabled={mutation.isPending}
        >
          {mutation.isPending
            ? "Generating..."
            : "Generate Content"}
        </button>

        <section className="App-response">
          {mutation.isPending && (
            <p>Generating your content...</p>
          )}

          {mutation.isError && (
            <p>
              {mutation.error?.response?.data
                ?.message ||
                mutation.error.message}
            </p>
          )}

          {mutation.isSuccess && (
            <p>
              {mutation.data?.output ||
                "No content generated"}
            </p>
          )}
        </section>
      </form>
    </div>
  );
}

export default App;