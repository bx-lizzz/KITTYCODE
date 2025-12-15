import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

// Layout
import Layout from "./components/Layout";

// Pages
import Home from "./pages/Home";
import Team from "./pages/Team";
import Portfolio from "./pages/Portfolio";
import Skills from "./pages/Skills";
import Contact from "./pages/Contact";
import KittyCode from "./pages/KittyCode";
import DashboardPage from "./pages/DashboardPage";

// Components (Dashboards)
import Dashboard from "./components/Dashboard";
import DashboardCliente from "./components/DashboardCliente";
import MemberDashboard from "./components/MemberDashboard";

// Styles
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
    <Router basename="/KITTYCODE/">
      <Layout>
        <Routes>
          {/* Páginas principales */}
          <Route path="/" element={<Home />} />
          <Route path="/kittycode" element={<KittyCode />} />
          <Route path="/nosotras" element={<Team />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portafolio" element={<Portfolio />} />
          <Route path="/habilidades" element={<Skills />} />
          <Route path="/contacto" element={<Contact />} />

          {/* Dashboards */}
          <Route path="/dashboard" element={<DashboardPage />} />

          <Route path="/dashboard/admin" element={<Dashboard />} />
          <Route path="/dashboard/miembro" element={<MemberDashboard />} />
          <Route path="/dashboard/cliente" element={<DashboardCliente />} />

          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/MemberDashboard" element={<MemberDashboard />} />
          <Route path="/DashboardCliente" element={<DashboardCliente />} />
          
          <Route path="*" element={<Home />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
