import React, { useState, useEffect } from 'react';
import { FaCoins, FaArrowRight, FaSpinner } from 'react-icons/fa';
import { useTheme } from '@/context/ThemeProvider';
import { ConnectButton } from 'thirdweb/react';
import { client, wallets } from "@/consts/parameters";
import { darkTheme, lightTheme } from "thirdweb/react";

const Staking: React.FC = () => {
  const { theme } = useTheme();
  const [hasWallet, setHasWallet] = useState<boolean>(false);
  
  // Simulated data
  const tokenBalance = 1000; // Example value
  const stakedBalance = 500; // Example value
  const pendingRewards = 75; // Example value
  const apy = 12.5; // Example percentage
  const dailyReward = 1.5; // Example value
  
  // Create custom ThirdWeb theme based on app theme
  const thirdwebTheme = theme.type === 'dark' 
    ? darkTheme({
        colors: {
          primaryText: theme.colors.primaryText,
          secondaryText: theme.colors.secondaryText,
          accentButtonBg: theme.colors.accentButtonBg,
          accentButtonText: theme.colors.accentButtonText,
          primaryButtonBg: theme.colors.primaryButtonBg,
          primaryButtonText: theme.colors.primaryButtonText,
          connectedButtonBg: theme.colors.connectedButtonBg,
          connectedButtonBgHover: theme.colors.connectedButtonBgHover,
          borderColor: theme.colors.borderColor,
          modalBg: theme.colors.modalBg,
          modalOverlayBg: theme.colors.modalOverlayBg,
          secondaryButtonBg: theme.colors.secondaryButtonBg,
          secondaryButtonHoverBg: theme.colors.secondaryButtonHoverBg,
          secondaryButtonText: theme.colors.secondaryButtonText,
          tooltipBg: theme.colors.tooltipBg,
          tooltipText: theme.colors.tooltipText,
          separatorLine: theme.colors.separatorLine,
        }
      })
    : lightTheme({
        colors: {
          primaryText: theme.colors.primaryText,
          secondaryText: theme.colors.secondaryText,
          accentButtonBg: theme.colors.accentButtonBg,
          accentButtonText: theme.colors.accentButtonText,
          primaryButtonBg: theme.colors.primaryButtonBg,
          primaryButtonText: theme.colors.primaryButtonText,
          connectedButtonBg: theme.colors.connectedButtonBg,
          connectedButtonBgHover: theme.colors.connectedButtonBgHover,
          borderColor: theme.colors.borderColor,
          modalBg: theme.colors.modalBg,
          modalOverlayBg: theme.colors.modalOverlayBg,
          secondaryButtonBg: theme.colors.secondaryButtonBg,
          secondaryButtonHoverBg: theme.colors.secondaryButtonHoverBg,
          secondaryButtonText: theme.colors.secondaryButtonText,
          tooltipBg: theme.colors.tooltipBg,
          tooltipText: theme.colors.tooltipText,
          separatorLine: theme.colors.separatorLine,
        }
      });

  // Check if wallet is connected
  useEffect(() => {
    // This would normally check for wallet connection
    // For now we'll set it to true to show the UI
    setHasWallet(true);
  }, []);

  // Loading state (in a real app, this would check if data is loading)
  if (false) {
    return (
      <div 
        className="rounded-lg p-8 mb-8 flex items-center justify-center" 
        style={{ backgroundColor: theme.colors.modalBg, minHeight: '300px' }}
      >
        <FaSpinner className="animate-spin text-4xl" style={{ color: theme.colors.accentButtonBg }} />
      </div>
    );
  }

  // Actual staking UI
  return (
    <div className="rounded-lg p-8 mb-8" style={{ backgroundColor: theme.colors.modalBg }}>
      <div className="flex items-center mb-6">
        <FaCoins className="mr-3" size={24} style={{ color: theme.colors.accentButtonBg }} />
        <h2 className="text-2xl font-bold" style={{ color: theme.colors.primaryText }}>Your Rewards</h2>
      </div>

      {/* Display wallet connection dialog if wallet is not connected */}
      {!hasWallet ? (
        <div className="text-center py-10 border border-dashed rounded-lg p-6" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <p className="mb-4" style={{ color: theme.colors.secondaryText }}>
            Connect your wallet to stake tokens and earn rewards.
          </p>
          <div className="flex justify-center">
            <ConnectButton
              client={client}
              wallets={wallets}
              theme={thirdwebTheme}
              connectModal={{ size: "wide" }}
              connectButton={{ 
                label: "Connect Wallet",
                className: "px-6 py-3 font-semibold" 
              }}
            />
          </div>
        </div>
      ) : (
        <>
          {/* Staking Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 rounded-lg" style={{ backgroundColor: theme.colors.secondaryBg }}>
              <p className="text-sm mb-2" style={{ color: theme.colors.secondaryText }}>Available Balance</p>
              <p className="text-2xl font-bold" style={{ color: theme.colors.primaryText }}>
                {tokenBalance.toFixed(4)} METATRON
              </p>
            </div>
            
            <div className="p-6 rounded-lg" style={{ backgroundColor: theme.colors.secondaryBg }}>
              <p className="text-sm mb-2" style={{ color: theme.colors.secondaryText }}>Staked Balance</p>
              <p className="text-2xl font-bold" style={{ color: theme.colors.primaryText }}>
                {stakedBalance.toFixed(4)} METATRON
              </p>
            </div>
            
            <div className="p-6 rounded-lg" style={{ backgroundColor: theme.colors.secondaryBg }}>
              <p className="text-sm mb-2" style={{ color: theme.colors.secondaryText }}>Claimable Rewards</p>
              <p className="text-2xl font-bold" style={{ color: theme.colors.primaryText }}>
                {pendingRewards.toFixed(4)} METATRON
              </p>
            </div>
          </div>

          {/* APY Display */}
          <div 
            className="p-6 rounded-lg mb-8 flex items-center justify-between" 
            style={{ backgroundColor: theme.colors.secondaryBg }}
          >
            <div>
              <p className="text-md font-semibold" style={{ color: theme.colors.secondaryText }}>Current APY</p>
              <p className="text-3xl font-bold" style={{ color: theme.colors.accentButtonBg }}>{apy.toFixed(2)}%</p>
            </div>
            <div>
              <p className="text-sm" style={{ color: theme.colors.secondaryText }}>Estimated daily reward:</p>
              <p style={{ color: theme.colors.primaryText }}>
                {dailyReward.toFixed(4)} METATRON/day
              </p>
            </div>
            <div>
              {pendingRewards > 0 && (
                <button
                  className="px-4 py-2 rounded-md font-medium"
                  style={{ backgroundColor: theme.colors.accentButtonBg, color: theme.colors.accentButtonText }}
                  onClick={() => alert("Claiming rewards functionality will be implemented when contract is deployed")}
                >
                  Claim Rewards
                </button>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mb-6">
            <button 
              className="px-6 py-3 rounded-md font-medium"
              style={{ backgroundColor: theme.colors.primaryButtonBg, color: theme.colors.primaryButtonText }}
              onClick={() => alert("Staking functionality will be implemented when contract is deployed")}
            >
              Stake Tokens
            </button>
            
            <button 
              className="px-6 py-3 rounded-md font-medium"
              style={{ backgroundColor: theme.colors.primaryButtonBg, color: theme.colors.primaryButtonText }}
              onClick={() => alert("Withdraw functionality will be implemented when contract is deployed")}
              disabled={stakedBalance <= 0}
            >
              Withdraw Tokens
            </button>
          </div>

          {/* Coming Soon Message */}
          <div className="mt-8 p-4 rounded-lg text-center" style={{ backgroundColor: theme.colors.secondaryBg }}>
            <p style={{ color: theme.colors.secondaryText }}>
              Staking functionality is coming soon! Once our smart contract is deployed, you'll be able to stake your METATRON tokens and earn rewards.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Staking; 