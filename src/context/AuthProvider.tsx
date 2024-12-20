import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { auth, db, functions } from "@/firebase";
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useActiveAccount } from "thirdweb/react";
import { httpsCallable } from "firebase/functions";
import { fetchUserData, updateUserSubscription, addToWatchlist, removeFromWatchlist } from "@/utils/firestoreUtils";

interface AuthContextType {
  isAuthorized: boolean;
  subscription: string | null;
  userRole: "Investor" | "Founder" | "Connector" | null;
  watchlist: string[];
  subscribe: (plan: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, role: "Investor" | "Founder" | "Connector") => Promise<void>;
  toggleFavorite: (itemId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [subscription, setSubscription] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<"Investor" | "Founder" | "Connector" | null>(null);
  const [watchlist, setWatchlist] = useState<string[]>([]);
  
  const activeAccount = useActiveAccount();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsAuthorized(true);
        const userData = await fetchUserData(user.uid);
        if (userData) {
          setSubscription(userData.subscription || null);
          setUserRole(userData.role || null);
          setWatchlist(userData.watchlist || []);
        }
      } else {
        setIsAuthorized(false);
        setSubscription(null);
        setUserRole(null);
        setWatchlist([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // User state is handled by onAuthStateChanged
    } catch (error) {
      console.error("Sign In Error:", error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, role: "Investor" | "Founder" | "Connector") => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Set user data in Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        subscription: null,
        role: role,
        watchlist: [],
      });
      setUserRole(role);
    } catch (error) {
      console.error("Sign Up Error:", error);
      throw error;
    }
  };

  const subscribe = async (plan: string) => {
    const user = auth.currentUser;
    if (user) {
      try {
        if (plan === 'free') {
          await updateUserSubscription(user.uid, 'free');
          setSubscription('free');
          return;
        }

        const createCheckoutSession = httpsCallable(functions, 'create-checkout-session');
        const response = await createCheckoutSession({ plan, userId: user.uid });
        if (response.data.checkoutUrl) {
          window.location.href = response.data.checkoutUrl;
        }
      } catch (error) {
        console.error("Subscription error:", error);
        throw error;
      }
    }
  };

  const toggleFavorite = async (itemId: string) => {
    const user = auth.currentUser;
    if (user) {
      try {
        if (watchlist.includes(itemId)) {
          await removeFromWatchlist(user.uid, itemId);
          setWatchlist(prev => prev.filter(id => id !== itemId));
        } else {
          await addToWatchlist(user.uid, itemId);
          setWatchlist(prev => [...prev, itemId]);
        }
      } catch (error) {
        console.error("Toggle Favorite Error:", error);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthorized, subscription, userRole, watchlist, subscribe, signIn, signUp, toggleFavorite }}>
      {children}
    </AuthContext.Provider>
  );
};
