import React, { useState, useEffect } from "react";
import "../styles/PreviousMusic.css";
import LiquidEther from "./LiquidEther"; // adjust path if needed

function PreviousMusic() {
  const [musicList, setMusicList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/list_generated_music/")
      .then((res) => res.json())
      .then((data) => {
        const formattedMusic = data.map((item) => ({
          prompt: item.prompt,
          audioUrl: `http://localhost:8000/generated_music/${item.filename}`,
        }));
        setMusicList(formattedMusic);
      })
      .catch((err) => console.error("Error fetching music list:", err));
  }, []);

  return (
    <div className="pm-container">
      {/* LiquidEther background */}
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
      <section className="pm-section">
        <h2 className="pm-title">Generated Musics</h2>
        {musicList.length === 0 ? (
          <p className="pm-empty">
            No generated music found yet. Generate some tracks first!
          </p>
        ) : (
          <div className="pm-cards">
            {musicList.map((music, index) => (
              <div className="pm-card" key={index}>
                <h3 className="pm-prompt">{music.prompt}</h3>
                <audio controls src={music.audioUrl} className="pm-audio"></audio>

                <div className="pm-actions">
                  <a
                    href={music.audioUrl}
                    download={`music_${index + 1}.wav`}
                    className="pm-download-btn"
                  >
                    Download
                  </a>

                  <div className="pm-rating">
                    <label className="pm-rate-label">Rate:</label>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className="pm-star"
                        onClick={() =>
                          alert(`Rated ${star} stars for: "${music.prompt}"`)
                        }
                      >
                        ⭐
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default PreviousMusic;
