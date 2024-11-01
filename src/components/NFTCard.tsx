import { client } from "@/consts/parameters";
import { useTheme } from "@/context/ThemeProvider"; 
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { NFT } from 'thirdweb';
import { MediaRenderer } from 'thirdweb/react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { FaHandsHelping, FaChartLine, FaSeedling, FaTree, FaMoneyBill, FaLaptopCode } from 'react-icons/fa';

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
  const [hover, setHover] = useState<boolean>(false);
  const [favorite, setFavorite] = useState<boolean>(false);

  const toggleFavorite = () => {
    setFavorite(!favorite);
    // Here, you can also add any logic to save the favorite status (e.g., sending it to a backend or updating local storage).
  };

  return (
    <Link to={`/nft/${nft.id.toString()}`}>
      <div
        className="sm:w-[288px] w-full rounded-[15px] cursor-pointer transition-all duration-300 hover:scale-105 relative p-2 box-border"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{ height: '360px', backgroundColor: theme.colors.modalBg }}  // Reduced the height slightly
      >
        {/* Image container taking up 60% of the card's height */}
        <div 
          className="image-container" 
          style={{ 
            height: '60%', 
            padding: '5px', 
            backgroundColor: theme.colors.modalBg, 
            borderRadius: '5px' }}
          >
          <div className="relative image-wrapper h-full w-full">
            <MediaRenderer
              client={client}
              src={nft.metadata.image}
              className="image rounded-[12px] w-full h-full object-cover"
            />
            <div 
              className="absolute top-3 right-3 cursor-pointer"
              style={{ color: theme.colors.secondaryText }}
              onClick={(e) => {
                e.preventDefault();
                toggleFavorite();
              }}
            >
              {favorite ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
            </div>
          </div>
        </div>
        
        <div className="p-3" style={{ height: '40%' }}> {/* Reduced padding and adjusted height */}
          <div 
            className="flex flex-row items-center mb-[12px]" 
            style={{ color: theme.colors.tertiaryText }}
            > {/* Reduced bottom margin */}
            {category ? categoryIcons[category] : <FaHandsHelping size={20} />} {/* Default to Service icon if category is unknown */}
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
            >{startupName}
          </h3>

          <div className="flex justify-between flex-wrap mt-[10px] gap-2"> {/* Reduced margin top */}
            <div className="flex flex-col">
              <h4 
                className="font-epilogue font-semibold text-[14px] leading-[22px]"
                style={{ color: theme.colors.secondaryText }}
              >{location}
              </h4>
              <p 
                className="mt-[2px] font-epilogue font-normal text-[12px] leading-[18px] sm:max-w-[120px] truncate"
                style={{ color: theme.colors.secondaryText }}
                >Location
              </p>
            </div>
            <div className="flex flex-col">
              <h4 
                className="font-epilogue font-semibold text-[14px] leading-[22px]"
                style={{ color: theme.colors.tertiaryText }}
                >{fundingStage}
              </h4>
              <p 
                className="mt-[2px] font-epilogue font-normal text-[12px] leading-[18px] sm:max-w-[120px] truncate"
                style={{ color: theme.colors.secondaryText }}
                >Stage
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
