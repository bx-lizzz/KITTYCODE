import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Team from "./pages/Team";
import Portfolio from "./pages/Portfolio";
import Skills from "./pages/Skills";
import Contact from "./pages/Contact";

// ⭐ Agregar DashboardPage
import DashboardPage from "./pages/DashboardPage";
import DashboardCliente from "./components/DashboardCliente";
import MemberDashboard from "./components/MemberDashboard";
import Dashboard from "./components/Dashboard";

import "./index.css";

function App() {
  useEffect(() => {
    let cursor = document.querySelector(".custom-cursor");
    if (!cursor) {
      cursor = document.createElement("div");
      cursor.classList.add("custom-cursor");
      document.body.appendChild(cursor);
    }

    document.body.style.cursor = "none";

    let lastTrailTime = 0;

    const moveCursor = (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;

      const now = Date.now();

      if (now - lastTrailTime > 45) {
        const trail = document.createElement("div");
        trail.className = "paw-trail";
        trail.style.left = `${e.clientX}px`;
        trail.style.top = `${e.clientY}px`;
        trail.style.setProperty("--angle", `${Math.random() * 60 - 30}deg`);
        document.body.appendChild(trail);

        setTimeout(() => trail.remove(), 1500);
        lastTrailTime = now;
      }
    };

    const clickEffect = (e) => {
      const explosion = document.createElement("div");
      explosion.className = "click-explosion";
      explosion.style.left = `${e.clientX}px`;
      explosion.style.top = `${e.clientY}px`;
      document.body.appendChild(explosion);
      setTimeout(() => explosion.remove(), 800);
    };

    document.addEventListener("mousemove", moveCursor);
    document.addEventListener("click", clickEffect);

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("click", clickEffect);
    };
  }, []);

  return (
    <Router basename="/Proyecto-Final-U3">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nosotras" element={<Team />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portafolio" element={<Portfolio />} />
          <Route path="/habilidades" element={<Skills />} />
          <Route path="/contacto" element={<Contact />} />

          {/* ⭐ Aquí agregamos tu Dashboard */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/MemberDashboard" element={<MemberDashboard />} />
      <Route path="/DashboardCliente" element={<DashboardCliente />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;













