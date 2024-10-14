import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { NFTCard } from "@/components/NFTCard";
import { InvestorCard } from "@/components/InvestorCard"; // Import the investor card
import useDebounce from "@/hooks/useDebounce";
import { SearchIcon } from "@/icons/SearchIcon";
import { Helmet } from "react-helmet";
import { NFT } from "thirdweb";
import { getContractMetadata } from "thirdweb/extensions/common";
import { getNFT, getNFTs, totalSupply } from "thirdweb/extensions/erc721";
import { useReadContract } from "thirdweb/react";
import { Footer } from "@/components/Nav/Footer"; 

// Component mapping
const componentMap: { [key: string]: React.FC<any> } = {
  startup: NFTCard,
  investor: InvestorCard,
  // Add connector and other mappings here
};

interface GalleryProps {
  contract: any;
  page: number;
  setPage: (page: number) => void;
  nftsPerPage: number;
  setTotalCount: (count: number) => void;
  type: "startup" | "investor" | "connector"; // New prop to determine card type
}

const Gallery: React.FC<GalleryProps> = ({ contract, page, setPage, nftsPerPage, setTotalCount, type }) => {
  // Add this line to log the current contract address
  console.log("Current Contract Address:", contract);

  const [search, setSearch] = useState<string>("");
  const debouncedSearchTerm = useDebounce(search, 500);

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

  const [nft, setNft] = useState<NFT | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (totalCount !== undefined) {
      setTotalCount(Number(totalCount));
    }
  }, [totalCount, setTotalCount]);

  const fetchNFT = async () => {
    const nft = await getNFT({
      contract: contract,
      tokenId: BigInt(debouncedSearchTerm),
    });
    setNft(nft!);
    setIsSearching(false);
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);
      fetchNFT();
    } else {
      setNft(null);
    }
  }, [debouncedSearchTerm]);

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
      const fundingStage = (nft.metadata.attributes as any[])?.find((attr) => attr.trait_type === "Funding Range")?.value || "Unknown";
      const fundingSeeked = "Some Value";
      const location = (nft.metadata.attributes as any[])?.find((attr) => attr.trait_type === "Location")?.value || "Unknown Location";
      const category = (nft.metadata.attributes as any[])?.find((attr) => attr.trait_type === "Industry")?.value || "Technology";

      return {
        nft,
        startupName,
        fundingStage,
        fundingSeeked,
        location,
        category,
      };
    } else if (type === "investor") {
        const investorName = nft.metadata.name || "Unknown Investor";
        const hq = (nft.metadata.attributes as any[])?.find((attr) => attr.trait_type === "Location")?.value || "Unknown HQ";
        const investmentStage = (nft.metadata.attributes as any[])?.find((attr) => attr.trait_type === "Funding Range")?.value || "Unknown Stage";
        const fundType = (nft.metadata.attributes as any[])?.find((attr) => attr.trait_type === "Funding Types")?.value || "Unknown Fund Type";
        
        return {
          nft,
          investorName, // Pass investor name directly
          hq,              // Pass HQ directly
          investmentStage, // Pass investment stage directly
          fundType,        // Pass fund type directly
        };
      }
    // Other mappings for different types
  };

  const CardComponent = componentMap[type]; // Get the appropriate card component

  return (
    <div className="m-0 bg-[#0A0A0A] p-0 font-inter text-neutral-200">
      <Helmet>
        <title>{contractMetadata?.name}</title>
      </Helmet>

      <div className="z-20 mx-auto flex min-h-screen w-full flex-col px-4">
        {contractMetadata ? (
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-white">
              {contractMetadata.name}
            </h1>
            <h2 className="text-xl font-bold text-white">
              {contractMetadata.description}
            </h2>
          </div>
        ) : contractLoading ? (
          <div className="mx-auto mb-8 text-center">
            <div className="mx-auto h-8 w-96 animate-pulse rounded-lg bg-gray-800" />
            <div className="mx-auto mt-4 h-8 w-96 animate-pulse rounded-lg bg-gray-800" />
          </div>
        ) : null}

        <div className="mx-auto mb-8 flex h-12 w-96 max-w-full items-center rounded-lg border border-white/10 bg-white/5 px-4 text-xl text-white">
          <SearchIcon />
          <input
            type="number"
            onChange={(e) => {
              if (
                e.target.value.match(/^[0-9]*$/) &&
                Number(e.target.value) > 0
              ) {
                setSearch(e.target.value);
              } else {
                setSearch("");
              }
            }}
            placeholder="Search by project name"
            className="w-full bg-transparent px-4 text-white focus:outline-none"
          />
        </div>

        {isSearching ? (
          <div className="mx-auto !h-60 !w-60 animate-pulse rounded-lg bg-gray-800" />
        ) : null}

        {search && nft && !isSearching ? (
          <CardComponent {...mapNFTToProps(nft)} key={nft.id.toString()} />
        ) : null}

        {isLoading && (
          <div className="mx-auto flex flex-wrap items-center justify-center gap-8">
            {Array.from({ length: nftsPerPage }).map((_, i) => (
              <div
                className="!h-60 !w-60 animate-pulse rounded-lg bg-gray-800"
                key={i}
              />
            ))}
          </div>
        )}

        {nfts && !search && (
          <div className="flex flex-wrap items-center justify-center gap-8">
            {nfts.map((nft) => (
              <CardComponent {...mapNFTToProps(nft)} key={nft.id.toString()} />
            ))}
          </div>
        )}
        <Footer
          page={page}
          setPage={setPage}
          nftsPerPage={nftsPerPage}
          totalCount={Number(totalCount)}
          loading={isLoading}
        />
      </div>
    </div>
  );
};

export default Gallery;