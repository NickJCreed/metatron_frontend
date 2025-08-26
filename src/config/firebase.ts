import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, browserLocalPersistence, getIdToken } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

// Validate Firebase environment variables
const requiredEnvVars = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN', 
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID'
];

const missingVars = requiredEnvVars.filter(varName => !import.meta.env[varName]);

if (missingVars.length > 0) {
  const errorMessage = `Missing Firebase environment variables: ${missingVars.join(', ')}. Please create a .env file with your Firebase configuration.`;
  console.error(errorMessage);
  throw new Error(errorMessage);
}

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

console.log("Firebase Config initialized successfully");

const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Authentication with persistence
let auth;
try {
  // Try to get existing auth instance first
  auth = getAuth(app);
} catch (error) {
  // If getAuth fails, initialize auth with persistence
  auth = initializeAuth(app, {
    persistence: browserLocalPersistence,
  });
}

// Initialize Firebase Functions
const functions = getFunctions(app);

// Use emulator during development
if (window.location.hostname === "localhost") {
  connectFunctionsEmulator(functions, "localhost", 5001);
}

export { db, auth, functions }; 
