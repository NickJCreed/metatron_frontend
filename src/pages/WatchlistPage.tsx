import React, { ReactNode, createContext, useContext, useState } from "react";

interface WatchlistContextProps {
  watchlist: any[];
  toggleFavorite: (item: any) => void;
}

interface WatchlistProviderProps {
  children: ReactNode;
}

const WatchlistContext = createContext<WatchlistContextProps | undefined>(undefined);

export const WatchlistProvider: React.FC<WatchlistProviderProps> = ({ children }) => {
  const [watchlist, setWatchlist] = useState<any[]>([]);

  const toggleFavorite = (item: any) => {
    setWatchlist((prev) => {
      const exists = prev.find((fav) => fav.id === item.id);
      if (exists) {
        return prev.filter((fav) => fav.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, toggleFavorite }}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error("useWatchlist must be used within a WatchlistProvider");
  }
  return context;
};
