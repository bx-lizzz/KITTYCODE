/* eslint-disable react-refresh/only-export-components */
// src/contexts/AuthContext.jsx

import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuth debe usarse dentro de <AuthProvider>. Verifica tu main.jsx."
    );
  }
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState("visitor");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cuando cambia el estado del usuario en Firebase
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      // ⭐ Definir el rol del usuario
      if (currentUser?.email === "admin@gmail.com") {
        setUserRole("admin");
      } else if (currentUser) {
        setUserRole("team");
      } else {
        setUserRole("visitor");
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    userRole,
    loading,
    isAuthenticated: !!user,
    isAdmin: userRole === "admin",
    isTeam: userRole === "team" || userRole === "admin",
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

