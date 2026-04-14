// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Monitoring from "./pages/Monitoring";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-[#0A0A0F]">
        <Navbar />
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/monitoring" element={<Monitoring />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;