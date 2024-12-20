import { db } from "@/firebase";
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

interface UserData {
  subscription?: string;
  role?: "Investor" | "Founder" | "Connector";
  watchlist?: string[];
  // Add other metadata fields as needed
}

// Fetch user data
export const fetchUserData = async (userId: string): Promise<UserData | null> => {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      return userDoc.data() as UserData;
    }
    return null;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

// Update subscription
export const updateUserSubscription = async (userId: string, plan: string): Promise<void> => {
  try {
    await setDoc(doc(db, "users", userId), { subscription: plan }, { merge: true });
  } catch (error) {
    console.error("Error updating subscription:", error);
    throw error;
  }
};

// Add to watchlist
export const addToWatchlist = async (userId: string, itemId: string): Promise<void> => {
  try {
    await updateDoc(doc(db, "users", userId), {
      watchlist: arrayUnion(itemId),
    });
  } catch (error) {
    console.error("Error adding to watchlist:", error);
    throw error;
  }
};

// Remove from watchlist
export const removeFromWatchlist = async (userId: string, itemId: string): Promise<void> => {
  try {
    await updateDoc(doc(db, "users", userId), {
      watchlist: arrayRemove(itemId),
    });
  } catch (error) {
    console.error("Error removing from watchlist:", error);
    throw error;
  }
}; 