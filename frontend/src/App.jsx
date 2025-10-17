import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";  
import PreviousMusic from "./pages/PreviousMusic"; 
import Login from "./pages/Login"; 
import Register from "./pages/Register"; 

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/previous-music" element={<PreviousMusic />} />
        <Route path="/about" element={<About />} />  
      </Routes>
    </Router>
  );
}

export default App;
