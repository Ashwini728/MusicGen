import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">MusicAI</h1>
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
        <Link to="/about" className="nav-link">About</Link> 
        <a href="/login" className="btn-nav">Login</a>
      </div>
    </nav>
  );
}

export default Navbar;
