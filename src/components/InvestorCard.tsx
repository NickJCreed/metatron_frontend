import { client } from "@/consts/parameters";
import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { NFT } from 'thirdweb';
import { MediaRenderer } from 'thirdweb/react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { FaBuilding, FaMoneyCheck, FaMapMarkerAlt, FaBriefcase } from 'react-icons/fa';

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
  const [hover, setHover] = useState<boolean>(false);
  const [favorite, setFavorite] = useState<boolean>(false);

  const toggleFavorite = () => {
    setFavorite(!favorite);
    // Here, you can also add any logic to save the favorite status (e.g., sending it to a backend or updating local storage).
  };

  return (
    <Link to={`/investor/${nft.id.toString()}`}>
      <div
        className="sm:w-[288px] w-full rounded-[15px] bg-[#1c1c24] cursor-pointer transition-all duration-300 hover:scale-105 relative p-2 box-border"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{ height: '360px' }}  // Adjusted height similar to startup cards
      >
        {/* Image container taking up 60% of the card's height */}
        <div className="image-container" style={{ height: '45%', padding: '5px', backgroundColor: '#1c1c24', borderRadius: '5px' }}>
          <div className="relative image-wrapper h-full w-full">
            <MediaRenderer
              client={client}
              src={nft.metadata.image}
              className="image rounded-[12px] w-full h-full object-cover"
            />
            <div 
              className="absolute top-3 right-3 cursor-pointer text-white"
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
          <div className="flex flex-row items-center mb-[12px]"> {/* Reduced bottom margin */}
            {fundTypeIcons[fundType] || <FaBriefcase size={20} />} {/* Default to a briefcase icon if fund type is unknown */}
            <p className="ml-[10px] font-epilogue font-medium text-[12px] text-[#808191]">{fundType}</p>
          </div>
          <h3 className="font-epilogue font-semibold text-[16px] text-white text-left leading-[24px] truncate">{investorName}</h3>

          <div className="flex justify-between flex-wrap mt-[10px] gap-2"> {/* Reduced margin top */}
            <div className="flex flex-col">
              <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">{hq}</h4>
              <p className="mt-[2px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">Headquarters</p>
            </div>
            <div className="flex flex-col">
              <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">{investmentStage}</h4>
              <p className="mt-[2px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">Stage</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
