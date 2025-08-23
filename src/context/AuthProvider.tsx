import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { auth, db } from "@/config/firebase";
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { useActiveAccount } from "thirdweb/react";
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
  promptLogin: () => void;
  userId: string | null;
  subscriptionDetails: {
    tier: string;
    lastPaid: Date;
    validity: Date;
  } | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [subscription, setSubscription] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<"Investor" | "Founder" | "Connector" | null>(null);
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [subscriptionDetails, setSubscriptionDetails] = useState<{ tier: string; lastPaid: Date; validity: Date } | null>(null);

  const activeAccount = useActiveAccount();

  // Set authorization based on wallet connection
  useEffect(() => {
    if (activeAccount) {
      setIsAuthorized(true);
      // Use the wallet address as a userId if no Firebase user
      if (!userId) {
        setUserId(activeAccount.address);
      }
    }
  }, [activeAccount, userId]);

  // Load watchlist from localStorage on initial load
  useEffect(() => {
    // Try to load watchlist from localStorage
    try {
      const savedWatchlist = localStorage.getItem('userWatchlist');
      if (savedWatchlist) {
        const parsedWatchlist = JSON.parse(savedWatchlist);
        if (Array.isArray(parsedWatchlist)) {
          setWatchlist(parsedWatchlist);
        }
      }
    } catch (error) {
      console.error('Error loading watchlist from localStorage:', error);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsAuthorized(true);
        setUserId(user.uid);
        const userData = await fetchUserData(user.uid);
        if (userData) {
          setSubscription(userData.subscription || null);
          setUserRole(userData.role || null);
          
          // If we have watchlist data from localStorage, merge it with Firebase data
          const localWatchlist = getLocalWatchlist();
          if (userData.watchlist && Array.isArray(userData.watchlist)) {
            // Merge watchlists, removing duplicates
            const mergedWatchlist = Array.from(new Set([...userData.watchlist, ...localWatchlist]));
            setWatchlist(mergedWatchlist);
            
            // If we merged items, update Firebase
            if (mergedWatchlist.length > userData.watchlist.length) {
              updateWatchlistInFirebase(user.uid, mergedWatchlist);
            }
          } else {
            setWatchlist(localWatchlist);
            if (localWatchlist.length > 0) {
              updateWatchlistInFirebase(user.uid, localWatchlist);
            }
          }
        }

        const subDoc = await getDoc(doc(db, "subscriptions", user.uid));
        if (subDoc.exists()) {
          const subData = subDoc.data();
          setSubscriptionDetails({
            tier: subData.tier,
            lastPaid: subData.lastPaid.toDate(),
            validity: subData.validity.toDate(),
          });
        }
      } else {
        setIsAuthorized(false);
        setUserId(null);
        setUserRole(null);
        setSubscription(null);
        
        // Load watchlist from localStorage when not logged in
        const localWatchlist = getLocalWatchlist();
        setWatchlist(localWatchlist);
        
        setSubscriptionDetails(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Helper function to get watchlist from localStorage
  const getLocalWatchlist = (): string[] => {
    try {
      const savedWatchlist = localStorage.getItem('userWatchlist');
      if (savedWatchlist) {
        const parsedWatchlist = JSON.parse(savedWatchlist);
        if (Array.isArray(parsedWatchlist)) {
          return parsedWatchlist;
        }
      }
    } catch (error) {
      console.error('Error parsing watchlist from localStorage:', error);
    }
    return [];
  };

  // Helper function to update watchlist in Firebase
  const updateWatchlistInFirebase = async (uid: string, watchlistData: string[]) => {
    try {
      await updateDoc(doc(db, "users", uid), {
        watchlist: watchlistData,
      });
    } catch (error) {
      console.error('Error updating watchlist in Firebase:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // The auth state change will handle updating the context
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const signUp = async (email: string, password: string, role: "Investor" | "Founder" | "Connector") => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Get any local watchlist to include with the new user
      const localWatchlist = getLocalWatchlist();
      
      // Create a user document in Firestore
      await setDoc(doc(db, "users", user.uid), {
        role,
        subscription: "Free",
        watchlist: localWatchlist || [],
      });
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const subscribe = async (tier: string) => {
    if (!userId) return;

    try {
      // Map UI tiers to backend plan keys
      const planMap: Record<string, string> = {
        'Free': 'free',
        'Basic': 'basic',
        'Pro': 'pro',
        'Pro VDR': 'enterprise',
      };
      const plan = planMap[tier] || 'basic';

      // Build Functions endpoint (emulator in dev, prod otherwise)
      const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID as string;
      const baseUrl = window.location.hostname === 'localhost'
        ? `http://localhost:5001/${projectId}/us-central1/api`
        : `https://us-central1-${projectId}.cloudfunctions.net/api`;

      const res = await fetch(`${baseUrl}/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan, userId }),
      });

      if (!res.ok) {
        throw new Error(`Failed to create checkout session: ${res.status}`);
      }

      const data = await res.json();

      if (plan === 'free') {
        // Free plan handled immediately
        await updateDoc(doc(db, "users", userId), { subscription: 'Free' });
        setSubscription('Free');
        setSubscriptionDetails(null);
        return;
      }

      if (data.checkoutUrl) {
        // Redirect to Stripe Checkout
        window.location.href = data.checkoutUrl as string;
      }
    } catch (error) {
      console.error("Error subscribing:", error);
    }
  };

  const toggleFavorite = async (itemId: string) => {
    // Always update the local state for UI responsiveness
    const newWatchlist = watchlist.includes(itemId)
      ? watchlist.filter(id => id !== itemId)
      : [...watchlist, itemId];
    
    setWatchlist(newWatchlist);
    
    // Save to localStorage for persistence across sessions
    localStorage.setItem('userWatchlist', JSON.stringify(newWatchlist));
    
    // If user is logged in, also update in Firestore
    if (userId) {
      try {
        const userDocRef = doc(db, "users", userId);
        
        if (watchlist.includes(itemId)) {
          await updateDoc(userDocRef, {
            watchlist: arrayRemove(itemId),
          });
        } else {
          await updateDoc(userDocRef, {
            watchlist: arrayUnion(itemId),
          });
        }
      } catch (error) {
        console.error("Error toggling favorite in Firestore:", error);
      }
    }
  };

  const promptLogin = () => {
    // Implement your login prompt logic here
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{
      isAuthorized,
      subscription,
      userRole,
      watchlist,
      subscribe,
      signIn,
      signUp,
      toggleFavorite,
      promptLogin,
      userId,
      subscriptionDetails
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
