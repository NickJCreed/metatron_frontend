import React, { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeProvider";
import { NFTCard } from "@/components/NFTCard";
import { InvestorCard } from "@/components/InvestorCard";
import useDebounce from "@/hooks/useDebounce";
import { SearchIcon } from "@/icons/SearchIcon";
import { Helmet } from "react-helmet-async";
import { NFT } from "thirdweb";
import { getContractMetadata } from "thirdweb/extensions/common";
import { getNFTs, totalSupply } from "thirdweb/extensions/erc721";
import { useReadContract } from "thirdweb/react";
import { Footer } from "@/components/Nav/Footer";
import { NFTAttribute } from "@/types/nftTypes";

// Component mapping
const componentMap: { [key: string]: React.FC<any> } = {
  startup: NFTCard,
  investor: InvestorCard,
  // Add connector and other mappings here if needed
};

interface GalleryProps {
  contract: any;
  page: number;
  setPage: (page: number) => void;
  nftsPerPage: number;
  setTotalCount: (count: number) => void;
  type: "startup" | "investor" | "connector";
}

const Gallery: React.FC<GalleryProps> = ({ contract, page, setPage, nftsPerPage, setTotalCount, type }) => {
  const { theme } = useTheme();
  const [search, setSearch] = useState<string>("");
  const debouncedSearchTerm = useDebounce(search, 500);
  const [filteredNFTs, setFilteredNFTs] = useState<NFT[]>([]);

  const start = BigInt((page - 1) * nftsPerPage);
  const count = BigInt(nftsPerPage);

  const { data: nfts, isLoading, refetch: refetchNFTs } = useReadContract(getNFTs, {
    contract: contract,
    count: Number(count),
    start: Number(start),
  });

  const { data: totalCount, refetch: refetchTotalCount } = useReadContract(totalSupply, {
    contract: contract,
  });

  const { data: contractMetadata, isLoading: contractLoading, refetch: refetchContractMetadata } =
    useReadContract(getContractMetadata, {
      contract: contract,
    });

  useEffect(() => {
    if (totalCount !== undefined) {
      setTotalCount(Number(totalCount));
    }
  }, [totalCount, setTotalCount]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      const filteredResults = nfts?.filter((nft: NFT) =>
        nft.metadata.name?.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
      setFilteredNFTs(filteredResults || []);
    } else {
      setFilteredNFTs(nfts || []);
    }
  }, [debouncedSearchTerm, nfts]);

  useEffect(() => {
    setPage(1); // Reset page when contract changes
  }, [contract, setPage]);

  useEffect(() => {
    refetchNFTs();
    refetchTotalCount();
    refetchContractMetadata();
  }, [contract, page, refetchNFTs, refetchTotalCount, refetchContractMetadata]);

  const mapNFTToProps = (nft: NFT) => {
    if (type === "startup") {
      const startupName = nft.metadata.name || "Unknown Startup";
      const fundingStage = (nft.metadata.attributes as unknown as NFTAttribute[])?.find((attr) => attr.trait_type === "Funding Range")?.value || "Unknown";
      const location = (nft.metadata.attributes as unknown as NFTAttribute[])?.find((attr) => attr.trait_type === "Location")?.value || "Unknown Location";
      const category = (nft.metadata.attributes as unknown as NFTAttribute[])?.find((attr) => attr.trait_type === "Industry")?.value || "Technology";

      return { nft, startupName, fundingStage, location, category };
    } else if (type === "investor") {
      const investorName = nft.metadata.name || "Unknown Investor";
      const hq = (nft.metadata.attributes as unknown as NFTAttribute[])?.find((attr) => attr.trait_type === "Location")?.value || "Unknown HQ";
      const investmentStage = (nft.metadata.attributes as unknown as NFTAttribute[])?.find((attr) => attr.trait_type === "Funding Range")?.value || "Unknown Stage";
      const fundType = (nft.metadata.attributes as unknown as NFTAttribute[])?.find((attr) => attr.trait_type === "Funding Types")?.value || "Unknown Fund Type";

      return { nft, investorName, hq, investmentStage, fundType };
    }
  };

  const CardComponent = componentMap[type];

  return (
    <div className="m-0 pt-20 font-inter text-neutral-200" style={{ backgroundColor: theme.colors.secondaryBg }}>
      <Helmet>
        <title>{contractMetadata?.name}</title>
      </Helmet>

      <div className="z-20 mx-auto flex min-h-screen w-full flex-col px-4">
        {contractMetadata ? (
          <div className="mb-8 mt-8 text-center">
            <h1 className="text-4xl font-bold" style={{ color: theme.colors.primaryText }}>{contractMetadata.name}</h1>
            <h2 className="text-xl font-bold" style={{ color: theme.colors.primaryText }}>{contractMetadata.description}</h2>
          </div>
        ) : contractLoading ? (
          <div className="mx-auto mb-8 text-center">
            <div className="mx-auto h-8 w-96 animate-pulse rounded-lg bg-gray-800" />
            <div className="mx-auto mt-4 h-8 w-96 animate-pulse rounded-lg bg-gray-800" />
          </div>
        ) : null}

        <div
          className="mx-auto mb-8 flex h-12 w-96 max-w-full items-center rounded-lg border px-4 text-xl"
          style={{
            backgroundColor: theme.colors.secondaryBg,
            color: theme.colors.primaryText,
            borderColor: theme.colors.borderColor,
          }}
        >
          <SearchIcon />
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by project name"
            className="w-full bg-transparent px-4 focus:outline-none"
            style={{
              color: theme.colors.primaryText,
            }}
          />
        </div>

        {isLoading ? (
          <div className="mx-auto flex flex-wrap items-center justify-center gap-8">
            {Array.from({ length: nftsPerPage }).map((_, i) => (
              <div className="!h-60 !w-60 animate-pulse rounded-lg bg-gray-800" key={i} />
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-8">
            {filteredNFTs.map((nft) => (
              <CardComponent {...mapNFTToProps(nft)} key={nft.id.toString()} />
            ))}
          </div>
        )}

        <Footer page={page} setPage={setPage} nftsPerPage={nftsPerPage} totalCount={Number(totalCount)} loading={isLoading} />
      </div>
    </div>
  );
};

export default Gallery;
