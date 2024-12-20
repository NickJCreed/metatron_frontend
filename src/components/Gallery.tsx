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

// Define a mapping for component types
const componentMap: { [key: string]: React.FC<any> } = {
  startup: NFTCard,
  investor: InvestorCard,
};

interface GalleryProps {
  contract: any;
  page: number;
  setPage: (page: number) => void;
  nftsPerPage: number;
  setTotalCount: (count: number) => void;
  type: "startup" | "investor" | "connector";
}

const Gallery: React.FC<GalleryProps> = ({
  contract,
  page,
  setPage,
  nftsPerPage,
  setTotalCount,
  type,
}) => {
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

  const { data: totalCountData, refetch: refetchTotalCount } = useReadContract(totalSupply, {
    contract: contract,
  });

  const { data: contractMetadata, isLoading: contractLoading, refetch: refetchContractMetadata } =
    useReadContract(getContractMetadata, {
      contract: contract,
    });

  useEffect(() => {
    if (totalCountData !== undefined && !debouncedSearchTerm) {
      setTotalCount(Number(totalCountData));
    }
  }, [totalCountData, setTotalCount, debouncedSearchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      // Implement Firestore search if applicable
      // For now, continue with client-side filtering
      const filteredResults = nfts?.filter((nft: NFT) =>
        nft.metadata.name?.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
      setFilteredNFTs(filteredResults || []);
      setTotalCount(filteredResults ? filteredResults.length : 0);
      setPage(1); // Reset to first page when searching
    } else {
      setFilteredNFTs(nfts || []);
    }
  }, [debouncedSearchTerm, nfts, setTotalCount, setPage]);

  const CardComponent = componentMap[type];

  return (
    <div className="m-0 pt-20 pb-20 font-inter text-neutral-200 max-w-full" style={{ backgroundColor: theme.colors.secondaryBg }}>
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
          className="mx-auto mb-8 flex h-12 mx-auto max-w-full items-center rounded-lg border px-4 text-xl"
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
          <div className="mx-auto flex flex-wrap items-center justify-center gap-8 px-4 md:px-8 lg:px-16">
            {Array.from({ length: Math.min(nftsPerPage, 4) }).map((_, i) => (
              <div className="!h-60 !w-60 animate-pulse rounded-lg bg-gray-800" key={i} />
            ))}
          </div>
        ) : (
          <div className="mx-auto flex flex-wrap items-center justify-center gap-8 px-4 md:px-8 lg:px-16">
            {filteredNFTs.map((nft) => (
              <CardComponent 
                nft={nft} 
                startupName={nft.metadata.startupName} 
                fundingStage={nft.metadata.fundingStage}
                location={nft.metadata.location}
                category={nft.metadata.category}
                key={nft.id.toString()} 
              />
            ))}
          </div>
        )}

        <Footer   
          page={page}
          setPage={setPage}
          nftsPerPage={nftsPerPage}
          totalCount={Number(totalCountData)}
          loading={isLoading} 
        />
      </div>
    </div>
  );
};

export default Gallery;
