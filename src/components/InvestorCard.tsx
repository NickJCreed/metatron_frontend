import { client } from "@/consts/parameters";
import React, { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NFT } from 'thirdweb';
import { MediaRenderer } from 'thirdweb/react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { FaBuilding, FaMoneyCheck, FaMapMarkerAlt, FaBriefcase } from 'react-icons/fa';
import { useTheme } from "@/context/ThemeProvider";
import { db } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';

interface IInvestorCardProps {
  nft?: NFT;
  investorId?: string;
  investorData?: {
    name: string;
    headquarters: string;
    investmentStage: string;
    fundType: string;
    imageUrl: string;
  };
}

const fundTypeIcons: { [key: string]: JSX.Element } = {
  'Venture Capital': <FaMoneyCheck size={20} />,
  'Early Stage VC': <FaBriefcase size={20} />,
  'Private Equity': <FaBuilding size={20} />,
};

export const InvestorCard: FC<IInvestorCardProps> = ({ nft, investorId, investorData: initialInvestorData }) => {
  const { theme } = useTheme();
  const [hover, setHover] = useState<boolean>(false);
  const [favorite, setFavorite] = useState<boolean>(false);
  const [investorData, setInvestorData] = useState(initialInvestorData);

  useEffect(() => {
    const fetchInvestorData = async () => {
      if (investorId && !investorData) {
        try {
          const investorDoc = await getDoc(doc(db, 'investors', investorId));
          if (investorDoc.exists()) {
            setInvestorData(investorDoc.data() as any);
          }
        } catch (error) {
          console.error('Error fetching investor data:', error);
        }
      }
    };

    fetchInvestorData();
  }, [investorId, investorData]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    setFavorite(!favorite);
  };

  if (!investorData && !nft) {
    return null;
  }

  const name = investorData?.name || nft?.metadata.name || '';
  const headquarters = investorData?.headquarters || '';
  const investmentStage = investorData?.investmentStage || '';
  const fundType = investorData?.fundType || '';
  const imageUrl = investorData?.imageUrl || nft?.metadata.image || '';

  return (
    <Link to={`/investor/${investorId || nft?.id.toString()}`}>
      <div
        className="w-[288px] rounded-[15px] cursor-pointer transition-all duration-300 hover:scale-105 relative p-2 box-border"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{ height: '360px', backgroundColor: theme.colors.modalBg }}
      >
        <div className="image-container" style={{ height: '45%', padding: '5px', backgroundColor: theme.colors.modalBg, borderRadius: '5px' }}>
          <div className="relative image-wrapper h-full w-full">
            {nft ? (
              <MediaRenderer
                client={client}
                src={imageUrl}
                className="image rounded-[12px] w-full h-full object-cover"
              />
            ) : (
              <img
                src={imageUrl}
                alt={name}
                className="image rounded-[12px] w-full h-full object-cover"
              />
            )}
            <div 
              className="absolute top-3 right-3 cursor-pointer"
              style={{ color: theme.colors.accentButtonText }}
              onClick={toggleFavorite}
            >
              {favorite ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
            </div>
          </div>
        </div>
        
        <div className="p-3" style={{ height: '40%' }}>
          <div 
            className="flex flex-row items-center mb-[12px]"
            style={{ color: theme.colors.tertiaryText}}
          > 
            {fundTypeIcons[fundType] || <FaBriefcase size={20} />}
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
            {name}
          </h3>

          <div className="flex justify-between flex-wrap mt-[10px] gap-2">
            <div className="flex flex-col">
              <h4 
                className="font-epilogue font-semibold text-[14px] leading-[22px]"
                style={{ color: theme.colors.secondaryText }}
              >
                {headquarters}
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
