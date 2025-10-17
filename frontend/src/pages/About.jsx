import "../styles/About.css";

function About() {
  return (
    <section className="about-section">
      <h2 className="about-title">About <span>Whispers of the Wires</span></h2>
      <p className="about-subtitle">
        Transform your emotions into melodies with our AI-powered music composition platform.
      </p>

      <div className="about-cards">
        <div className="about-card">
          <h3>Personalized Music Generation</h3>
          <p>
            Our AI model composes music based on your <strong>mood</strong> and <strong>context</strong>.
            Simply enter a prompt, and experience melodies that resonate with your emotions.
          </p>
        </div>

        <div className="about-card">
          <h3>Advanced AI & Sound Design</h3>
          <p>
            Built with <strong>MusicGen</strong> and <strong>YAMNet</strong>, our system blends deep learning,
            signal processing, and creativity to produce unique, high-quality compositions.
          </p>
        </div>

        <div className="about-card">
          <h3>Seamless Integration</h3>
          <p>
            Experience a smooth connection between our <strong>React frontend</strong> and
            <strong> Flask backend</strong>, delivering real-time generation and audio playback.
          </p>
        </div>

        <div className="about-card">
          <h3>Your AI Music Companion</h3>
          <p>
            Whether you want music for <em>study</em>, <em>relaxation</em>, or <em>creativity</em>,
            <strong> Whispers of the Wires </strong> adapts to your vibe and lets you co-create with AI.
          </p>
        </div>
      </div>

      <div className="about-cta">
        <a href="/dashboard" className="try-button"> Try It Now</a>
      </div>

      <hr className="divider" />

      <div className="contact-section">
        <h3>📩 Contact Us</h3>
        <p>
          Have questions or feedback? We’d love to hear from you!  
          Reach out via email at <a href="mailto:contact@whispersofthewires.ai">contact@whispersofthewires.ai</a>
        </p>
      </div>
    </section>
  );
}

export default About;
