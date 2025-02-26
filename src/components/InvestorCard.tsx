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
import { NFTAttribute } from '@/types/nftTypes';

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

// A mapping from stage names to Tailwind CSS classes for background and text colours.
const fundingStageColors: { [stage: string]: string } = {
  "Seed": "bg-green-200 text-green-800",
  "Series A": "bg-blue-200 text-blue-800",
  "Series B": "bg-purple-200 text-purple-800",
  "Early Revenue": "bg-yellow-200 text-yellow-800",
  "Scaling": "bg-red-200 text-red-800",
  // add more mappings as needed
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

  // Get location value from NFT attributes with proper type checking
  const getAttributeValue = (attributeName: string): string | undefined => {
    if (!nft?.metadata?.attributes) return undefined;
    
    const attributes = nft.metadata.attributes;
    if (!Array.isArray(attributes)) return undefined;
    
    const attr = attributes.find((attr: any) => 
      attr && typeof attr === 'object' && attr.trait_type === attributeName
    );
    
    return attr ? (attr.value as string) : undefined;
  };

  // Use 'Location' attribute for headquarters if investorData.headquarters is missing.
  const rawHeadquarters = investorData?.headquarters || getAttributeValue('Location');
  const headquarters = rawHeadquarters && rawHeadquarters.trim() !== '' ? rawHeadquarters : "NA";

  // Parse funding stage(s). If investorData.investmentStage exists, split on commas or slashes.
  let investmentStages: string[] = [];
  if (investorData?.investmentStage) {
    investmentStages = investorData.investmentStage.split(/,|\//).map(s => s.trim());
  } else if (nft?.metadata?.attributes) {
    const attributes = nft.metadata.attributes;
    
    if (Array.isArray(attributes)) {
      const stageAttr = attributes.find((attr: any) => 
        attr && typeof attr === 'object' && 
        (attr.trait_type === 'Funding Range' || attr.trait_type === 'Funding Types')
      );
      
      if (stageAttr) {
        if (Array.isArray(stageAttr.value)) {
          investmentStages = stageAttr.value.map((s: any) => s.toString());
        } else if (typeof stageAttr.value === 'string') {
          investmentStages = stageAttr.value.split(/,|\//).map((s: string) => s.trim());
        }
      }
    }
  }

  // When a stage tag is clicked, dispatch a custom event so that the Gallery can filter
  const applyFundingStageFilter = (stage: string) => {
    window.dispatchEvent(new CustomEvent('filterFundingStage', { detail: stage }));
  };

  // Determine the name to display
  const name = investorData?.name || nft?.metadata.name || '';

  return (
    <Link to={`/investor/${investorId || nft?.id.toString()}`}>
      <div
        className="w-[288px] rounded-[15px] cursor-pointer transition-all duration-300 hover:scale-105 relative p-2 box-border"
        style={{ height: '360px', backgroundColor: theme.colors.modalBg }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="image-container" style={{ height: '50%', padding: '0px', backgroundColor: theme.colors.modalBg, borderRadius: '5px' }}>
          <div className="relative image-wrapper h-full w-full">
            {nft ? (
              <MediaRenderer
                client={client}
                src={investorData?.imageUrl || nft?.metadata.image || ''}
                className="image rounded-[12px] w-full h-full object-cover"
                alt={name}
              />
            ) : (
              <img
                src={investorData?.imageUrl || ''}
                alt={name}
                className="image rounded-[12px] w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder-investor.png';
                }}
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
          <div className="flex flex-row items-center mb-2" style={{ color: theme.colors.tertiaryText }}>
            <FaMapMarkerAlt size={16} />
            <p className="ml-2 text-sm">{headquarters}</p>
          </div>
          <h3 className="font-epilogue font-semibold text-[16px] text-left leading-[24px] truncate" style={{ color: theme.colors.primaryText }}>
            {name}
          </h3>
          <div className="mt-2">
            <p className="text-xs font-semibold" style={{ color: theme.colors.tertiaryText }}>Stage</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {investmentStages.map((stage, index) => (
                <div
                  key={index}
                  className={`cursor-pointer rounded-full px-3 py-1 text-xs font-semibold ${fundingStageColors[stage] || "bg-gray-200 text-gray-800"}`}
                  onClick={() => applyFundingStageFilter(stage)}
                >
                  {stage}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
