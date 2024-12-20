import { client } from "@/consts/parameters";
import React, { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NFT } from 'thirdweb';
import { MediaRenderer } from 'thirdweb/react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { FaIndustry, FaMapMarkerAlt, FaChartLine } from 'react-icons/fa';
import { useTheme } from "@/context/ThemeProvider";
import { db } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';

interface StartupCardProps {
  nft?: NFT;
  startupId?: string;
  startupData?: {
    name: string;
    location: string;
    fundingStage: string;
    industry: string;
    description: string;
    imageUrl: string;
  };
}

const industryIcons: { [key: string]: JSX.Element } = {
  'Artificial Intelligence': <FaIndustry size={20} />,
  'Clean Energy': <FaIndustry size={20} />,
  'Technology': <FaIndustry size={20} />,
};

export const StartupCard: FC<StartupCardProps> = ({ nft, startupId, startupData: initialStartupData }) => {
  const { theme } = useTheme();
  const [hover, setHover] = useState<boolean>(false);
  const [favorite, setFavorite] = useState<boolean>(false);
  const [startupData, setStartupData] = useState(initialStartupData);

  useEffect(() => {
    const fetchStartupData = async () => {
      if (startupId && !startupData) {
        try {
          const startupDoc = await getDoc(doc(db, 'startups', startupId));
          if (startupDoc.exists()) {
            setStartupData(startupDoc.data() as any);
          }
        } catch (error) {
          console.error('Error fetching startup data:', error);
        }
      }
    };

    fetchStartupData();
  }, [startupId, startupData]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    setFavorite(!favorite);
  };

  if (!startupData && !nft) {
    return null;
  }

  const name = startupData?.name || nft?.metadata.name || '';
  const location = startupData?.location || '';
  const fundingStage = startupData?.fundingStage || '';
  const industry = startupData?.industry || '';
  const imageUrl = startupData?.imageUrl || nft?.metadata.image || '';

  return (
    <Link to={`/startup/${startupId || nft?.id.toString()}`}>
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
            {industryIcons[industry] || <FaIndustry size={20} />}
            <p 
              className="ml-[10px] font-epilogue font-medium text-[12px]"
              style={{ color: theme.colors.tertiaryText}}
            >
              {industry}
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
                {location}
              </h4>
              <p 
                className="mt-[2px] font-epilogue font-normal text-[12px] leading-[18px] sm:max-w-[120px] truncate"
                style={{ color: theme.colors.tertiaryText }}
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