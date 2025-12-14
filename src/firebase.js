// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrMgrKVoRrmvao4QSy-3-T896n6VFNNDQ",
  authDomain: "mi-app-holi.firebaseapp.com",
  projectId: "mi-app-holi",
  storageBucket: "mi-app-holi.firebasestorage.app",
  messagingSenderId: "511502008091",
  appId: "1:511502008091:web:81f58b34becc38e82f9dbe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth
export const auth = getAuth(app);

// Export Firestore
export const db = getFirestore(app);

// Default export
export default app;
