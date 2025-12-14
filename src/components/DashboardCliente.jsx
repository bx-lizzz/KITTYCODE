// src/components/DashboardCliente.jsx
import React, { useState } from "react";
import { logout } from "../services/auth";
import UserProfile from "./UserProfile";

// 💬 TARJETA DE TESTIMONIO
const TestimonialCard = ({ testimonial, onDelete }) => (
  <div className="bg-pink-50 border border-pink-100 rounded-2xl shadow-sm p-6 relative">
    <p className="text-gray-700 italic mb-4">“{testimonial.content}”</p>
    <div className="text-right">
      <h4 className="font-semibold text-pink-600">{testimonial.name}</h4>
      <p className="text-sm text-gray-600">{testimonial.role}</p>
      <p className="text-xs text-gray-500">{testimonial.company}</p>
      <div className="text-yellow-400 mt-1">
        {"⭐".repeat(testimonial.rating)}
      </div>
    </div>
    <button
      onClick={() => onDelete(testimonial.id)}
      className="absolute top-3 right-3 text-rose-600 font-bold px-2 py-1 hover:bg-rose-100 rounded"
    >
      Eliminar
    </button>
  </div>
);

// CRUD de testimonios
const TestimoniosManager = () => {
  const [testimonios, setTestimonios] = useState([]);
  const [form, setForm] = useState({ name: "", content: "", rating: 5 });

  const handleAdd = () => {
    if (!form.name || !form.content) return;

    const newTestimonio = {
      id: Date.now(),
      name: form.name,
      content: form.content,
      rating: form.rating,
      role: "Cliente",
      company: "Kitty Code",
    };

    setTestimonios([newTestimonio, ...testimonios]);
    setForm({ name: "", content: "", rating: 5 });
  };

  const handleDelete = (id) => {
    setTestimonios(testimonios.filter((t) => t.id !== id));
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-pink-700 mb-4">Testimonios</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-6">
        {/* Input Nombre */}
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Nombre"
          className="border border-pink-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-pink-400 focus:outline-none transition"
        />

        {/* Input Contenido */}
        <input
          type="text"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          placeholder="Escribe un testimonio"
          className="border border-pink-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-pink-400 focus:outline-none transition col-span-2"
        />

        {/* Select Rating */}
        <select
          value={form.rating}
          onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
          className="border border-pink-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-pink-400 focus:outline-none transition"
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {"⭐".repeat(n)}
            </option>
          ))}
        </select>

        {/* Botón Agregar */}
        <button
          onClick={handleAdd}
          className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-xl shadow hover:opacity-90 transition md:col-span-4"
        >
          Agregar
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {testimonios.length === 0 ? (
          <p className="text-gray-500 text-sm">Aún no hay testimonios.</p>
        ) : (
          testimonios.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} onDelete={handleDelete} />
          ))
        )}
      </div>
    </div>
  );
};

const DashboardCliente = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);

  const tabs = [
    { id: "profile", name: "Mi Perfil", icon: "🐱" },
    { id: "testimonios", name: "Testimonios", icon: "📝" },
  ];

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      window.location.href = "/";
    } catch (e) {
      console.error("Error al cerrar sesión:", e);
    }
    setLoading(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="flex flex-col items-center justify-center h-full text-center p-6 bg-pink-50 rounded-2xl shadow-md">
            <h1 className="text-3xl font-bold text-pink-700 mb-4">
              ¡Bienvenida a tu Coder! 🐾
            </h1>
            <p className="text-pink-600 text-lg">
              Aquí puedes gestionar tu perfil, tus testimonios y todo lo
              relacionado con tu cuenta. Explora y diviértete personalizando
              tu espacio.
            </p>
          </div>
        );
      case "testimonios":
        return <TestimoniosManager />;
      default:
        return <UserProfile />;
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
              <p className="text-pink-100 text-sm">Cliente</p>
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
            {tabs.map((tab) => (
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
            ))}
          </ul>
        </aside>

        {/* PANEL PRINCIPAL */}
        <main className="lg:col-span-3 bg-white rounded-2xl p-6 shadow-lg border border-pink-200 min-h-[500px]">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default DashboardCliente;


