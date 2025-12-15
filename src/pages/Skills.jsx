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

const Skills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      const snapshot = await getDocs(collection(db, "Habilidades"));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // 🔒 SOLO habilidades con categoría válida
      const filtered = data.filter(
        (s) => s.categoria && s.categoria.trim() !== ""
      );

      const grouped = filtered.reduce((acc, skill) => {
        const index = acc.findIndex(
          (c) => c.categoria === skill.categoria
        );

        if (index !== -1) {
          acc[index].habilidades.push(skill);
        } else {
          acc.push({
            categoria: skill.categoria,
            habilidades: [skill],
          });
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
        <h1 className="text-4xl font-bold mb-6">
          Habilidades de Kitty Code 💻
        </h1>
        <p className="text-xl max-w-2xl mx-auto">
          Competencias técnicas y humanas de nuestro equipo 💕
        </p>
      </section>

      {/* Categorías */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 mt-12">
        {skills.map((cat, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-md p-6 border border-pink-100"
          >
            <h2 className="text-2xl font-semibold text-pink-600 mb-4 text-center bg-pink-100 rounded-xl py-2">
              {cat.categoria}
            </h2>

            {cat.habilidades.map((hab) => (
              <div key={hab.id} className="mb-5">
                <div className="flex items-center gap-2 mb-1">
                  {getIcono(hab.nombre)}
                  <h3 className="font-semibold">{hab.nombre}</h3>
                </div>

                <div className="w-full bg-pink-100 rounded-full h-3 mb-2">
                  <div
                    className="bg-pink-400 h-3 rounded-full"
                    style={{ width: `${hab.nivel}%` }}
                  />
                </div>

                <p className="text-sm text-gray-600">
                  {hab.descripcion}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>

      <p className="text-center mt-16 text-gray-700">
        💕 Siempre aprendiendo y creando
      </p>
    </div>
  );
};

// 🎨 Iconos
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
