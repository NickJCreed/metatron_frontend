import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../config/firebase";

// Add item to watchlist
export async function addStartupToWatchList(userId, startupId) {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
        startupWatchlist: arrayUnion(startupId),
    });
}

// Remove item from watchlist
export async function removeStartupFromWatchlist(userId, startupId) {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
        startupWatchlist: arrayRemove(startupId),
    });
}

// Fetch user's watchlist
export async function getUserStartupWatchlist(userId) {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
        return userDoc.data().startupWatchlist || []; 
    } else {
        throw new Error("User document not found");
    }
}
