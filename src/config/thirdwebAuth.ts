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

// Helper function to get Firebase token (mock implementation)
const getFirebaseToken = async (address: string): Promise<string> => {
  const { user } = await signInAnonymously(auth);
  return user.getIdToken();
};

export const handleLogin = async () => {
  try {
    // 1. Create provider and signer after wallet is connected
    if (!window.ethereum) throw new Error("No crypto wallet found");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []); // Prompt user to connect wallet
    const signer = provider.getSigner();

    // 2. Thirdweb auth
    const thirdwebAuth = new ThirdwebAuth(signer, "metatrondao.io", provider);
    const { payload, signature } = await thirdwebAuth.login();

    // 3. Call Vercel serverless function to get Firebase custom token
    const res = await fetch('/api/auth-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ payload }),
    });
    if (!res.ok) throw new Error('Failed to get Firebase token');
    const { token } = await res.json();

    // 4. Firebase auth with custom token
    const { user } = await signInWithCustomToken(auth, token);

    console.log('User signed in:', user);
    console.log('Payload:', payload);
    console.log('Signature:', signature);

    // 5. Firestore init
    const userRef = doc(db, 'users', user.uid);
    const batch = writeBatch(db);
    batch.set(userRef, {
      walletAddress: payload.address,
      createdAt: serverTimestamp(),
    }, { merge: true });
    batch.set(doc(collection(userRef, 'startupWatchlist'), 'dummy'), { _placeholder: true });
    batch.set(doc(collection(userRef, 'investorWatchlist'), 'dummy'), { _placeholder: true });
    batch.set(doc(collection(userRef, 'subscription'), 'data'), { plan: 'free', expiresAt: null });
    await batch.commit();
    return user.uid;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const handleLogout = () => signOut(auth);
