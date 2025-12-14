import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const UserProfile = () => {
  const initialUser = {
    name: "Lider del Equipo",
    role: "Administradora",
    bio: "Apasionada por crear experiencias digitales intuitivas.",
    skills: [
      "Figma",
      "Illustrator",
      "React",
      "Comunicación",
      "Investigación",
      "Educación en salud",
    ],
    currentFocus:
      "Estudiando la carrera de enfermería y desarrollando proyectos educativos.",
    funFact:
      "1. Organizar la sección de opiniones😁,2. Editar los proyectos del grupo🌟,3. Verificar y revisar la info de todo el grupo😑",
    socialLinks: {
      linkedin: "https://www.linkedin.com/",
      github: "https://github.com/",
    },
  };

  const [user, setUser] = useState(initialUser);
  const [editing, setEditing] = useState(false);
  const [tempUser, setTempUser] = useState(initialUser);

  const handleChange = (field, value) => {
    setTempUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleSocialChange = (platform, value) => {
    setTempUser((prev) => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [platform]: value },
    }));
  };

  const handleSkillChange = (index, value) => {
    const newSkills = [...tempUser.skills];
    newSkills[index] = value;
    setTempUser((prev) => ({ ...prev, skills: newSkills }));
  };

  const handleAddSkill = () => {
    setTempUser((prev) => ({ ...prev, skills: [...prev.skills, ""] }));
  };

  const handleRemoveSkill = (index) => {
    const newSkills = tempUser.skills.filter((_, i) => i !== index);
    setTempUser((prev) => ({ ...prev, skills: newSkills }));
  };

  const handleSave = () => {
    setUser(tempUser);
    setEditing(false);
  };

  const handleCancel = () => {
    setTempUser(user);
    setEditing(false);
  };

  return (
    <div className="bg-pink-50 min-h-screen py-16 px-6 flex justify-center">
      <motion.div
        className="w-full max-w-4xl bg-white rounded-2xl shadow-md p-8 border border-pink-100 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Emoji superior */}
        <motion.div
          className="text-7xl mb-4 cursor-pointer"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, repeatDelay: 5, duration: 2 }}
          whileHover={{ rotate: [0, 20, -20, 0], scale: 1.2 }}
        >
          👩‍💻
        </motion.div>

        {/* Nombre y rol */}
        {editing ? (
          <motion.div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
            <motion.div className="flex-1" whileHover={{ scale: 1.02 }}>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Nombre
              </label>
              <motion.input
                className="text-2xl font-bold text-pink-600 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400 transition-all"
                value={tempUser.name}
                onChange={(e) => handleChange("name", e.target.value)}
                whileFocus={{ scale: 1.02 }}
              />
            </motion.div>
            <motion.div className="flex-1" whileHover={{ scale: 1.02 }}>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Rol
              </label>
              <motion.input
                className="text-lg text-gray-700 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400 transition-all"
                value={tempUser.role}
                onChange={(e) => handleChange("role", e.target.value)}
                whileFocus={{ scale: 1.02 }}
              />
            </motion.div>
          </motion.div>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-pink-600 mb-1">{user.name}</h1>
            <p className="text-gray-600 font-medium mb-3">{user.role}</p>
          </>
        )}

        {/* Bio */}
        <motion.div
          className="mb-4 text-left"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {editing ? (
            <>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Biografía
              </label>
              <motion.textarea
                className="text-gray-500 text-sm mb-4 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400 transition-all"
                value={tempUser.bio}
                onChange={(e) => handleChange("bio", e.target.value)}
                whileFocus={{ scale: 1.01 }}
              />
            </>
          ) : (
            <p className="text-gray-500 text-sm mb-6">{user.bio}</p>
          )}
        </motion.div>

        {/* Skills */}
        <motion.div
          className="mb-4 text-left"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Habilidades
          </label>
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            {editing
              ? tempUser.skills.map((skill, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.1 }}
                  >
                    <input
                      className="px-4 py-2 border rounded-lg text-sm font-medium"
                      value={skill}
                      onChange={(e) => handleSkillChange(i, e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(i)}
                      className="text-red-500 font-bold transition-transform hover:scale-125"
                    >
                      ×
                    </button>
                  </motion.div>
                ))
              : user.skills.map((skill, i) => (
                  <motion.span
                    key={i}
                    className="bg-pink-100 text-pink-600 px-4 py-2 rounded-full text-sm font-semibold cursor-default"
                    whileHover={{ scale: 1.1 }}
                  >
                    {skill}
                  </motion.span>
                ))}
          </div>
          {editing && (
            <motion.button
              type="button"
              onClick={handleAddSkill}
              className="mt-2 px-3 py-1 bg-pink-200 text-pink-600 rounded-md text-xs transition-all hover:bg-pink-300"
              whileHover={{ scale: 1.05 }}
            >
              + Agregar skill
            </motion.button>
          )}
        </motion.div>

        {/* Enfoque actual */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {editing ? (
            <>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Enfoque actual
              </label>
              <motion.textarea
                className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-pink-400"
                value={tempUser.currentFocus}
                onChange={(e) => handleChange("currentFocus", e.target.value)}
                whileFocus={{ scale: 1.01 }}
              />
            </>
          ) : (
            <div className="bg-rose-50 p-4 rounded-lg text-sm text-gray-700 mb-4 hover:scale-105 transition-transform">
              🎯 <strong>Enfoque actual:</strong> {user.currentFocus}
            </div>
          )}
        </motion.div>

        {/* Fun Fact */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {editing ? (
            <>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Apuntes / Fun Fact
              </label>
              <motion.textarea
                className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-pink-400"
                value={tempUser.funFact}
                onChange={(e) => handleChange("funFact", e.target.value)}
                whileFocus={{ scale: 1.01 }}
              />
            </>
          ) : (
            <div className="bg-pink-50 p-4 rounded-lg text-sm text-gray-700 mb-6 hover:scale-105 transition-transform">
              ✨ <strong>Apuntes:</strong> {user.funFact}
            </div>
          )}
        </motion.div>

        {/* Redes */}
        <motion.div
          className="flex justify-center gap-6 text-2xl text-pink-500 mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {Object.entries(user.socialLinks).map(([platform, url]) =>
            editing ? (
              <motion.div
                key={platform}
                className="flex flex-col items-center text-sm"
                whileHover={{ scale: 1.05 }}
              >
                <label className="mb-1 font-semibold">{platform}</label>
                <input
                  type="url"
                  value={tempUser.socialLinks[platform]}
                  onChange={(e) => handleSocialChange(platform, e.target.value)}
                  className="w-28 px-2 py-1 border rounded-md text-xs"
                />
              </motion.div>
            ) : (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-125 transition-transform"
              >
                {getSocialIcon(platform)}
              </a>
            )
          )}
        </motion.div>

        {/* Botones */}
        <motion.div
          className="flex justify-center gap-4 mt-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {editing ? (
            <>
              <motion.button
                onClick={handleSave}
                className="px-6 py-2 bg-pink-500 text-white rounded-lg font-semibold hover:bg-pink-600"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Guardar
              </motion.button>
              <motion.button
                onClick={handleCancel}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Cancelar
              </motion.button>
            </>
          ) : (
            <motion.button
              onClick={() => setEditing(true)}
              className="px-6 py-2 bg-pink-400 text-white rounded-lg font-semibold hover:bg-pink-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Editar Perfil
            </motion.button>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

const getSocialIcon = (platform) => {
  const icons = {
    linkedin: "💼",
    github: "📚",
  };
  return icons[platform] || "🔗";
};

export default UserProfile;





