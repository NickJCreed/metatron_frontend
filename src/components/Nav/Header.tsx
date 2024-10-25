import { useTheme } from "@/context/ThemeProvider"; // Ensure you are importing from ThemeContext, not ThemeProvider
import { client, startupContract, wallets } from "@/consts/parameters";
import { getContractMetadata } from "thirdweb/extensions/common";
import { getNFT } from "thirdweb/extensions/erc721";
import { ConnectButton, useReadContract } from "thirdweb/react";
import { Link } from "react-router-dom";
import { logo } from "@/assets";

export const Header: React.FC = () => {
  const { theme } = useTheme(); 
  const { data: firstNFT, isLoading: nftLoading } = useReadContract(getNFT, {
    contract: startupContract,
    tokenId: 1n,
  });
  const { data: contractMetadata, isLoading: contractLoading } = useReadContract(getContractMetadata, {
    contract: startupContract,
  });

  return (
    <header
      className="flex items-center justify-between p-4"
      style={{
        backgroundColor: theme.colors.secondaryButtonBg, 
        color: theme.colors.primaryText, 
      }}
    >
      <div className="flex items-center space-x-4">
        <Link to="/" className="flex items-center space-x-6">
          <img src={logo} alt="Logo" className="h-12 w-12 object-contain" />
          <span style={{ color: theme.colors.primaryText }} className="text-2xl font-bold">
            metatron Dashboard
          </span>
        </Link>
      </div>
      <div className="max-w-xs">
        <ConnectButton
          client={client}
          wallets={wallets}
          theme={theme}
          connectModal={{ size: "compact" }}
          connectButton={{ label: "Sign In" }}
        />
      </div>
    </header>
  );
};
