// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuración de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAzYK2G8yowlacbFnoKC436DfHmssRzxvE",
  authDomain: "kittycode-91fc2.firebaseapp.com",
  projectId: "kittycode-91fc2",
  storageBucket: "kittycode-91fc2.appspot.com",
  messagingSenderId: "414720487681",
  appId: "1:414720487681:web:5dfadac553217436eeeb00"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta Auth, Firestore y proveedor de Google
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Export default app (opcional)
export default app;

