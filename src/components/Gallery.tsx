import React, { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeProvider";
import { StartupCard } from "@/components/StartupCard";
import { InvestorCard } from "@/components/InvestorCard";
import useDebounce from "@/hooks/useDebounce";
import { SearchIcon } from "@/icons/SearchIcon";
import { Helmet } from "react-helmet-async";
import { NFT } from "thirdweb";
import { getContractMetadata } from "thirdweb/extensions/common";
import { getNFTs, totalSupply } from "thirdweb/extensions/erc721";
import { useReadContract } from "thirdweb/react";
import { Footer } from "@/components/Nav/Footer";
import { NFTAttribute } from '@/types/nftTypes';
import { FaFilter } from 'react-icons/fa';
import FilterMenu from './FilterMenu';

const componentMap: { [key: string]: React.FC<any> } = {
  startup: StartupCard,
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
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});

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

  // Filter NFTs based on search term
  useEffect(() => {
    let filtered = nfts || [];
    if (debouncedSearchTerm) {
      filtered = filtered.filter((nft: NFT) =>
        nft.metadata.name?.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
    }
    setFilteredNFTs(filtered);
    setTotalCount(filtered.length);
    if (debouncedSearchTerm) {
      setPage(1);
    }
  }, [debouncedSearchTerm, nfts, setTotalCount, setPage]);

  const CardComponent = componentMap[type];

  const mapAttributesToProps = (attributes: NFTAttribute[] = []) => {
    const props = {
      startupName: '',
      fundingStage: '',
      location: '',
      category: '',
    };

    attributes.forEach((attr: NFTAttribute) => {
      const value = Array.isArray(attr.value) ? attr.value.join(', ') : String(attr.value);
      switch (attr.trait_type) {
        case 'Industry':
          props.category = value;
          break;
        case 'Location':
          props.location = value;
          break;
        case 'Funding Range':
        case 'Funding Types':
          props.fundingStage = value;
          break;
        case 'name':
          props.startupName = value;
          break;
        default:
          break;
      }
    });

    return props;
  };

  const handleFilterChange = (filters: Record<string, string[]>) => {
    setActiveFilters(filters);
    if (!nfts) return;
    
    const filteredNFTs = nfts.filter(nft => {
      return Object.entries(filters).every(([trait_type, values]) => {
        if (values.length === 0) return true;
        
        if (!nft.metadata?.attributes || !Array.isArray(nft.metadata.attributes)) {
          return false;
        }
        
        const nftAttribute = nft.metadata.attributes.find((attr: any) => 
          attr && typeof attr === 'object' && attr.trait_type === trait_type
        );
        
        if (!nftAttribute) return false;
        
        // Handle array values (like Compliance)
        if (Array.isArray(nftAttribute.value)) {
          return values.some(value => nftAttribute.value.includes(value));
        }
        
        return values.includes(nftAttribute.value);
      });
    });
    
    setFilteredNFTs(filteredNFTs);
  };

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

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <div className="relative">
            <div className="flex items-center h-12 w-96 rounded-lg border border-white/10 bg-white/5 px-4 text-xl text-white">
              <SearchIcon />
              <input
                type="text"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by project name"
                className="w-full bg-transparent px-4 text-white focus:outline-none"
              />
            </div>
          </div>

          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-darkBg text-white rounded-md hover:bg-gray-700 transition-colors border border-gray-700"
          >
            <FaFilter />
            <span>Filter</span>
          </button>
        </div>

        <FilterMenu
          type={type === 'startup' ? 'startup' : 'investor'}
          onFilterChange={handleFilterChange}
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
        />

        {isLoading ? (
          <div className="mx-auto flex flex-wrap items-center justify-center gap-8 px-4 md:px-8 lg:px-16">
            {Array.from({ length: Math.min(nftsPerPage, 4) }).map((_, i) => (
              <div className="!h-60 !w-60 animate-pulse rounded-lg bg-gray-800" key={i} />
            ))}
          </div>
        ) : (
          <div className="mx-auto flex flex-wrap items-center justify-center gap-8 px-4 md:px-8 lg:px-16">
            {filteredNFTs.map((nft) => {
              const attributes = Array.isArray(nft.metadata.attributes) ? nft.metadata.attributes : [];
              const { startupName, fundingStage, location, category } = mapAttributesToProps(attributes as NFTAttribute[]);
              return (
                <CardComponent 
                  nft={nft} 
                  startupName={startupName} 
                  fundingStage={fundingStage}
                  location={location}
                  category={category}
                  key={nft.id.toString()} 
                />
              );
            })}
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
