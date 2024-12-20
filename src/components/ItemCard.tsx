import React, { useEffect, useState } from 'react';
import { NFTCard } from '@/components/NFTCard';
import { InvestorCard } from '@/components/InvestorCard';
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";

interface ItemCardProps {
  itemId: string;
  toggleFavorite: (itemId: string) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ itemId, toggleFavorite }) => {
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const itemDoc = await getDoc(doc(db, "items", itemId));
        if (itemDoc.exists()) {
          setItem(itemDoc.data());
        } else {
          setError("Item not found.");
        }
      } catch (error) {
        console.error("Error fetching item:", error);
        setError("Failed to load item.");
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [itemId]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="text-gray-500">{error}</div>;
  }

  if (!item) {
    return <div className="text-gray-500">Item not found.</div>;
  }

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleFavorite(itemId);
  };

  return (
    <>
      {item.type === 'startup' ? (
        <NFTCard 
          nft={item} 
          startupName={item.startupName}
          fundingStage={item.fundingStage}
          location={item.location}
          category={item.category}
          onClick={handleFavoriteClick}
        />
      ) : (
        <InvestorCard 
          nft={item} 
          investorName={item.investorName}
          hq={item.hq}
          investmentStage={item.investmentStage}
          fundType={item.fundType}
          onClick={handleFavoriteClick}
        />
      )}
    </>
  );
};

export default ItemCard; 