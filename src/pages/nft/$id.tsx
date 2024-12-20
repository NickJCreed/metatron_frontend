import { useEffect } from "react";
import { useTheme } from "@/context/ThemeProvider"; 
import { useParams, useNavigate } from "react-router-dom";
import { HistoryCard } from "@/components/HistoryCard";
import { client } from "@/consts/parameters";
import { Helmet } from "react-helmet-async";
import {
  MediaRenderer,
  useContractEvents,
  useReadContract,
} from "thirdweb/react";

import { getNFT, transferEvent } from "thirdweb/extensions/erc721";
import { getContractMetadata } from "thirdweb/extensions/common";
import { useAuth } from "@/context/AuthProvider"; 
import { useContract } from "@/context/ContractProvider";
import { NFTAttribute } from "@/types/nftTypes";

const NFTPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { contract } = useContract();
  const { isAuthorized } = useAuth();

  const { data: nft, isLoading, error } = useReadContract(getNFT, {
    contract: contract,
    tokenId: BigInt(id as string),
  });
  const { data: contractMetadata } = useReadContract(getContractMetadata, {
    contract: contract,
  });
  const { data: eventsData, isLoading: eventsLoading } = useContractEvents({
    contract: contract,
    events: [
      transferEvent({
        tokenId: BigInt(id as string),
      }),
    ],
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (error) {
      console.error("Error reading contract:", error);
    }
  }, [error]);

  // Mapping the NFT attributes to specific props
  const getAttributeValue = (attributes: NFTAttribute[], traitType: string) => {
    const attribute = attributes.find(
      (attr) => attr.trait_type === traitType
    );
    return attribute ? attribute.value : "N/A";
  };

  return (
    <div className="m-0 mt-10 min-h-screen p-8 pb-20 font-inter text-neutral-200" style={{background: theme.colors.secondaryBg}}>
      {/* <Helmet>
        <title style={{color: theme.colors.primaryText}}>{nft?.metadata.name || "NFT Profile"}</title>
      </Helmet> */}

      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col md:flex-row">
        <div className="flex flex-col md:min-h-screen md:w-1/2">
          {nft ? (
            <MediaRenderer
              client={client}
              src={nft?.metadata.image}
              className="!w-full mb-5 !max-w-[90vw] !md:max-w-[600px] !h-auto !rounded-lg !object-cover"
            />
          ) : (
            isLoading && (
              <div className="h-full max-h-[600px] w-full !max-w-[600px] animate-pulse rounded-lg bg-gray-800 md:h-96 md:w-96" />
            )
          )}

          {eventsData && eventsData?.length > 0 ? (
            <p 
              className="mt-8 hidden text-lg font-semibold uppercase md:flex"
              style={{color: theme.colors.primaryText}}
              >
              History
            </p>
          ) : (
            isLoading && (
              <div 
                className="mt-8 hidden h-8 w-1/2 animate-pulse rounded-lg md:flex" 
                style={{color: theme.colors.primaryText}}
                />
            )
          )}

          {eventsLoading ? (
            <div 
              className="mt-2 hidden h-8 w-1/2 animate-pulse rounded-lg md:flex" 
              style={{color: theme.colors.primaryText}}
              />
          ) : (
            <div className="mt-4 hidden flex-col gap-4 md:flex">
              {eventsData?.map((event) => (
                <HistoryCard event={event} key={event.transactionHash} />
              ))}
            </div>
          )}
        </div>

        <div className="md:mt-10 flex w-full md:pt-20 flex-col gap-6 md:mt-0 md:min-h-screen md:w-1/2">
          <div className="flex flex-col">
            {contractMetadata?.name ? (
              <p 
                className="text-lg font-semibold uppercase"
                style={{color: theme.colors.tertiaryText}}
                >
                Collection
              </p>
            ) : (
              isLoading && (
                <div className="mt-2 h-8 w-1/2 animate-pulse rounded-lg bg-gray-800" />
              )
            )}

            {isLoading ? (
              <div className="mt-2 h-8 w-1/2 animate-pulse rounded-lg bg-gray-800" />
            ) : (
              <p 
                className="text-3xl font-bold"
                style={{color: theme.colors.primaryText}}
                >
                {contractMetadata?.name}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <p 
              className="text-lg font-semibold uppercase"
              style={{color: theme.colors.tertiaryText}}
              >
              #{id}
            </p>

            {nft?.metadata.name ? (
              <p 
                className="text-3xl font-bold"
                style={{color: theme.colors.primaryText}}
                >
                {String(nft?.metadata.name).split("#")[0]}
              </p>
            ) : (
              isLoading && (
                <div className="mt-2 h-8 w-1/2 animate-pulse rounded-lg bg-gray-800" />
              )
            )}
          </div>

          <div className="flex flex-col mb-4">
            {nft?.metadata.description ? (
              <p 
                className="text-lg font-semibold uppercase"
                style={{color: theme.colors.tertiaryText}}
                >
                Description
              </p>
            ) : (
              isLoading && (
                <div className="mt-8 h-8 w-1/2 animate-pulse rounded-lg bg-gray-800" />
              )
            )}

            {isLoading ? (
              <div className="mt-2 h-8 w-1/2 animate-pulse rounded-lg bg-gray-800" />
            ) : (
              <p 
                className="text-lg font-medium"
                style={{color: theme.colors.primaryText}}
                >
                {nft?.metadata.description}
              </p>
            )}
          </div>

          {isAuthorized && (
            <div className="-mt-4 flex flex-col gap-4">
              {nft?.metadata.attributes && (nft.metadata.attributes as unknown as NFTAttribute[]).length > 0 && (
                <>
                  {isLoading ? (
                    <div className="mt-2 h-8 w-1/2 animate-pulse rounded-lg bg-gray-800" />
                  ) : (
                    <>
                      <p 
                        className="text-lg font-semibold uppercase"
                        style={{color: theme.colors.tertiaryText}}
                        >
                        Attributes
                      </p>
                      <div className="flex flex-wrap gap-4">
                        {(nft.metadata.attributes as unknown as NFTAttribute[]).map((attr) => (
                          <div
                            className="w-[85vw] flex flex-col rounded-lg border border-gray-700 p-4 overflow-hidden"
                            key={attr.trait_type}
                          >
                            <h2 
                              className="text-sm font-semibold"
                              style={{color: theme.colors.tertiaryText}}
                              >
                              {attr.trait_type}
                            </h2>
                            <h1 
                              className="text-xl font-semibold"
                              style={{color: theme.colors.accentButtonText}}
                              >
                              {Array.isArray(attr.value)
                                ? attr.value.join(", ")
                                : attr.value}
                            </h1>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NFTPage;
