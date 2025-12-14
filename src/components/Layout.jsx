import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Inicio", href: "/" },
    { name: "Nosotras", href: "/nosotras" },
    { name: "Portafolio", href: "/portfolio" },
    { name: "Habilidades", href: "/habilidades" },
    { name: "Contacto", href: "/contacto" },
    // 🌸 Agregado aquí:
    { name: "Dashboard", href: "/dashboard" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-pink-50 transition-colors duration-500">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50 transition-colors duration-500">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-rose-400 rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg">🐾</span>
                </div>
                <span className="font-bold text-xl text-pink-600">
                  Kitty Code
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? "text-pink-500 border-b-2 border-pink-400"
                      : "text-gray-600 hover:text-pink-500"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-pink-500 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                      isActive(item.href)
                        ? "text-pink-500 bg-pink-50 rounded-md"
                        : "text-gray-600 hover:text-pink-500 hover:bg-gray-50 rounded-md"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 transition-colors duration-500">{children}</main>

      {/* Footer */}
      <footer className="bg-pink-500 text-white py-10 mt-12 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Logo y descripción */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-pink-500 text-lg">🐾</span>
                </div>
                <span className="font-bold text-xl text-white">
                  Kitty Code
                </span>
              </div>
              <p className="text-pink-50 mb-3 text-sm leading-relaxed">
                Somos Kitty Code, un grupo donde integramos el arte y la
                computación creando diseños web únicos con estilo propio y
                dinámico. Cada línea de código lleva un toque de creatividad y
                corazón 💕.
              </p>
              <div className="flex space-x-4 text-lg">
                <a href="#" className="hover:text-white/80 transition-colors">
                  🐱
                </a>
                <a href="#" className="hover:text-white/80 transition-colors">
                  💻
                </a>
                <a href="#" className="hover:text-white/80 transition-colors">
                  ✨
                </a>
              </div>
            </div>

            {/* Enlaces rápidos */}
            <div>
              <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide">
                Enlaces
              </h4>
              <ul className="space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-pink-50 hover:text-white transition-colors text-sm"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contacto */}
            <div>
              <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide">
                Contacto
              </h4>
              <ul className="space-y-1 text-pink-50 text-sm">
                <li>📧 hola@kittycode.dev</li>
                <li>💖 proyectos@kittycode.dev</li>
                <li>🌸 contacto@kittycode.dev</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-pink-400 mt-8 pt-6 text-center">
            <p className="text-pink-50 text-sm">
              © 2025 Kitty Code 🐾 | Todos los derechos reservados.
            </p>
            <p className="text-xs text-pink-100 mt-1">
              “Donde el arte y el código se unen con amor y creatividad.” 💗
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

