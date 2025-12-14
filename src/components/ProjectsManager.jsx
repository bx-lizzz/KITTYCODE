import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

// Datos iniciales de ejemplo
const initialProjects = [
  {
    id: 1,
    title: "Página Web Kitty Code",
    category: "Desarrollo Web",
    description:
      "Creamos el sitio web oficial de Kitty Code con un diseño moderno y colores rosados pastel. Es un espacio donde mostramos nuestros servicios, equipo y contacto.",
    teamMembers: ["Besnaliz", "Tatiana", "Stefany"],
    impact:
      "Ayuda a que más personas conozcan nuestros proyectos y aprendan sobre programación.",
  },
  {
    id: 2,
    title: "Formulario Interactivo en React",
    category: "Aplicación React",
    description:
      "Desarrollamos un formulario que guarda el nombre, correo y mensaje del usuario. Toda la información se muestra en consola para practicar estados y eventos.",
    teamMembers: ["Besnaliz", "Tatiana", "Stefany"],
    impact:
      "Permite mejorar la práctica en React y facilita la comunicación con los usuarios.",
  },
  {
    id: 3,
    title: "Tienda Online Rosa",
    category: "E-commerce",
    description:
      "Creación de una tienda online para vender productos tecnológicos y educativos. Incluye carrito de compras y pasarela de pago.",
    teamMembers: ["Tatiana", "Stefany"],
    impact:
      "Fomenta el comercio digital y la experiencia de compra para los usuarios de Kitty Code.",
  },
];

const ProjectsManager = () => {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    teamMembers: [],
    impact: "",
  });

  useEffect(() => {
    setProjects(initialProjects);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "teamMembers") {
      setFormData((prev) => ({
        ...prev,
        teamMembers: value.split(",").map((s) => s.trim()).filter(Boolean),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProject) {
      setProjects((prev) =>
        prev.map((p) => (p.id === editingProject.id ? { ...formData, id: p.id } : p))
      );
    } else {
      setProjects((prev) => [...prev, { ...formData, id: Date.now() }]);
    }
    resetForm();
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({ ...project });
    setShowForm(true);
  };

  // 🔴 MODIFICACIÓN: handleDelete con modal Kitty Code
  const handleDelete = async (id) => {
    const confirmed = await new Promise((resolve) => {
      const modal = document.createElement("div");
      modal.innerHTML = `
        <div style="
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center;
          z-index: 9999;
        ">
          <div style="
            background: white; padding: 2rem; border-radius: 12px; text-align: center;
            max-width: 300px; width: 100%;
          ">
            <h2 style="color: #ec4899; font-weight: bold; margin-bottom: 1rem;">Kitty Code 🐾</h2>
            <p style="margin-bottom: 1.5rem;">¿Estás segura de eliminar este proyecto?</p>
            <button id="confirmYes" style="
              background: #f87171; color: white; padding: 0.5rem 1rem; margin-right: 0.5rem; border-radius: 8px;
            ">Eliminar</button>
            <button id="confirmNo" style="
              background: #d1d5db; color: #374151; padding: 0.5rem 1rem; border-radius: 8px;
            ">Cancelar</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      modal.querySelector("#confirmYes").onclick = () => {
        resolve(true);
        document.body.removeChild(modal);
      };
      modal.querySelector("#confirmNo").onclick = () => {
        resolve(false);
        document.body.removeChild(modal);
      };
    });

    if (!confirmed) return;

    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      category: "",
      description: "",
      teamMembers: [],
      impact: "",
    });
    setEditingProject(null);
    setShowForm(false);
  };

  return (
    <div className="p-6 bg-pink-50 rounded-xl shadow-lg border border-pink-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-pink-600">📁 Gestión de Proyectos</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-md font-medium"
        >
          Nuevo Proyecto
        </motion.button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {editingProject ? "Editar Proyecto" : "Nuevo Proyecto"}
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="title"
              placeholder="Título del Proyecto"
              required
              value={formData.title}
              onChange={handleInputChange}
              className="p-3 rounded-lg border border-pink-300"
            />
            <input
              type="text"
              name="category"
              placeholder="Categoría"
              required
              value={formData.category}
              onChange={handleInputChange}
              className="p-3 rounded-lg border border-pink-300"
            />
            <textarea
              name="description"
              placeholder="Descripción"
              required
              value={formData.description}
              onChange={handleInputChange}
              className="p-3 rounded-lg border border-pink-300 md:col-span-2"
            ></textarea>
            <input
              type="text"
              name="teamMembers"
              placeholder="Miembros del equipo (separados por coma)"
              value={formData.teamMembers.join(", ")}
              onChange={handleInputChange}
              className="p-3 rounded-lg border border-pink-300 md:col-span-2"
            />
            <textarea
              name="impact"
              placeholder="Impacto del proyecto"
              value={formData.impact}
              onChange={handleInputChange}
              className="p-3 rounded-lg border border-pink-300 md:col-span-2"
            ></textarea>

            <div className="md:col-span-2 flex gap-3 mt-4">
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                type="submit"
                className="flex-1 bg-pink-500 text-white py-3 rounded-lg"
              >
                {editingProject ? "Actualizar Proyecto" : "Agregar Proyecto"}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                type="button"
                onClick={resetForm}
                className="flex-1 bg-gray-400 text-white py-3 rounded-lg"
              >
                Cancelar
              </motion.button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            className="bg-white p-4 border border-pink-200 rounded-xl shadow-sm flex flex-col md:flex-row justify-between cursor-grab"
            drag
            dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
            whileHover={{ scale: 1.03, boxShadow: "0 8px 20px rgba(0,0,0,0.15)" }}
          >
            <div>
              <p className="font-bold text-pink-600 text-lg">{project.title}</p>
              <p className="text-sm text-gray-600">{project.category}</p>
              <p className="text-gray-500 text-xs mt-1">{project.description}</p>
              <p className="mt-1 text-gray-700 text-sm">
                <strong>Equipo:</strong> {project.teamMembers.join(", ")}
              </p>
              <p className="mt-1 text-gray-700 text-sm">
                <strong>Impacto:</strong> {project.impact}
              </p>
            </div>
            <div className="flex space-x-2 mt-3 md:mt-0">
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => handleEdit(project)}
                className="px-3 py-1 bg-yellow-400 text-black rounded-lg"
              >
                Editar
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => handleDelete(project.id)}
                className="px-3 py-1 bg-red-500 text-white rounded-lg"
              >
                Eliminar
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsManager;

