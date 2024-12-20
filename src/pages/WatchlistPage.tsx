import React from 'react';
import { useAuth } from '@/context/AuthProvider';
import ItemCard from '@/components/ItemCard';

const WatchlistPage: React.FC = () => {
  const { isAuthorized, watchlist, toggleFavorite } = useAuth();

  if (!isAuthorized) {
    return <div>Please log in to view your watchlist.</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Watchlist</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {watchlist.length === 0 ? (
          <p className="text-gray-500">Your watchlist is empty.</p>
        ) : (
          watchlist.map((itemId) => (
            <ItemCard key={itemId} itemId={itemId} toggleFavorite={toggleFavorite} />
          ))
        )}
      </div>
    </div>
  );
};

export default WatchlistPage;
