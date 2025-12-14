import { useState, useEffect } from "react";
import projectsData from "../data/projects.json";

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    "all",
    ...new Set(projects.map((project) => project.category)),
  ];

  useEffect(() => {
    setTimeout(() => {
      setProjects(projectsData);
      setFilteredProjects(projectsData);
      setIsLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((project) => project.category === activeFilter)
      );
    }
  }, [activeFilter, projects]);

  const handleButtonClick = (category) => {
    setActiveFilter(category);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pink-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-pink-600 font-medium">Cargando proyectos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-pink-50">
      {/* Encabezado */}
      <section className="bg-pink-300 text-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-6">Portafolio de Kitty Code 💻</h1>
        <p className="text-xl max-w-2xl mx-auto">
          Estos son algunos de los proyectos realizados por nuestro equipo de
          chicas programadoras: Besnaliz, Tatiana y Stefany 💕.
        </p>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-pink-100 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-pink-700 mb-4">
          El Impacto de Nuestros Proyectos
        </h2>
        <p className="text-lg text-pink-800 mb-12">
          Números que reflejan el valor que creamos para nuestros clientes y proyectos
        </p>

        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-4xl font-bold text-pink-500 mb-2">12+</h3>
            <p className="text-gray-700 font-medium">Proyectos Completados</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-4xl font-bold text-pink-500 mb-2">350+</h3>
            <p className="text-gray-700 font-medium">Usuarios Impactados</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-4xl font-bold text-pink-500 mb-2">100%</h3>
            <p className="text-gray-700 font-medium">Satisfacción del Cliente</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-4xl font-bold text-pink-500 mb-2">10K+</h3>
            <p className="text-gray-700 font-medium">Líneas de Código</p>
          </div>
        </div>
      </section>

      {/* Filtros */}
      <section className="py-8 bg-white border-b">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleButtonClick(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeFilter === category
                  ? "bg-pink-400 text-white shadow-md"
                  : "bg-pink-100 text-pink-700 hover:bg-pink-200"
              }`}
            >
              {category === "all" ? "Todos los proyectos" : category}
            </button>
          ))}
        </div>
      </section>

      {/* Proyectos */}
      <section className="py-16 bg-pink-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}

          {filteredProjects.length === 0 && (
            <div className="text-center text-gray-500">No hay proyectos.</div>
          )}
        </div>
      </section>
    </div>
  );
};

const ProjectCard = ({ project }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-pink-200 p-6 hover:shadow-2xl transition-all">
      <h3 className="text-xl font-semibold text-pink-600 mb-2">
        {project.title}
      </h3>
      <p className="text-gray-600 mb-2">
        <strong>Categoría:</strong> {project.category}
      </p>
      <p className="text-gray-700 mb-4">{project.description}</p>

      <p className="text-sm text-gray-500 mb-4">
        <strong>Equipo:</strong> {project.teamMembers.join(", ")}
      </p>

      <a
        href="/portafolio"
        className="inline-block mt-2 px-4 py-2 bg-pink-400 text-white rounded-full font-medium hover:bg-pink-500 transition-all"
      >
        Ver Nuestros Proyectos
      </a>
    </div>
  );
};

export default Portfolio;

