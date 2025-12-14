// src/services/auth.js
import { auth } from "../firebase";
import { 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup,
  signOut
} from "firebase/auth";

// LOGIN CON EMAIL
export function signInWithEmail(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

// LOGIN CON GOOGLE
export function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}

// LOGOUT
export function logout() {
  return signOut(auth);
}
