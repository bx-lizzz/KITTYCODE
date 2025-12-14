// src/dashboard/TeamMemberManager.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const TeamMemberManager = () => {
  const [team, setTeam] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    role: "",
    bio: "",
    skills: "",
    currentFocus: "",
    funFact: "",
    linkedin: "",
    github: "",
    email: "",
  });

  // LOAD TEAM MEMBERS
  const fetchTeam = async () => {
    try {
      const snapshot = await getDocs(collection(db, "teamMembers"));
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setTeam(data);
    } catch (error) {
      console.error("Error loading team:", error);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  // SUBMIT FORM (ADD OR UPDATE)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: form.name.trim(),
      role: form.role.trim(),
      bio: form.bio.trim(),
      skills: form.skills.split(",").map((s) => s.trim()),
      currentFocus: form.currentFocus.trim(),
      funFact: form.funFact.trim(),
      socialLinks: {
        linkedin: form.linkedin,
        github: form.github,
        email: form.email,
      },
    };

    try {
      if (editingId) {
        await updateDoc(doc(db, "teamMembers", editingId), payload);
        setEditingId(null);
      } else {
        await addDoc(collection(db, "teamMembers"), payload);
      }

      setForm({
        name: "",
        role: "",
        bio: "",
        skills: "",
        currentFocus: "",
        funFact: "",
        linkedin: "",
        github: "",
        email: "",
      });

      fetchTeam();
    } catch (error) {
      console.error("Error saving member:", error);
    }
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
            <p style="margin-bottom: 1.5rem;">¿Estás segura de eliminar este miembro?</p>
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
      await deleteDoc(doc(db, "teamMembers", id));
      fetchTeam();
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  // EDIT
  const handleEdit = (m) => {
    setEditingId(m.id);
    setForm({
      name: m.name,
      role: m.role,
      bio: m.bio,
      skills: m.skills.join(", "),
      currentFocus: m.currentFocus,
      funFact: m.funFact,
      linkedin: m.socialLinks.linkedin || "",
      github: m.socialLinks.github || "",
      email: m.socialLinks.email || "",
    });
  };

  // CANCEL
  const handleCancel = () => {
    setEditingId(null);
    setForm({
      name: "",
      role: "",
      bio: "",
      skills: "",
      currentFocus: "",
      funFact: "",
      linkedin: "",
      github: "",
      email: "",
    });
  };

  return (
    <div className="bg-pink-50 p-8 rounded-2xl shadow-xl border border-pink-200">
      <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">
        🐾 Administrar Miembros del Equipo
      </h2>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input
          type="text"
          placeholder="Nombre"
          required
          className="p-3 rounded-lg border border-pink-300"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="text"
          placeholder="Rol"
          required
          className="p-3 rounded-lg border border-pink-300"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        />

        <textarea
          placeholder="Biografía"
          required
          className="p-3 rounded-lg border border-pink-300 md:col-span-2"
          value={form.bio}
          onChange={(e) => setForm({ ...form, bio: e.target.value })}
        ></textarea>

        <input
          type="text"
          placeholder="Skills (separadas por coma)"
          className="p-3 rounded-lg border border-pink-300 md:col-span-2"
          value={form.skills}
          onChange={(e) => setForm({ ...form, skills: e.target.value })}
        />

        <input
          type="text"
          placeholder="Enfoque actual"
          className="p-3 rounded-lg border border-pink-300 md:col-span-2"
          value={form.currentFocus}
          onChange={(e) =>
            setForm({ ...form, currentFocus: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Dato curioso"
          className="p-3 rounded-lg border border-pink-300 md:col-span-2"
          value={form.funFact}
          onChange={(e) => setForm({ ...form, funFact: e.target.value })}
        />

        <h3 className="text-pink-600 font-semibold md:col-span-2 mt-4">
          🌐 Redes sociales
        </h3>

        <input
          type="text"
          placeholder="LinkedIn"
          className="p-3 rounded-lg border border-pink-300"
          value={form.linkedin}
          onChange={(e) =>
            setForm({ ...form, linkedin: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="GitHub"
          className="p-3 rounded-lg border border-pink-300"
          value={form.github}
          onChange={(e) =>
            setForm({ ...form, github: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Email"
          className="p-3 rounded-lg border border-pink-300"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        {/* BUTTONS */}
        <div className="mt-4 flex gap-3 md:col-span-2">
          <motion.button
            whileHover={{ scale: 1.05, y: -3 }}
            className="flex-1 bg-pink-500 text-white py-3 rounded-lg"
            type="submit"
          >
            {editingId ? "Actualizar Miembro" : "Agregar Miembro"}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -3 }}
            type="button"
            onClick={handleCancel}
            className="flex-1 bg-gray-400 text-white py-3 rounded-lg"
          >
            Cancelar
          </motion.button>
        </div>
      </form>

      {/* LIST */}
      <div className="space-y-4 mt-8">
        {team.map((m) => (
          <motion.div
            key={m.id}
            className="bg-white p-4 border border-pink-200 rounded-xl shadow-sm flex justify-between cursor-grab"
            drag
            dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
            }}
          >
            <div>
              <p className="font-bold text-pink-600">{m.name}</p>
              <p className="text-sm text-gray-600">{m.role}</p>
              <p className="text-gray-500 text-xs mt-1">{m.bio}</p>
            </div>

            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => handleEdit(m)}
                className="px-3 py-1 bg-yellow-400 text-black rounded-lg"
              >
                Editar
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => handleDelete(m.id)}
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

export default TeamMemberManager;

