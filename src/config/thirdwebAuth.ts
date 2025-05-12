// src/config/thirdwebAuth.ts
import { ThirdwebAuth } from "@thirdweb-dev/auth";
import { 
  signInWithCustomToken, 
  signOut,
  signInAnonymously // Add this for fallback auth
} from "firebase/auth";
import { ethers } from "ethers";
import { 
  doc, 
  setDoc,
  collection,
  writeBatch,
  serverTimestamp // Add for automatic timestamps
} from "firebase/firestore";
import { auth, db } from "./firebase";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

const thirdwebAuth = new ThirdwebAuth(signer, "metatrondao.io", provider);

// Helper function to get Firebase token (mock implementation)
const getFirebaseToken = async (address: string): Promise<string> => {
  const { user } = await signInAnonymously(auth);
  return user.getIdToken();
};

export const handleLogin = async () => {
  try {
    // 1. Thirdweb auth
    const { payload, signature } = await thirdwebAuth.login();
    
    // 2. Firebase auth
    const { user } = await signInWithCustomToken(auth, await getFirebaseToken(payload.address));

    console.log("User signed in:", user);
    console.log("Payload:", payload);
    console.log("Signature:", signature);
    



    // 3. Firestore init
    const userRef = doc(db, "users", user.uid);
    const batch = writeBatch(db);

    // Main document
    batch.set(userRef, {
      walletAddress: payload.address,
      createdAt: serverTimestamp(), // Better than new Date()
    }, { merge: true });

    // Subcollections (corrected syntax)
    batch.set(doc(collection(userRef, "startupWatchlist"), "dummy"), { 
      _placeholder: true 
    });
    
    batch.set(doc(collection(userRef, "investorWatchlist"), "dummy"), { 
      _placeholder: true 
    });

    batch.set(doc(collection(userRef, "subscription"), "data"), { 
      plan: "free",
      expiresAt: null
    });

    await batch.commit();
    return user.uid;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const handleLogout = () => signOut(auth);
