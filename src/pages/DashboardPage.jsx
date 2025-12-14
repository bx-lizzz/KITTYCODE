// src/pages/DashboardPage.jsx
import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import AuthForm from "../components/AuthForm";
import Dashboard from "../components/Dashboard";

const pageVariant = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const DashboardPage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-14 w-14 border-4 border-pink-400 border-t-transparent mx-auto mb-4"></div>
          <p className="text-pink-700 font-medium text-lg">Cargando Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div variants={pageVariant} initial="hidden" animate="visible" className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 p-6">
      {user ? (
        <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-2xl p-6 sm:p-10 border border-pink-100">
          <Dashboard />
        </div>
      ) : (
        <div className="max-w-lg mx-auto">
          <AuthForm />
        </div>
      )}
    </motion.div>
  );
};

export default DashboardPage;
