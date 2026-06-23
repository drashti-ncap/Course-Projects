"use client";

import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  function handleFile(e) {
    const selected = e.target.files?.[0];

    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setResult("");
  }

  async function analyzeImage() {
    if (!file) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append(
  "prompt",
  "Extract text and summarize content"
);

      const res = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      setResult(data.analysis || "No response");
    } catch {
      setResult("Something went wrong.");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 to-gray-200 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8">

        {/* Upload Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8">

          <h1 className="text-3xl font-bold text-gray-900">
            Image Analyzer
          </h1>

          <p className="text-gray-500 mt-2">
            Upload an image and let AI analyze it.
          </p>

          <label className="mt-6 block cursor-pointer">
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-black transition">

              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  className="rounded-xl max-h-[320px] mx-auto object-contain"
                />
              ) : (
                <>
                  <div className="text-5xl mb-3">🖼️</div>
                  <p className="text-gray-700 font-medium">
                    Click to upload
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    JPG • PNG • WEBP
                  </p>
                </>
              )}
            </div>

            <input
              hidden
              type="file"
              accept="image/*"
              onChange={handleFile}
            />
          </label>

          <button
            disabled={!file || loading}
            onClick={analyzeImage}
            className="mt-6 w-full bg-black text-white rounded-xl py-4 font-medium hover:opacity-90 disabled:bg-gray-400 transition"
          >
            {loading ? (
              <div className="flex justify-center gap-2">
                <div className="w-3 h-3 bg-white rounded-full animate-bounce" />
                <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-100" />
                <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-200" />
              </div>
            ) : (
              "Analyze Image"
            )}
          </button>
        </div>

        {/* Result Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8">

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Analysis Result
          </h2>

          {!result && !loading && (
            <div className="h-full flex items-center justify-center text-gray-400">
              AI response will appear here
            </div>
          )}

          {loading && (
            <div className="animate-pulse space-y-4">
              <div className="h-5 bg-gray-200 rounded" />
              <div className="h-5 bg-gray-200 rounded" />
              <div className="h-5 bg-gray-200 rounded" />
              <div className="h-5 bg-gray-200 rounded w-2/3" />
            </div>
          )}

          {result && (
            <div className="bg-gray-50 rounded-xl p-5 overflow-auto max-h-[500px]">
              <pre className="whitespace-pre-wrap text-gray-800">
                {result}
              </pre>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}