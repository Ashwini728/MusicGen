import "../styles/Home.css";

function Home() {
  return (
    <section className="home">
      <div className="home-content">
        <h2 className="home-title">Create Music with AI</h2>
        <p className="home-subtitle">
          Generate personalized music based on your mood, context, and preferences.
          Experience real-time playback, visual feedback, and intuitive controls.
        </p>
        <a href="/dashboard" className="btn">
          Get Started
        </a>
      </div>
    </section>
  );
}

export default Home;
