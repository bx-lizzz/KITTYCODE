// src/pages/Skills.jsx
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

import {
  SiReact,
  SiNodedotjs,
  SiPython,
  SiTailwindcss,
  SiPostgresql,
  SiFigma,
} from "react-icons/si";
import { FaCode, FaLightbulb, FaUsers } from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Skills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      const skillsCollection = collection(db, "Habilidades");
      const snapshot = await getDocs(skillsCollection);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      // Agrupar por categoría para UI
      const grouped = data.reduce((acc, skill) => {
        const catIndex = acc.findIndex((c) => c.categoria === skill.categoria);
        if (catIndex !== -1) {
          acc[catIndex].habilidades.push(skill);
        } else {
          acc.push({ categoria: skill.categoria, habilidades: [skill] });
        }
        return acc;
      }, []);
      setSkills(grouped);
    };

    fetchSkills();
  }, []);

  return (
    <div className="py-16 bg-pink-50">
      {/* Encabezado */}
      <section className="bg-pink-300 text-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-6">Habilidades de Kitty Code 💻</h1>
        <p className="text-xl max-w-2xl mx-auto">
          Aquí mostramos las competencias de nuestro equipo en desarrollo y diseño,
          combinando creatividad y tecnología para entregar los mejores proyectos 💕.
        </p>
      </section>

      {/* Cartillas */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 mt-12">
        {skills.map((categoria, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all p-6 border border-pink-100 transform hover:-translate-y-1 hover:scale-105"
          >
            <h2 className="text-2xl font-semibold text-pink-600 mb-4 text-center bg-pink-100 rounded-xl py-2 px-4 inline-block">
              {categoria.categoria}
            </h2>

            {categoria.habilidades.map((hab) => (
              <div key={hab.id} className="mb-5">
                <div className="flex items-center gap-2 mb-1">
                  {getIcono(hab.nombre)}
                  <h3 className="font-semibold text-gray-800">{hab.nombre}</h3>
                </div>

                <div className="w-full bg-pink-100 rounded-full h-3 mb-2 overflow-hidden">
                  <motion.div
                    className="bg-pink-400 h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${hab.nivel}%` }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                  ></motion.div>
                </div>
                <p className="text-sm text-gray-600">{hab.descripcion}</p>
              </div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Pie */}
      <section className="mt-16 text-center">
        <p className="text-gray-700 text-lg">
          💕 Siempre aprendiendo, mejorando y creando con pasión.
        </p>
      </section>
    </div>
  );
};

// Iconos según el nombre de la habilidad
const getIcono = (nombre) => {
  const iconProps = { size: 24, className: "text-pink-500" };
  const iconos = {
    React: <SiReact {...iconProps} />,
    TailwindCSS: <SiTailwindcss {...iconProps} />,
    "Node.js": <SiNodedotjs {...iconProps} />,
    PostgreSQL: <SiPostgresql {...iconProps} />,
    Python: <SiPython {...iconProps} />,
    Figma: <SiFigma {...iconProps} />,
    Creatividad: <FaLightbulb {...iconProps} />,
    "Trabajo en equipo": <FaUsers {...iconProps} />,
  };
  return iconos[nombre] || <FaCode {...iconProps} />;
};

export default Skills;
