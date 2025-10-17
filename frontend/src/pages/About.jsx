import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/About.css";
import LiquidEther from "./LiquidEther"; // adjust path if needed

function About() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const goToPreviousMusic = () => {
    navigate("/previous-music");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact Form Submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="about-container">
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

      <section className="about-section">
        <h2 className="about-title">
          About <span>Whispers of the Wires</span>
        </h2>
        <p className="about-subtitle">
          Transform your emotions into melodies with our AI-powered music composition platform.
        </p>

        {/* View Generated Music Button */}
        <div className="about-cta">
          <button className="previous-music-btn" onClick={goToPreviousMusic}>
            View Generated Music
          </button>
        </div>

        {/* Features Cards */}
        <div className="about-cards">
          <div className="about-card">
            <h3>Save & Replay</h3>
            <p>
              All your generated music is saved automatically. Revisit your favorite tracks anytime and replay them seamlessly.
            </p>
          </div>

          <div className="about-card">
            <h3>Download Your Tracks</h3>
            <p>
              Easily download AI-generated music as WAV files and integrate them into your personal projects or playlists.
            </p>
          </div>

          <div className="about-card">
            <h3>Rating System</h3>
            <p>
              Rate generated music to personalize your experience. Track your preferred moods and genres over time.
            </p>
          </div>

          <div className="about-card">
            <h3>Cross-Platform Access</h3>
            <p>
              Access the platform from any device with real-time AI music generation and playback.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="about-contact-form">
          <h3>Contact Us</h3>
          {submitted && <p className="form-success">Thank you! Your message has been sent.</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <button type="submit" className="submit-btn">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default About;
