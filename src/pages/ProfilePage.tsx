import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthProvider';
import { db } from '@/firebase';
import { collection, getDocs, query, where, DocumentData } from 'firebase/firestore';
import { useTheme } from "@/context/ThemeProvider";
import { StartupCard } from '@/components/StartupCard';
import { InvestorCard } from '@/components/InvestorCard';

interface WatchlistItem extends DocumentData {
  id: string;
  type: 'startup' | 'investor';
}

const ProfilePage: React.FC = () => {
  const { isAuthorized, userRole, subscription, userId } = useAuth();
  const { theme } = useTheme();
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [watchlistItems, setWatchlistItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchWatchlist = async () => {
      if (!userId) return;
      
      try {
        // Fetch watchlist references
        const q = query(collection(db, "watchlists"), where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        const watchlistData: WatchlistItem[] = [];
        querySnapshot.forEach((doc) => {
          watchlistData.push({ id: doc.id, ...doc.data() } as WatchlistItem);
        });
        setWatchlist(watchlistData);

        // Fetch actual items from watchlist
        const items = await Promise.all(
          watchlistData.map(async (item) => {
            const itemDoc = await getDocs(query(collection(db, item.type === 'startup' ? 'startups' : 'investors'), where("id", "==", item.id)));
            return itemDoc.docs[0]?.data();
          })
        );
        setWatchlistItems(items.filter(Boolean));
      } catch (error) {
        console.error("Error fetching watchlist:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthorized) {
      fetchWatchlist();
    } else {
      setLoading(false);
    }
  }, [isAuthorized, userId]);

  if (!isAuthorized) {
    return (
      <div 
        className="flex flex-col items-center justify-center min-h-screen p-6"
        style={{ backgroundColor: theme.colors.primaryBg }}
      >
        <div 
          className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center"
          style={{ backgroundColor: theme.colors.modalBg, color: theme.colors.primaryText }}
        >
          <h2 className="text-2xl font-bold mb-4">Welcome to Metatron</h2>
          <p className="mb-6">Please sign in to view your profile and access your personalized dashboard.</p>
          <p className="text-sm opacity-75">Sign in to track your favorite startups and investors.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div 
        className="flex items-center justify-center min-h-screen"
        style={{ backgroundColor: theme.colors.primaryBg, color: theme.colors.primaryText }}
      >
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-6" style={{ backgroundColor: theme.colors.primaryBg, color: theme.colors.primaryText }}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
        <div className="bg-white rounded-lg p-6 mb-6" style={{ backgroundColor: theme.colors.modalBg }}>
          <p><strong>Role:</strong> {userRole}</p>
          <p><strong>Subscription:</strong> {subscription || "Free"}</p>
        </div>
        
        {/* Role-specific sections */}
        {userRole === "Investor" && (
          <div className="bg-white rounded-lg p-6 mb-6" style={{ backgroundColor: theme.colors.modalBg }}>
            <h3 className="text-xl font-semibold mb-4">Investor Dashboard</h3>
            <p>View and manage your investment portfolio</p>
          </div>
        )}
        
        {userRole === "Founder" && (
          <div className="bg-white rounded-lg p-6 mb-6" style={{ backgroundColor: theme.colors.modalBg }}>
            <h3 className="text-xl font-semibold mb-4">Founder Dashboard</h3>
            <p>Manage your startup profile and connect with investors</p>
          </div>
        )}
        
        {userRole === "Connector" && (
          <div className="bg-white rounded-lg p-6 mb-6" style={{ backgroundColor: theme.colors.modalBg }}>
            <h3 className="text-xl font-semibold mb-4">Connector Dashboard</h3>
            <p>Facilitate connections between startups and investors</p>
          </div>
        )}
        
        {/* Watchlist Section */}
        <div className="bg-white rounded-lg p-6" style={{ backgroundColor: theme.colors.modalBg }}>
          <h3 className="text-xl font-semibold mb-4">Your Watchlist</h3>
          {watchlistItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {watchlistItems.map((item) => (
                item.type === 'startup' ? (
                  <StartupCard key={item.id} startupId={item.id} startupData={item} />
                ) : (
                  <InvestorCard key={item.id} investorId={item.id} investorData={item} />
                )
              ))}
            </div>
          ) : (
            <p>Your watchlist is empty. Start exploring startups and investors to add them to your watchlist!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 