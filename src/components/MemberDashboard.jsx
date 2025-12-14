// src/components/Dashboard.jsx
import React, { useState } from "react";
import { logout } from "../services/auth";
import { useAuth } from "../contexts/AuthContext";


import UserProfile from "./UserProfile";
import TeamMemberManager from "./TeamMemberManager";
import ProjectsManager from "./ProjectsManager";
import SkillsManager from "./SkillsManager";

const MemberDashboard = () => {
  // eslint-disable-next-line no-unused-vars
  const { user, userRole, isAdmin, isTeam } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);

  const tabs = [
    { id: "profile", name: "Mi Perfil", icon: "🐱", access: "all" },
    { id: "projects", name: "Proyectos", icon: "🗂️", access: "team" },
    { id: "skills", name: "Habilidades", icon: "⭐", access: "team" },
  ];

  const hasAccess = (access) => {
    if (access === "all") return true;
    if (access === "team") return isTeam || isAdmin;
    if (access === "admin") return isAdmin;
    return false;
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      window.location.href = "/"; // redirección segura
    } catch (e) {
      console.error("Error al cerrar sesión:", e);
    }
    setLoading(false);
  };

  const getRoleLabel = (role) => {
    if (role === "admin") return "Administradora ✨";
    if (role === "team") return "Miembro Kitty💖";
    return "Usuario";
  };

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="flex flex-col items-center justify-center h-full text-center bg-pink-50 rounded-2xl shadow-lg p-10 space-y-6 animate-fadeIn">
    <div className="text-8xl">🐾</div>
    <h1 className="text-4xl font-bold text-pink-700">
      ¡Bienvenida a ser Miembro Kitty!
    </h1>
    <p className="text-pink-600 text-lg max-w-xl">
      En esta página encontrarás <strong>habilidades y proyectos</strong> que te ayudarán a crecer y explorar tu creatividad. 
      Confiamos en ti y en tu capacidad de hacer cosas increíbles ✨.
    </p>
    <p className="text-pink-500 italic">¡Explora, aprende y diviértete!</p>
    
  </div>
        )
        
      case "projects":
              return <ProjectsManager />;
      
      case "skills":
        return <SkillsManager />;
        
      
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100">

      {/* HEADER */}
      <header className="bg-gradient-to-r from-pink-300 to-pink-500 shadow-lg py-4">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center text-2xl shadow-inner">
              🐾
            </div>

            <div>
              <h1 className="text-xl font-bold text-white">Kitty Code Dashboard</h1>
              <p className="text-pink-100 text-sm">Cambios mínimos, pero suficientes!</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            disabled={loading}
            className="bg-white/90 text-pink-700 px-4 py-2 rounded-xl font-semibold border border-pink-200 hover:bg-white shadow transition disabled:opacity-50"
          >
            {loading ? "Cerrando..." : "Cerrar Sesión"}
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-4 gap-10">

        {/* SIDEBAR */}
        <aside className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-pink-200 h-fit">

          <h2 className="text-lg font-semibold text-pink-700 mb-4">Navegación</h2>

          <ul className="space-y-2">
            {tabs.map(
              (tab) =>
                hasAccess(tab.access) && (
                  <li key={tab.id}>
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium transition ${
                        activeTab === tab.id
                          ? "bg-pink-200 text-pink-800 shadow-inner border-l-4 border-pink-500"
                          : "text-pink-600 hover:bg-pink-100"
                      }`}
                    >
                      <span className="text-lg">{tab.icon}</span>
                      {tab.name}
                    </button>
                  </li>
                )
            )}
          </ul>

          {/* TARJETA DE ROL */}
          <div className="mt-8 p-4 rounded-2xl bg-pink-100 border border-pink-200">
            <h3 className="text-sm font-semibold text-pink-700 mb-1">Tu Rol</h3>
            <p className="text-pink-600 text-sm mb-2">{getRoleLabel(userRole)}</p>

            <ul className="text-xs text-pink-500 space-y-1">
              <li>🐾 Gestionar perfil personal</li>
               <li>🐾 Agregar o editar proyectos del equipo</li>
              {isTeam && <li>🐾 Editar contenido de habilidades</li>}
            </ul>
          </div>
        </aside>

        {/* PANEL PRINCIPAL */}
        <main className="lg:col-span-3 bg-white rounded-2xl p-6 shadow-lg border border-pink-200 min-h-[500px]">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default MemberDashboard;


