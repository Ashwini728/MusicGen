import "../styles/MoodSelector.css";

function MoodSelector() {
  return (
    <div className="music-card">
      <h3 className="section-title">Select Mood</h3>
      <select>
        <option>Happy</option>
        <option>Sad</option>
        <option>Energetic</option>
        <option>Calm</option>
      </select>
    </div>
  );
}

export default MoodSelector;
