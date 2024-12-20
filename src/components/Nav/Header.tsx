import React, { useState } from 'react';
import { useTheme } from "@/context/ThemeProvider"; 
import { client, startupContract, wallets } from "@/consts/parameters";
import { getContractMetadata } from "thirdweb/extensions/common";
import { getNFT } from "thirdweb/extensions/erc721";
import { ConnectButton, useReadContract } from "thirdweb/react";
import { generateThirdWebTheme } from "@/utils/thirdwebTheme";
import { Link } from "react-router-dom";
import { logo } from "@/assets";
import { useAuth } from "@/context/AuthProvider";
import SubscriptionModal from '../SubscriptionModal';

export const Header: React.FC = () => {
  const { theme } = useTheme(); 
  const { isAuthorized, subscription } = useAuth();
  const customTheme = generateThirdWebTheme(theme.type);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: firstNFT, isLoading: nftLoading } = useReadContract(getNFT, {
    contract: startupContract,
    tokenId: 1n,
  });
  const { data: contractMetadata, isLoading: contractLoading } = useReadContract(getContractMetadata, {
    contract: startupContract,
  });

  const handleSubscribeClick = () => {
    if (isAuthorized) {
      setIsModalOpen(true);
    } else {
      alert("Please sign in to access subscription options");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between p-1 md:p-2"
        style={{
          backgroundColor: theme.colors.secondaryButtonBg, 
          color: theme.colors.primaryText, 
        }}
      >
        <div className="flex items-center space-x-1 sm:space-x-3 md:space-x-4">
          <Link to="/" className="flex items-center space-x-1 sm:space-x-2 md:space-x-6">
            <img 
              src={logo} 
              alt="Logo" 
              className="h-8 w-8 object-contain md:h-12 md:w-12" 
            />
            <span 
              style={{ color: theme.colors.primaryText }}
              className="text-lg font-bold hidden sm:inline md:text-2xl"
            >
              metatron
            </span>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleSubscribeClick}
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md text-sm md:text-base transition-colors"
            style={{
              backgroundColor: theme.colors.accent || '#F59E0B',
              color: '#FFFFFF'
            }}
          >
            {isAuthorized ? (subscription ? 'Upgrade Plan' : 'Subscribe') : 'Subscribe'}
          </button>
          <ConnectButton
            client={client}
            wallets={wallets}
            theme={customTheme}
            connectModal={{ size: "compact" }}
            connectButton={{ 
              label: "Sign In",
              className: "text-sm md:text-base" 
            }}
          />
          {isAuthorized && (
            <>
              <Link to="/watchlist" className="text-lg md:text-xl">❤️</Link>
              <button className="text-lg md:text-xl">🔔</button>
            </>
          )}
        </div>
      </header>
      
      {isModalOpen && <SubscriptionModal onClose={handleCloseModal} />}
    </>
  );
};
