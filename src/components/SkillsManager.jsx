import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

/* 🔒 CATEGORÍAS FIJAS */
const CATEGORIAS = [
  "Frontend",
  "Backend",
  "Habilidades Blandas",
];

const SkillsManagerStyled = () => {
  const [skills, setSkills] = useState([]);
  const [selectedCat, setSelectedCat] = useState("Frontend");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    nivel: 0,
  });

  const skillsCollection = collection(db, "Habilidades");

  /* 🔥 Cargar habilidades */
  const fetchSkills = async () => {
    const snapshot = await getDocs(skillsCollection);
    const data = snapshot.docs.map((docu) => ({
      id: docu.id,
      ...docu.data(),
    }));
    setSkills(data);
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  /* 📝 Inputs */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({ nombre: "", descripcion: "", nivel: 0 });
    setEditingId(null);
    setShowForm(false);
  };

  /* ➕ Agregar / ✏️ Actualizar */
  const handleAddOrUpdate = async (e) => {
    e.preventDefault();

    if (!formData.nombre.trim()) {
      alert("El nombre es obligatorio");
      return;
    }

    const dataToSave = {
      ...formData,
      categoria: selectedCat,
    };

    if (editingId) {
      await updateDoc(doc(db, "Habilidades", editingId), dataToSave);
    } else {
      await addDoc(skillsCollection, dataToSave);
    }

    resetForm();
    fetchSkills();
  };

  /* ✏️ Editar */
  const handleEdit = (skill) => {
    setFormData({
      nombre: skill.nombre,
      descripcion: skill.descripcion,
      nivel: skill.nivel,
    });
    setSelectedCat(skill.categoria);
    setEditingId(skill.id);
    setShowForm(true);
  };

  /* 🗑️ Eliminar */
  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar esta habilidad?")) return;
    await deleteDoc(doc(db, "Habilidades", id));
    fetchSkills();
  };

  return (
    <div className="p-6 bg-pink-50 rounded-xl shadow-lg border border-pink-200">
      <h2 className="text-2xl font-bold text-pink-600 mb-6">
        🛠️ Gestión de Habilidades
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
        {/* 🌸 CATEGORÍAS */}
        <div className="bg-white p-4 rounded-xl border border-pink-100 shadow-sm">
          <h3 className="font-semibold mb-3">Categorías</h3>
          <div className="flex flex-col gap-2">
            {CATEGORIAS.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCat(cat);
                  setShowForm(false);
                  setEditingId(null);
                }}
                className={`p-2 rounded-lg text-sm font-medium ${
                  selectedCat === cat
                    ? "bg-pink-100 border border-pink-300"
                    : "hover:bg-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 💖 HABILIDADES */}
        <div>
          <div className="bg-white p-6 rounded-xl border border-pink-100 shadow-sm mb-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">
                {selectedCat}
              </h3>

              <button
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-2 rounded-md text-sm"
              >
                + Agregar Habilidad
              </button>
            </div>

            {showForm && (
              <form
                onSubmit={handleAddOrUpdate}
                className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3"
              >
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  placeholder="Nombre"
                  className="p-2 border rounded"
                  required
                />
                <input
                  type="number"
                  name="nivel"
                  value={formData.nivel}
                  onChange={handleInputChange}
                  placeholder="Nivel (%)"
                  className="p-2 border rounded"
                  min={0}
                  max={100}
                />
                <input
                  type="text"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                  placeholder="Descripción"
                  className="p-2 border rounded"
                />

                <div className="md:col-span-3 flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 bg-pink-500 text-white py-2 rounded"
                  >
                    {editingId ? "Actualizar" : "Agregar"}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 bg-gray-300 py-2 rounded"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* 📋 LISTA */}
          <div className="space-y-4">
            {skills
              .filter((s) => s.categoria === selectedCat)
              .map((skill) => (
                <div
                  key={skill.id}
                  className="bg-white p-4 rounded-xl border shadow flex justify-between"
                >
                  <div>
                    <p className="font-semibold text-pink-600">
                      {skill.nombre}
                    </p>
                    <p className="text-xs text-gray-500">
                      {skill.descripcion}
                    </p>
                    <p className="text-xs text-gray-700">
                      Nivel: {skill.nivel}%
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(skill)}
                      className="px-3 py-1 bg-yellow-400 rounded text-sm"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(skill.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded text-sm"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsManagerStyled;
