import { useState } from "react";
import {
  FaInstagram,
  FaGithub,
  FaLinkedin,
  FaYoutube,
  FaTiktok,
  FaEnvelope,
  FaHeart,
  FaPaperPlane
} from "react-icons/fa";

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase"; // ajusta la ruta si es necesario

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // VALIDACIÓN
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "El nombre es obligatorio 💕";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "El correo no es válido 💌";
    if (!formData.projectType)
      newErrors.projectType = "Selecciona un proyecto 🌸";
    if (!formData.message.trim())
      newErrors.message = "Escribe un mensaje ✏️";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // CAMBIO DE INPUTS
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // ENVÍO A FIREBASE
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "contacts"), {
        name: formData.name,
        email: formData.email,
        projectType: formData.projectType,
        message: formData.message,
        createdAt: serverTimestamp(),
      });

      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        projectType: "",
        message: "",
      });
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
      alert("Ocurrió un error 😢 Intenta nuevamente");
    }

    setIsSubmitting(false);
  };

  // MENSAJE DE ÉXITO
  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pink-50 text-center px-4">
        <div className="bg-white shadow-lg rounded-2xl p-8 border border-pink-100">
          <div className="text-6xl mb-4">🎀</div>
          <h2 className="text-2xl font-bold text-pink-600 mb-2">
            ¡Gracias por tu mensaje!
          </h2>
          <p className="text-gray-600 mb-6">
            Te responderemos pronto con mucho cariño 💖
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="bg-gradient-to-r from-pink-400 to-rose-400 text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-all"
          >
            Enviar otro 💌
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-pink-50 min-h-screen py-16">
      {/* ENCABEZADO */}
      <section className="bg-pink-300 text-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-6">💌 Contáctanos</h1>
        <p className="text-xl max-w-2xl mx-auto">
          Cuéntanos tu idea y hagámosla realidad con un toque de magia ✨
        </p>
      </section>

      {/* CONTENIDO */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 px-6 mt-12">
        {/* INFO */}
        <div className="bg-white rounded-2xl shadow-md p-8 border border-pink-100">
          <h2 className="text-2xl font-semibold text-pink-600 mb-4 text-center">
            🌷 Información
          </h2>

          <ul className="space-y-3 text-gray-700">
            <li>📧 hola@kittycode.dev</li>
            <li>💖 proyectos@kittycode.dev</li>
            <li>🐾 contacto@kittycode.dev</li>
          </ul>

          <div className="mt-8 border-t border-pink-200 pt-4">
            <p className="font-semibold text-pink-600 mb-3">Síguenos:</p>
            <div className="flex gap-4 text-2xl text-pink-500">
              <FaInstagram />
              <FaTiktok />
              <FaYoutube />
              <FaGithub />
              <FaLinkedin />
              <FaEnvelope />
            </div>
          </div>

          <div className="mt-10 text-center text-pink-500">
            <FaHeart className="inline mr-1" />
            Hecho con amor por <span className="font-semibold">Kitty Code</span>
          </div>
        </div>

        {/* FORMULARIO */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-8 border border-pink-100">
          <h2 className="text-2xl font-semibold text-pink-600 mb-6 text-center">
            💬 Envíanos un mensaje
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* NOMBRE */}
            <input
              type="text"
              name="name"
              placeholder="Nombre completo"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border rounded-lg"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

            {/* EMAIL */}
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border rounded-lg"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}

            {/* PROYECTO */}
            <select
              name="projectType"
              value={formData.projectType}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border rounded-lg"
            >
              <option value="">Selecciona un proyecto</option>
              <option value="web">🌐 Sitio Web</option>
              <option value="app">📱 Aplicación</option>
              <option value="design">🎨 Diseño</option>
              <option value="other">✨ Otro</option>
            </select>

            {/* MENSAJE */}
            <textarea
              name="message"
              rows="5"
              placeholder="Escribe tu mensaje..."
              value={formData.message}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border rounded-lg resize-none"
            ></textarea>

            {/* BOTÓN */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center items-center gap-2 py-4 rounded-lg font-semibold text-white bg-gradient-to-r from-pink-400 to-rose-400 hover:scale-105 transition-all"
            >
              <FaPaperPlane />
              {isSubmitting ? "Enviando..." : "Enviar mensaje"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
