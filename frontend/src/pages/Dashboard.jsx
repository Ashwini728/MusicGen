import React, { useState } from "react";
import "../styles/Dashboard.css";
import LiquidEther from "./LiquidEther";

function Dashboard() {
  const [prompt, setPrompt] = useState("");
  const [audioUrl, setAudioUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  // Your backend URL (with trailing slash)
  const BACKEND_URL =
    "http://127.0.0.1:8000/generate_music/";

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      alert("Please enter a mood or style!");
      return;
    }

    setLoading(true);
    setAudioUrl(null);

    try {
      const response = await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood: prompt }), // matches Pydantic model
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong while generating music!");
    }

    setLoading(false);
  };

  return (
    <div className="dashboard-container">
      {/* Background animation */}
      <LiquidEther
        colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
        mouseForce={20}
        cursorSize={100}
        isViscous={false}
        viscous={30}
        iterationsViscous={32}
        iterationsPoisson={32}
        resolution={0.5}
        isBounce={false}
        autoDemo={true}
        autoSpeed={0.5}
        autoIntensity={2.2}
        takeoverDuration={0.25}
        autoResumeDelay={3000}
        autoRampDuration={0.6}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      />

      {/* Foreground content */}
      <div className="dashboard-content">
        <div className="music-card">
          <h1 className="title">AI Music Generator</h1>
          <p className="subtitle">
            Enter a mood or genre (e.g., “Calm Piano”, “Energetic Rock”) and
            generate an AI-composed track.
          </p>

          {/* Prompt Input */}
          <div className="input-group">
            <input
              type="text"
              className="prompt-input"
              placeholder="Enter mood or genre..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button
              onClick={handleGenerate}
              className="btn-primary"
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate"}
            </button>
          </div>

          {/* Music Output */}
          {audioUrl && (
            <div className="audio-section">
              <h3 className="result-title">Your Generated Music</h3>
              <audio controls src={audioUrl} className="audio-player"></audio>

              <a
                href={audioUrl}
                download="generated_music.wav"
                className="download-btn"
              >
                Download Music
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
