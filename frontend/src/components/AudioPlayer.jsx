import "../styles/AudioPlayer.css";

function AudioPlayer() {
  return (
    <div className="music-card">
      <h3 className="section-title">Audio Playback</h3>
      <audio controls>
        <source src="" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default AudioPlayer;
