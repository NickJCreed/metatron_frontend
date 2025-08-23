import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthProvider';
import { useTheme } from "@/context/ThemeProvider";
import { StartupCard } from '@/components/StartupCard';
import { InvestorCard } from '@/components/InvestorCard';
import { FaUserCircle, FaHeart } from 'react-icons/fa';
import { useReadContract, ConnectButton } from "thirdweb/react";
import { getNFT } from "thirdweb/extensions/erc721";
import { startupContract, investorContract, client, wallets } from "@/consts/parameters";
import { NFT } from 'thirdweb';
import { darkTheme, lightTheme } from "thirdweb/react";
import Staking from '@/components/Staking';

// Component for a single Startup NFT in the watchlist
const WatchlistStartupItem: React.FC<{ id: string }> = ({ id }) => {
  const { data: nft, isLoading } = useReadContract(getNFT, {
    contract: startupContract,
    tokenId: BigInt(id),
  });

  if (isLoading || !nft) return null;
  return <StartupCard nft={nft} />;
};

// Component for a single Investor NFT in the watchlist
const WatchlistInvestorItem: React.FC<{ id: string }> = ({ id }) => {
  const cleanId = id.startsWith('inv_') ? id.replace('inv_', '') : id;
  const { data: nft, isLoading } = useReadContract(getNFT, {
    contract: investorContract,
    tokenId: BigInt(cleanId),
  });

  if (isLoading || !nft) return null;
  return <InvestorCard nft={nft} />;
};

const ProfilePage: React.FC = () => {
  const { isAuthorized, watchlist, userRole, subscription } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [startupIds, setStartupIds] = useState<string[]>([]);
  const [investorIds, setInvestorIds] = useState<string[]>([]);
  
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

  // Process watchlist to separate startup and investor IDs
  useEffect(() => {
    if (!watchlist.length) {
      setLoading(false);
      return;
    }
    
    const startups: string[] = [];
    const investors: string[] = [];
    
    watchlist.forEach(id => {
      if (id.startsWith('inv_') || !isNaN(Number(id))) {
        investors.push(id);
      } else {
        startups.push(id);
      }
    });
    
    setStartupIds(startups);
    setInvestorIds(investors);
    setLoading(false);
  }, [watchlist]);

  // Save watchlist to localStorage
  useEffect(() => {
    if (watchlist.length > 0) {
      localStorage.setItem('userWatchlist', JSON.stringify(watchlist));
    }
  }, [watchlist]);

  // Render login prompt if not authenticated
  if (!isAuthorized) {
    return (
      <div className="min-h-screen py-16 px-12" style={{ backgroundColor: theme.colors.secondaryBg }}>
        <div className="max-w-3xl mx-auto bg-opacity-90 rounded-lg p-8 shadow-lg" style={{ backgroundColor: theme.colors.modalBg }}>
          <div className="text-center mb-8">
            <FaUserCircle size={80} className="mx-auto mb-4" style={{ color: theme.colors.primaryText }} />
            <h1 className="text-3xl font-bold mb-4" style={{ color: theme.colors.primaryText }}>Welcome to Your Profile</h1>
            <p className="text-lg mb-6" style={{ color: theme.colors.secondaryText }}>
              Please connect your wallet to view your profile and watchlist
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
          
          <div className="border-t border-gray-700 pt-6 mt-6">
            <h2 className="text-xl font-semibold mb-4" style={{ color: theme.colors.primaryText }}>Why connect your wallet?</h2>
            <ul className="space-y-3" style={{ color: theme.colors.secondaryText }}>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Track startups and investors you're interested in
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Save your favorite profiles for quick access
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Access exclusive features and content
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Participate in the Metatron community
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Stake tokens and earn rewards
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-12" style={{ backgroundColor: theme.colors.secondaryBg }}>
      <div className="max-w-6xl mx-auto">
        <div className="rounded-lg p-8 mb-8" style={{ backgroundColor: theme.colors.modalBg }}>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 bg-gray-700">
              <FaUserCircle size={96} style={{ color: theme.colors.primaryText }} />
            </div>
            <div className="flex-grow text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2" style={{ color: theme.colors.primaryText }}>Your Profile</h1>
              <p className="mb-4" style={{ color: theme.colors.secondaryText }}>
                {userRole || "User"} • {subscription || "Free"} Plan
              </p>
            </div>
          </div>
        </div>

        {/* Staking Section */}
        <Staking />

        {/* Watchlist Section */}
        <div className="rounded-lg p-8" style={{ backgroundColor: theme.colors.modalBg }}>
          <div className="flex items-center mb-6">
            <FaHeart className="mr-3" size={24} style={{ color: theme.colors.accentButtonBg }} />
            <h2 className="text-2xl font-bold" style={{ color: theme.colors.primaryText }}>Your Watchlist</h2>
          </div>

          {loading ? (
            <div className="text-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 mx-auto mb-4" style={{ borderColor: theme.colors.accentButtonBg }}></div>
              <p style={{ color: theme.colors.secondaryText }}>Loading your watchlist...</p>
            </div>
          ) : watchlist.length === 0 ? (
            <div className="text-center py-10 border border-dashed rounded-lg p-6" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
              <p className="mb-4" style={{ color: theme.colors.secondaryText }}>
                Your watchlist is empty. Start exploring startups and investors to add them to your watchlist!
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                <button 
                  className="px-4 py-2 rounded-md font-medium"
                  style={{ backgroundColor: theme.colors.accentButtonBg, color: theme.colors.accentButtonText }}
                  onClick={() => navigate('/')}
                >
                  Browse Startups
                </button>
                <button 
                  className="px-4 py-2 rounded-md font-medium"
                  style={{ backgroundColor: theme.colors.accentButtonBg, color: theme.colors.accentButtonText }}
                  onClick={() => navigate('/investors')}
                >
                  Browse Investors
                </button>
              </div>
            </div>
          ) : (
            <div>
              {startupIds.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4" style={{ color: theme.colors.primaryText }}>Startups</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {startupIds.map((id) => (
                      <WatchlistStartupItem key={id} id={id} />
                    ))}
                  </div>
                </div>
              )}

              {investorIds.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-4" style={{ color: theme.colors.primaryText }}>Investors</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {investorIds.map((id) => (
                      <WatchlistInvestorItem key={id} id={id} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 