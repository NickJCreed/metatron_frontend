import { client, startupContract, wallets } from "@/consts/parameters";
import { getContractMetadata } from "thirdweb/extensions/common";
import { getNFT } from "thirdweb/extensions/erc721";
import { ConnectButton, useReadContract } from "thirdweb/react";
import { Link } from "react-router-dom";
import logo from "@/assets/metatron-logo.svg"; // Adjust import path as needed

export const Header: React.FC = () => {
  const { data: firstNFT, isLoading: nftLoading } = useReadContract(getNFT, {
    contract: startupContract,
    tokenId: 1n,
  });
  const { data: contractMetadata, isLoading: contractLoading } =
    useReadContract(getContractMetadata, {
      contract: startupContract,
    });

  return (
    <header className="flex items-center justify-between bg-darkBg p-4">
      <div className="flex items-center space-x-4">
        <Link to="/" className="flex items-center space-x-6">
          <img src={logo} alt="Logo" className="h-12 w-12 object-contain" />
          <span className="text-2xl font-bold text-white">metatron Dashboard</span>
        </Link>
      </div>
      <div className="max-w-xs">
        <ConnectButton
          client={client}
          wallets={wallets}
          theme="dark"
          connectModal={{ size: "compact" }}
        />
      </div>
    </header>
  );
};
