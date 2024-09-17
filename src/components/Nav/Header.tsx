import { client, startupContract, wallets } from "@/consts/parameters";
import { getContractMetadata } from "thirdweb/extensions/common";
import { getNFT } from "thirdweb/extensions/erc721";
import { ConnectButton, useReadContract } from "thirdweb/react";
import { Link } from "react-router-dom";
import logo from "@/assets/metatron-logo.svg"; // Adjust import path as needed

const customTheme = {
  colors: {
    accentButtonBg: "#1DC07", // Green background for primary buttons like Sign In
    accentButtonText: "#ffffff", // White text for buttons
    primaryButtonBg: "#1DC071", // Ensure primary button matches the accent color
    primaryButtonText: "#ffffff", // White text for primary buttons
    connectedButtonBg: "#17a65d", // Slightly darker green when connected
    connectedButtonBgHover: "#158a50", // Even darker green on hover
    borderColor: "#2c2f32", // Border color to match your dark theme
    modalBg: "#1c1c24", // Background for modals to match the dark theme
    modalOverlayBg: "rgba(0, 0, 0, 0.8)", // Semi-transparent overlay background
    secondaryButtonBg: "#2c2f32", // Secondary button background color
    secondaryButtonHoverBg: "#383b40", // Hover color for secondary buttons
    secondaryButtonText: "#ffffff", // White text for secondary buttons
    tooltipBg: "#1c1c24", // Tooltip background
    tooltipText: "#ffffff", // Tooltip text

    // Additional necessary adjustments:
    primaryText: "#ffffff", // White text for the primary text in the modal
    secondaryText: "#b0b3b8", // Slightly lighter text for secondary elements
    inputAutofillBg: "#2c2f32", // Background color for autofill input
    separatorLine: "#383b40", // Line color for separating sections
    tertiaryBg: "#2c2f32", // Background for tertiary elements, like inputs
    scrollbarBg: "#1c1c24", // Scrollbar background color if applicable
    selectedTextBg: "#383b40", // Background color for selected text or active inputs
    selectedTextColor: "#ffffff", // Text color for selected text or active inputs
    skeletonBg: "#383b40", // Background color for loading skeletons if used
    success: "#1DC071", // Success color for elements like checkmarks
  },
  fontFamily: "'Helvetica Neue', sans-serif", // Ensure a modern, clean font
  type: "dark", // Since your theme is dark
};


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
          theme={customTheme}
          connectModal={{ size: "compact" }}
          connectButton={{ label: "Sign In" }}

        />
      </div>
    </header>
  );
};
