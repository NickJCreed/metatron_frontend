import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

// Update user's subscription type
export async function updateSubscription(userId, subscriptionType) {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
        subscription: subscriptionType,
    });
}
