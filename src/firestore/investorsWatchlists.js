import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../config/firebase";

// Add item to watchlist
export async function addInvestorToWatchlist(userId, investorId) {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
        investorWatchlist: arrayUnion(investorId),
    });
}

// Remove item from watchlist
export async function removeInvestorFromWatchlist(userId, investorId) {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
        investorWatchlist: arrayRemove(investorId),
    });
}

// Fetch user's watchlist
export async function getUserInvestorWatchlist(userId) {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
        return userDoc.data().investorWatchlist || []; 
    } else {
        throw new Error("User document not found");
    }
}
