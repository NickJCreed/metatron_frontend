import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

// Add or update user
export async function saveUser(userId, userData) {
    const userRef = doc(db, "users", userId);
    await setDoc(userRef, userData, { merge: true });
}

// Fetch user data
export async function getUser(userId) {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    return userDoc.exists() ? userDoc.data() : null;
}

// Update user data
export async function updateUser(userId, updates) {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, updates);
}
