// src/pages/Team.jsx
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Team = () => {
  const [team, setTeam] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [testimonials, setTestimonials] = useState([
    {
      id: "t1",
      name: "Ana Pérez",
      role: "Mentora de Frontend",
      company: "TechGirls",
      content: "Trabajar con Kitty Code ha sido una experiencia inspiradora.",
      rating: 5,
    },
    {
      id: "t2",
      name: "María López",
      role: "Diseñadora UX/UI",
      company: "CreativeHub",
      content: "Su dedicación y creatividad son impresionantes.",
      rating: 4,
    },
    {
      id: "t3",
      name: "Lucía Torres",
      role: "Desarrolladora Backend",
      company: "DevSolutions",
      content: "El equipo demuestra un gran talento y compromiso.",
      rating: 5,
    },
    {
      id: "t4",
      name: "Sofía Ramírez",
      role: "Project Manager",
      company: "Innovatech",
      content: "¡Siempre entregan resultados con calidad y pasión!",
      rating: 5,
    },
  ]);
  const [isLoading, setIsLoading] = useState(true);

  const teamRef = collection(db, "teamMembers");

  useEffect(() => {
    const unsubTeam = onSnapshot(teamRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTeam(data);
      setIsLoading(false);
    });

    return () => unsubTeam();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pink-50">
        <div className="text-center text-pink-500">
          <div className="w-16 h-16 border-4 border-pink-300 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Cargando al equipo Kitty Code...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-pink-50 min-h-screen">
      {/* HEADER */}
      <section className="bg-gradient-to-r from-pink-300 to-rose-200 text-white py-20 text-center shadow-md">
        <h1 className="text-4xl lg:text-5xl font-bold mb-4 drop-shadow-sm">
          Conoce a nuestro equipo
        </h1>
        <p className="text-lg text-white/90 max-w-2xl mx-auto">
          Somos un grupo de chicas apasionadas por la tecnología y el diseño 💖
        </p>
      </section>

      {/* TEAM MEMBERS */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-pink-600 mb-10 text-center">
          🌷 Nuestro Equipo
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {team.map((member) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <TeamMemberCard member={member} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 bg-white px-6">
        <h2 className="text-3xl font-bold text-pink-600 mb-10 text-center">
          💕 Lo que dicen de nosotras
        </h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TestimonialCard testimonial={t} />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

// 🌸 TARJETA DEL EQUIPO
const TeamMemberCard = ({ member }) => (
  <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all p-6 border border-pink-100 text-center">
    <div className="text-5xl mb-4">👩‍💻</div>
    <h3 className="text-xl font-semibold text-pink-600">{member.name}</h3>
    <p className="text-gray-600 font-medium mb-3">{member.role}</p>
    <p className="text-gray-500 text-sm mb-4">{member.bio}</p>

    <div className="flex flex-wrap justify-center gap-2 mb-4">
      {member.skills?.map((skill, i) => (
        <span
          key={i}
          className="bg-pink-100 text-pink-600 px-2 py-1 rounded-full text-xs font-semibold"
        >
          {skill}
        </span>
      ))}
    </div>

    <div className="bg-rose-50 p-3 rounded-lg text-sm text-gray-700 mb-3">
      🎯 <strong>Enfoque actual:</strong> {member.currentFocus}
    </div>

    <div className="bg-pink-50 p-3 rounded-lg text-sm text-gray-700 mb-4">
      ✨ <strong>Dato curioso:</strong> {member.funFact}
    </div>

    <div className="flex justify-center gap-4 text-xl text-pink-500">
      {member.socialLinks &&
        Object.entries(member.socialLinks).map(([platform, url]) => (
          <a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-125 transition-transform"
          >
            {getSocialIcon(platform)}
          </a>
        ))}
    </div>
  </div>
);

// 💬 TARJETA DE TESTIMONIO
const TestimonialCard = ({ testimonial }) => (
  <div className="bg-pink-50 border border-pink-100 rounded-2xl shadow-sm p-6">
    <p className="text-gray-700 italic mb-4">“{testimonial.content}”</p>
    <div className="text-right">
      <h4 className="font-semibold text-pink-600">{testimonial.name}</h4>
      <p className="text-sm text-gray-600">{testimonial.role}</p>
      <p className="text-xs text-gray-500">{testimonial.company}</p>
      <div className="text-yellow-400 mt-1">
        {"⭐".repeat(testimonial.rating)}
      </div>
    </div>
  </div>
);

const getSocialIcon = (platform) => {
  const icons = { linkedin: "💼", github: "📚", behance: "🎨", email: "📧" };
  return icons[platform] || "🔗";
};

export default Team;


