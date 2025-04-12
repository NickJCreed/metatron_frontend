import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

// Update user's subscription type
export async function updateSubscription(userId, subscriptionType) {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
        subscription: subscriptionType,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Set expiration to 30 days from now
    });
}
