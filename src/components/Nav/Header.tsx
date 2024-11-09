import { useTheme } from "@/context/ThemeProvider"; 
import { client, startupContract, wallets } from "@/consts/parameters";
import { getContractMetadata } from "thirdweb/extensions/common";
import { getNFT } from "thirdweb/extensions/erc721";
import { ConnectButton, useReadContract } from "thirdweb/react";
import { generateThirdWebTheme } from "@/utils/thirdwebTheme";
import { Link } from "react-router-dom";
import { metatron-logo } from "@/assets";

export const Header: React.FC = () => {
  const { theme } = useTheme(); 
  const customTheme = generateThirdWebTheme(theme.type); // Theme definitions for thirdweb imported components

  const { data: firstNFT, isLoading: nftLoading } = useReadContract(getNFT, {
    contract: startupContract,
    tokenId: 1n,
  });
  const { data: contractMetadata, isLoading: contractLoading } = useReadContract(getContractMetadata, {
    contract: startupContract,
  });

  return (
    <header
      className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between p-2 md:p-4"
      style={{
        backgroundColor: theme.colors.secondaryButtonBg, 
        color: theme.colors.primaryText, 
      }}
    >
      <div className="flex items-center space-x-1 sm:space-x-3 md:space-x-4">
        <Link to="/" className="flex items-center space-x-1 sm:space-x-2 md:space-x-6">
          {/* Logo */}
          <img 
            src={metatron-logo} 
            alt="Logo" 
            className="h-8 w-8 object-contain md:h-12 md:w-12" 
          />
          {/* Dashboard Text */}
          <span 
            style={{ color: theme.colors.primaryText }}
            className="text-lg font-bold hidden sm:inline md:text-2xl"
          >
            metatron Dashboard
          </span>
        </Link>
      </div>
      <div className="max-w-xs flex-shrink-0">
        <ConnectButton
          client={client}
          wallets={wallets}
          theme={customTheme}
          connectModal={{ size: "compact" }}
          connectButton={{ 
            label: "Sign In",
            className: "hidden sm:inline-block text-sm md:text-base" 
          }}
        />
      </div>
    </header>
  );
};
