import { client } from "@/consts/parameters";
import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { NFT } from 'thirdweb';
import { MediaRenderer } from 'thirdweb/react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { FaBuilding, FaMoneyCheck, FaMapMarkerAlt, FaBriefcase } from 'react-icons/fa';
import { useTheme } from "@/context/ThemeProvider";

interface IInvestorCardProps {
  nft: NFT;
  investorName: string;
  hq: string;
  investmentStage: string;
  fundType: string;
}

const fundTypeIcons: { [key: string]: JSX.Element } = {
  Venture: <FaMoneyCheck size={20} />,
  Equity: <FaBriefcase size={20} />,
  Debt: <FaBuilding size={20} />,
  // Add more fund types and corresponding icons as needed
};

export const InvestorCard: FC<IInvestorCardProps> = ({ nft, investorName, hq, investmentStage, fundType }) => {
  const { theme } = useTheme();
  const [hover, setHover] = useState<boolean>(false);
  const [favorite, setFavorite] = useState<boolean>(false);

  const toggleFavorite = () => {
    setFavorite(!favorite);
    // Here, you can also add any logic to save the favorite status (e.g., sending it to a backend or updating local storage).
  };

  return (
    <Link to={`/investor/${nft.id.toString()}`}>
      <div
        className="w-[288px] rounded-[15px] bg-[#1c1c24] cursor-pointer transition-all duration-300 hover:scale-105 relative p-2 box-border"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{ height: '360px', backgroundColor: theme.colors.modalBg }}   // Adjusted height similar to startup cards
      >
        {/* Image container taking up 60% of the card's height */}
        <div className="image-container" style={{ height: '45%', padding: '5px', backgroundColor: theme.colors.modalBg, borderRadius: '5px' }}>
          <div className="relative image-wrapper h-full w-full">
            <MediaRenderer
              client={client}
              src={nft.metadata.image}
              className="image rounded-[12px] w-full h-full object-cover"
            />
            <div 
              className="absolute top-3 right-3 cursor-pointer"
              style={{ color: theme.colors.accentButtonText }}
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
            style={{ color: theme.colors.tertiaryText}}
            > 
            {fundTypeIcons[fundType] || <FaBriefcase size={20} />} {/* Default to a briefcase icon if fund type is unknown */}
            <p 
              className="ml-[10px] font-epilogue font-medium text-[12px]"
              style={{ color: theme.colors.tertiaryText}}
              >
                {fundType}
            </p>
          </div>
          <h3 
            className="font-epilogue font-semibold text-[16px] text-left leading-[24px] truncate"
            style={{ color: theme.colors.primaryText}}
            >
              {investorName}
          </h3>

          <div className="flex justify-between flex-wrap mt-[10px] gap-2"> {/* Reduced margin top */}
            <div className="flex flex-col">
              <h4 
                className="font-epilogue font-semibold text-[14px] leading-[22px]"
                style={{ color: theme.colors.secondaryText }}
              >
                {hq}
              </h4>
              <p 
                className="mt-[2px] font-epilogue font-normal text-[12px] leading-[18px] sm:max-w-[120px] truncate"
                style={{ color: theme.colors.tertiaryText }}
                >
                  Headquarters
              </p>
            </div>
            <div className="flex flex-col">
              <h4 
                className="font-epilogue font-semibold text-[14px] leading-[22px]"
                style={{ color: theme.colors.secondaryText }}
                >
                  {investmentStage}
                </h4>
              <p 
                className="mt-[2px] font-epilogue font-normal text-[12px] leading-[18px] sm:max-w-[120px] truncate"
                style={{ color: theme.colors.tertiaryText }}
                >
                  Stage
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
