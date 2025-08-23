import React, { useEffect, useState } from 'react';
import { StartupCard } from '@/components/StartupCard';
import { InvestorCard } from '@/components/InvestorCard';
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { FaHeart, FaRegHeart, FaGlobe } from 'react-icons/fa';
import { NFT } from 'thirdweb';

interface ItemCardProps {
  itemId: string;
  toggleFavorite: (itemId: string) => void;
}

// Define an interface for NFT attributes
interface NFTAttribute {
  trait_type: string;
  value: string | string[];
}

// Define an interface for our item data
interface ItemData {
  type: 'startup' | 'investor';
  startupName?: string;
  fundingStage?: string;
  location?: string;
  category?: string;
  investorName?: string;
  hq?: string;
  investmentStage?: string;
  fundType?: string;
  attributes?: NFTAttribute[];
  isLiked?: boolean;
  [key: string]: any; // For other properties that might exist
}

const ItemCard: React.FC<ItemCardProps> = ({ itemId, toggleFavorite }) => {
  const [item, setItem] = useState<ItemData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const itemDoc = await getDoc(doc(db, "items", itemId));
        if (itemDoc.exists()) {
          setItem(itemDoc.data() as ItemData);
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

  // Function to find attribute by trait type with proper typing
  const findAttributeValue = (traitType: string): string | undefined => {
    if (!item.attributes || !Array.isArray(item.attributes)) return undefined;
    
    const attr = item.attributes.find(attr => 
      attr && typeof attr === 'object' && attr.trait_type === traitType
    );
    
    return attr?.value as string | undefined;
  };

  // Create a standalone card based on the item type
  if (item.type === 'startup') {
    return (
      <div onClick={handleFavoriteClick}>
        <StartupCard 
          startupName={item.startupName}
          fundingStage={item.fundingStage}
          location={item.location}
          category={item.category}
          nft={{
            metadata: {
              name: item.startupName || '',
              description: item.description || '',
              image: item.imageUrl || '',
              attributes: item.attributes || []
            },
            owner: null,
            id: BigInt(itemId),
            tokenURI: '',
            type: 'ERC721'
          } as NFT}
        />
        <div className="flex items-center space-x-2 mt-2">
          {findAttributeValue("Website") && (
            <a
              href={findAttributeValue("Website")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaGlobe size={20} />
            </a>
          )}
          <button
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            {item.isLiked ? <FaHeart className="text-red-500" size={20} /> : <FaRegHeart size={20} />}
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div onClick={handleFavoriteClick}>
        <InvestorCard 
          investorData={{
            name: item.investorName || '',
            headquarters: item.hq || '',
            investmentStage: item.investmentStage || '',
            fundType: item.fundType || '',
            imageUrl: item.imageUrl || ''
          }}
        />
        <div className="flex items-center space-x-2 mt-2">
          {findAttributeValue("Website") && (
            <a
              href={findAttributeValue("Website")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaGlobe size={20} />
            </a>
          )}
          <button
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            {item.isLiked ? <FaHeart className="text-red-500" size={20} /> : <FaRegHeart size={20} />}
          </button>
        </div>
      </div>
    );
  }
};

export default ItemCard; 