import { db } from "../firebase";
import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc 
} from "firebase/firestore";

// Nombre de colección
const COLLECTION = "teamMembers";

// CREATE
export const createMember = async (data) => {
  const docRef = await addDoc(collection(db, COLLECTION), data);
  return docRef.id;
};

// READ
export const getMembers = async () => {
  const querySnapshot = await getDocs(collection(db, COLLECTION));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// UPDATE
export const updateMember = async (id, newData) => {
  const docRef = doc(db, COLLECTION, id);
  await updateDoc(docRef, newData);
};

// DELETE
export const deleteMember = async (id) => {
  const docRef = doc(db, COLLECTION, id);
  await deleteDoc(docRef);
};
