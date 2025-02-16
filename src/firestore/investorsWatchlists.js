import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../config/firebase";

// Add item to watchlist
export async function addInvestorToWatchlist(userId, investorId) {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
        watchlist: arrayUnion(investorId),
    });
}

// Remove item from watchlist
export async function removeInvestorFromWatchlist(userId, investorId) {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
        watchlist: arrayRemove(investorId),
    });
}
