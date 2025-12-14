// src/components/SkillsManagerStyled.jsx
import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { db } from "../firebase"; 
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

const fadeIn = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

const SkillsManagerStyled = () => {
  const [skills, setSkills] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    nivel: 0,
  });

  const skillsCollection = collection(db, "Habilidades");

  const fetchSkills = async () => {
    const snapshot = await getDocs(skillsCollection);
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setSkills(data);
    if (!selectedCat && data.length > 0) setSelectedCat(data[0].categoria);
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const categorias = [...new Set(skills.map(s => s.categoria))];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({ nombre: "", descripcion: "", nivel: 0 });
    setEditingId(null);
    setShowForm(false);
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    if (!formData.nombre.trim()) return alert("El nombre es obligatorio.");
    if (!selectedCat) return alert("Selecciona una categoría.");

    if (editingId) {
      await updateDoc(doc(db, "Habilidades", editingId), { ...formData, categoria: selectedCat });
    } else {
      await addDoc(skillsCollection, { ...formData, categoria: selectedCat });
    }
    resetForm();
    fetchSkills();
  };

  const handleEdit = (skill) => {
    setFormData({
      nombre: skill.nombre,
      descripcion: skill.descripcion,
      nivel: skill.nivel,
    });
    setEditingId(skill.id);
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
            <p style="margin-bottom: 1.5rem;">¿Estás segura de eliminar esta habilidad?</p>
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

    try {
      await deleteDoc(doc(db, "Habilidades", id));
      fetchSkills();
    } catch (err) {
      console.error("Error eliminando habilidad:", err);
      alert("No se pudo eliminar la habilidad.");
    }
  };

  return (
    <motion.div {...fadeIn} className="p-6 bg-pink-50 rounded-xl shadow-lg border border-pink-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-pink-600">🛠️ Gestión de Habilidades</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
        {/* CATEGORÍAS */}
        <motion.div {...fadeIn} className="bg-white p-4 rounded-xl border border-pink-100 shadow-sm">
          <h3 className="font-semibold mb-3">Categorías</h3>
          <div className="flex flex-col gap-2">
            {categorias.map(cat => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.02 }}
                onClick={() => { setSelectedCat(cat); setShowForm(false); setEditingId(null); }}
                className={`flex justify-between p-2 rounded-lg ${selectedCat === cat ? "bg-pink-50 border border-pink-200" : "hover:bg-gray-50"}`}
              >
                <span className="text-sm font-medium text-gray-800">{cat}</span>
                <span className="text-xs text-gray-500">{skills.filter(s => s.categoria === cat).length} habilidades</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* HABILIDADES */}
        <div>
          {/* Agregar / Formulario */}
          <motion.div {...fadeIn} className="bg-white p-6 rounded-xl border border-pink-100 shadow-sm mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{selectedCat || "Sin categoría seleccionada"}</h3>
                <p className="text-sm text-gray-500">Administra las habilidades de la categoría seleccionada.</p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                onClick={() => { setShowForm(true); setEditingId(null); setFormData({ nombre: "", descripcion: "", nivel: 0 }); }}
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-2 rounded-md text-sm"
              >
                + Agregar Habilidad
              </motion.button>
            </div>

            {showForm && (
              <motion.form onSubmit={handleAddOrUpdate} {...fadeIn} className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  placeholder="Nombre de la habilidad"
                  className="p-2 rounded border border-pink-200"
                  required
                />
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="number"
                  name="nivel"
                  value={formData.nivel}
                  onChange={handleInputChange}
                  placeholder="Nivel (%)"
                  className="p-2 rounded border border-pink-200"
                  min={0}
                  max={100}
                />
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                  placeholder="Descripción breve"
                  className="p-2 rounded border border-pink-200"
                />

                <div className="md:col-span-3 flex gap-2 mt-2">
                  <motion.button whileHover={{ scale: 1.05 }} type="submit" className="flex-1 bg-pink-500 text-white py-2 rounded">
                    {editingId ? "Actualizar" : "Agregar"}
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.05 }} type="button" onClick={resetForm} className="flex-1 bg-gray-300 text-black py-2 rounded">
                    Cancelar
                  </motion.button>
                </div>
              </motion.form>
            )}
          </motion.div>

          {/* Lista de Habilidades */}
          <div className="space-y-4">
            {skills.filter(s => s.categoria === selectedCat).map(skill => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02, boxShadow: "0 6px 16px rgba(0,0,0,0.1)" }}
                className="bg-white p-4 rounded-xl border border-pink-100 shadow flex justify-between"
              >
                <div>
                  <p className="font-semibold text-pink-600">{skill.nombre}</p>
                  <p className="text-xs text-gray-500">{skill.descripcion}</p>
                  <p className="text-xs text-gray-700 mt-1">Nivel: {skill.nivel}</p>
                </div>
                <div className="flex gap-2">
                  <motion.button whileHover={{ scale: 1.1 }} onClick={() => handleEdit(skill)} className="px-3 py-1 bg-yellow-400 rounded text-sm">
                    Editar
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.1 }} onClick={() => handleDelete(skill.id)} className="px-3 py-1 bg-red-500 text-white rounded text-sm">
                    Eliminar
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SkillsManagerStyled;



