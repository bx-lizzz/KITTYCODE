import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import teamData from "../data/team.json";

const Home = () => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStats = () => {
      setTimeout(() => {
        setStats(teamData.stats);
        setIsLoading(false);
      }, 1000);
    };
    loadStats();
  }, []);

      { /* Pantalla de carga */ }
      { /* Mientras isLoading está en true, se muestra una pequeña animación con un círculo que gira y un mensaje que dice “Cargando…”. */}
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pink-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-pink-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-pink-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-200 to-pink-300 text-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-pink-800">
                Construyendo el futuro con
                <span className="block text-pink-600">
                  código y creatividad
                </span>
              </h1>
              <p className="text-lg lg:text-xl mb-8 text-pink-700">
                Somos <strong>Kitty Code</strong>, un grupo de chicas
                programadoras apasionadas por crear soluciones tecnológicas con
                estilo y corazón.
              </p>

              {/* Hay dos botones con Link */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/portfolio"
                  className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold text-center transition"
                >
                  Ver Nuestros Proyectos
                </Link>
                <Link
                  to="/nosotras"
                  className="bg-white text-pink-600 border border-pink-400 hover:bg-pink-100 px-6 py-3 rounded-lg font-semibold text-center transition"
                >
                  Conocer al Equipo
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="w-full h-96 bg-white/20 rounded-2xl backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-8xl mb-4">🐱</div>
                    <p className="text-xl text-pink-50">Equipo Kitty Code</p>
                  </div>
                </div>
                {/* Decoraciones */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-pink-300 rounded-full"></div>
                <div className="absolute top-1/2 -left-6 w-6 h-6 bg-pink-400 rounded-full"></div>
                <div className="absolute -bottom-6 left-1/3 w-10 h-10 bg-pink-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Estadísticas */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-pink-700 mb-4">
              Nuestro Impacto
            </h2>
            <p className="text-lg text-pink-500">
              Cada proyecto refleja pasión, dedicación y amor por el código 💖
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-6 gap-8">
            <Stat label="Proyectos" value={stats.projectsCompleted} />
            <Stat label="Clientes Felices" value={stats.clientsSatisfied} />
            <Stat label="Años" value={stats.yearsExperience} />
            <Stat label="Integrantes" value={stats.teamMembers} />
            <Stat label="Líneas de Código" value={stats.linesOfCode} />
            <Stat label="Tazas de Café ☕" value={stats.cupsOfCoffee} />
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-16 bg-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-pink-700 mb-4">
              Nuestros Valores
            </h2>
            <p className="text-lg text-pink-600">
              Lo que nos impulsa en cada proyecto ✨
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ValueCard
              emoji="🚀"
              title="Innovación"
              text="Nos encanta aprender y aplicar nuevas tecnologías para crear proyectos únicos."
            />
            <ValueCard
              emoji="🤝"
              title="Trabajo en Equipo"
              text="Cada una aporta su talento y juntas creamos soluciones con amor."
            />
            <ValueCard
              emoji="💡"
              title="Creatividad"
              text="El arte y la lógica se unen para dar vida a nuestras ideas más locas."
            />
          </div>
        </div>
      </section>

      {/* Llamado a la acción */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-pink-700 mb-6">
          ¿Lista para crear algo increíble?
        </h2>
        <p className="text-lg text-pink-500 mb-8">
          Cuéntanos tu idea y hagamos realidad tu proyecto 💕
        </p>
        {/* Hay dos botones con Link */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/contacto"
            className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Conversemos
          </Link>
          <Link
            to="/portfolio"
            className="bg-white text-pink-600 border border-pink-400 hover:bg-pink-100 px-6 py-3 rounded-lg font-semibold transition"
          >
            Ver Nuestros Proyectos
          </Link>
        </div>
      </section>
    </div>
  );
};

const Stat = ({ label, value }) => (
  <div className="text-center">
    <div className="text-4xl font-bold text-pink-600 mb-2">{value}+</div>
    <p className="text-pink-500 font-medium">{label}</p>
  </div>
);

const ValueCard = ({ emoji, title, text }) => (
  <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition">
    <div className="text-5xl mb-4">{emoji}</div>
    <h3 className="text-xl font-bold text-pink-600 mb-3">{title}</h3>
    <p className="text-pink-500">{text}</p>
  </div>
);

export default Home;
