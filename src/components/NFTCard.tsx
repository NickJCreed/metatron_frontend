import { useTheme } from "@/context/ThemeProvider"; 
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { NFT } from 'thirdweb';
import { MediaRenderer } from 'thirdweb/react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { FaHandsHelping, FaChartLine, FaSeedling, FaTree, FaMoneyBill, FaLaptopCode } from 'react-icons/fa';
import { useAuth } from '@/context/AuthProvider';

interface INFTCardProps {
  nft: NFT;
  startupName?: string;
  fundingStage?: string;
  location?: string;
  category?: string;
}

const categoryIcons: { [key: string]: JSX.Element } = {
  Service: <FaHandsHelping size={20} />,
  Fintech: <FaChartLine size={20} />,
  Agriculture: <FaSeedling size={20} />,
  Conservation: <FaTree size={20} />,
  Finance: <FaMoneyBill size={20} />,
  Software: <FaLaptopCode size={20} />,
  // Add more categories and icons as needed
};

export const NFTCard: FC<INFTCardProps> = ({ nft, startupName, fundingStage, location, category }) => {
  const { theme } = useTheme();
  const { watchlist, toggleFavorite } = useAuth();
  const isFavorited = watchlist.includes(nft.id.toString());

  return (
    <Link to={`/nft/${nft.id.toString()}`}>
      <div
        className="w-[288px] rounded-[15px] cursor-pointer transition-all duration-300 hover:scale-105 relative p-2 box-border"
        style={{ height: '360px', backgroundColor: theme.colors.modalBg }}
      >
        {/* Image container taking up 60% of the card's height */}
        <div 
          className="image-container" 
          style={{ 
            height: '60%', 
            padding: '5px', 
            backgroundColor: theme.colors.modalBg, 
            borderRadius: '5px' 
          }}
        >
          <div className="relative image-wrapper h-full w-full">
            <MediaRenderer
              src={nft.metadata.image}
              className="image rounded-[12px] w-full h-full object-cover"
            />
            <div 
              className="absolute top-3 right-3 cursor-pointer"
              style={{ color: theme.colors.accentButtonText }}
              onClick={(e) => {
                e.preventDefault();
                toggleFavorite(nft.id.toString());
              }}
            >
              {isFavorited ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
            </div>
          </div>
        </div>
        
        <div className="p-3" style={{ height: '40%' }}>
          <div 
            className="flex flex-row items-center mb-[12px]" 
            style={{ color: theme.colors.tertiaryText }}
          >
            {category ? categoryIcons[category] : <FaHandsHelping size={20} />}
            <p 
              className="ml-[10px] font-epilogue font-medium text-[12px]"
              style={{ color: theme.colors.secondaryText }}
            >
              {category}
            </p>
          </div>
          <h3 
            className="font-epilogue font-semibold text-[16px] text-left leading-[24px] truncate"
            style={{ color: theme.colors.primaryText }}
          >
            {startupName}
          </h3>

          <div className="flex justify-between flex-wrap mt-[10px] gap-2">
            <div className="flex flex-col">
              <h4 
                className="font-epilogue font-semibold text-[14px] leading-[22px]"
                style={{ color: theme.colors.secondaryText }}
              >
                {location}
              </h4>
              <p 
                className="mt-[2px] font-epilogue font-normal text-[12px] leading-[18px] sm:max-w-[120px] truncate"
                style={{ color: theme.colors.secondaryText }}
              >
                Location
              </p>
            </div>
            <div className="flex flex-col">
              <h4 
                className="font-epilogue font-semibold text-[14px] leading-[22px]"
                style={{ color: theme.colors.secondaryText }}
              >
                {fundingStage}
              </h4>
              <p 
                className="mt-[2px] font-epilogue font-normal text-[12px] leading-[18px] sm:max-w-[120px] truncate"
                style={{ color: theme.colors.secondaryText }}
              >
                Funding Stage
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
