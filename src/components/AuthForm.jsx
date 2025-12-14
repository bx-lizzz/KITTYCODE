import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

// IMPORTS CORRECTOS SEGÚN auth.js
import { 
  signInWithEmail, 
  signInWithGoogle 
} from "../services/auth";

function AuthForm() {
  const navigate = useNavigate();

  const [mode, setMode] = useState("admin");
  const [form, setForm] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const getDashboardRoute = () =>
    mode === "admin"
      ? "/Dashboard"
      : mode === "team"
      ? "/MemberDashboard"
      : "/DashboardCliente";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await signInWithEmail(form.email, form.password);
      navigate(getDashboardRoute());
    } catch (err) {
      console.error(err);
      let msg = "Ocurrió un error. Verifica tus datos.";
      if (err.message.includes("Invalid login credentials")) {
        msg = "Correo o contraseña incorrectos.";
      }
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setSubmitting(true);
    try {
      await signInWithGoogle();
      navigate(getDashboardRoute());
    } catch (err) {
      console.error(err);
      setError("No se pudo iniciar sesión con Google.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-rose-200 flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-3xl shadow-lg border border-pink-200 p-8 relative"
      >

        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-400 to-rose-400 w-20 h-20 rounded-full shadow flex items-center justify-center">
          <span className="text-white text-4xl">🐾</span>
        </div>

        <h1 className="text-2xl font-bold text-pink-700 text-center mt-10">
          Bienvenida a Kitty Code 🐱
        </h1>
        <p className="text-xs text-pink-500 text-center mb-6">
          Acceso seguro para el equipo ✨
        </p>

        {/* Switch */}
        <div className="flex gap-2 mb-6 text-xs font-medium">
          {["admin", "team", "client"].map((m) => (
            <motion.button
              key={m}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex-1 py-2 rounded-full border transition ${
                mode === m 
                  ? "bg-pink-600 text-white border-pink-600 shadow" 
                  : "border-pink-300 text-pink-600"
              }`}
              onClick={() => setMode(m)}
            >
              {m === "admin" ? "Administrador" : m === "team" ? "Miembro del equipo" : "Cliente"}
            </motion.button>
          ))}
        </div>

        {error && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4 text-xs text-rose-600 bg-rose-50 border border-rose-200 rounded-md px-3 py-2"
          >
            {error}
          </motion.p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div whileFocus={{ scale: 1.02 }}>
            <label className="block text-xs font-medium text-pink-700 mb-1">Correo</label>
            <motion.input
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              required
              className="w-full border border-pink-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-pink-400"
              whileFocus={{ scale: 1.02 }}
            />
          </motion.div>

          <motion.div whileFocus={{ scale: 1.02 }}>
            <label className="block text-xs font-medium text-pink-700 mb-1">Contraseña</label>
            <motion.input
              type="password"
              name="password"
              value={form.password}
              onChange={onChange}
              required
              className="w-full border border-pink-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-pink-400"
              whileFocus={{ scale: 1.02 }}
            />
          </motion.div>

          <motion.button
            type="submit"
            disabled={submitting}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white text-sm font-semibold shadow hover:opacity-90 transition disabled:opacity-60"
          >
            {submitting ? "Procesando…" : "Entrar"}
          </motion.button>
        </form>

        <motion.button
          type="button"
          disabled={submitting}
          onClick={handleGoogleLogin}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-3 rounded-xl border border-pink-300 mt-4 flex items-center justify-center gap-2 text-sm text-pink-700 hover:bg-pink-50 transition disabled:opacity-60"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="w-5 h-5"
            alt="Google"
          />
          Iniciar sesión con Google
        </motion.button>
      </motion.div>
    </div>
  );
}

export default AuthForm;
