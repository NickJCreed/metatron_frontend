import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../config/firebase";

// Add item to watchlist
export async function addStartupToWatchList(userId, startupId) {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
        watchlist: arrayUnion(startupId),
    });
}

// Remove item from watchlist
export async function removeStartupFromWatchlist(userId, startupId) {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
        watchlist: arrayRemove(startupId),
    });
}
