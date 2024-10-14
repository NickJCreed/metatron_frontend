import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { HistoryCard } from "@/components/HistoryCard";
import { PoweredBy } from "@/components/PoweredBy";
import { client } from "@/consts/parameters";
import { truncateAddress } from "@/utils/truncateAddress";
import { Helmet } from "react-helmet";
import {
  MediaRenderer,
  useContractEvents,
  useReadContract,
} from "thirdweb/react";

import { getNFT, transferEvent } from "thirdweb/extensions/erc721";
import { getContractMetadata } from "thirdweb/extensions/common";
import { useContract, useAuth } from "@/App"; // Adjust the import path as necessary

const NFTPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
  const getAttributeValue = (attributes: any[], traitType: string) => {
    const attribute = attributes.find(
      (attr) => attr.trait_type === traitType
    );
    return attribute ? attribute.value : "N/A";
  };

  return (
    <div className="m-0 min-h-screen bg-[#0A0A0A] p-0 font-inter text-neutral-200">
      <Helmet>
        <title>{nft?.metadata.name || "NFT Profile"}</title>
      </Helmet>

      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 md:flex-row">
        <div className="flex flex-col px-10 md:min-h-screen md:w-1/2">
          <div className="mb-4 flex space-x-4">
            <button
              onClick={() => navigate(-1)} // Navigate back to the previous page
              className="text-white bg-[#20c474] hover:bg-[#a8d8c1] font-bold py-2 px-4 rounded-full"
            >
              Back
            </button>
            <button
              onClick={() => navigate(`/nft/${Number(id) - 1}`)} // Navigate to the previous NFT
              className="text-white bg-[#347854] hover:bg-[#2e6a4a] font-bold py-2 px-4 rounded-full"
            >
              &larr;
            </button>
            <button
              onClick={() => navigate(`/nft/${Number(id) + 1}`)} // Navigate to the next NFT
              className="text-white bg-[#347854] hover:bg-[#2e6a4a] font-bold py-2 px-4 rounded-full"
            >
              &rarr;
            </button>
          </div>
          {nft ? (
            <MediaRenderer
              client={client}
              src={nft?.metadata.image}
              className="!md:h-96 !md:w-96 !h-full !max-h-[600px] !w-full !max-w-[600px] !rounded-lg !object-cover"
            />
          ) : (
            isLoading && (
              <div className="h-full max-h-[600px] w-full !max-w-[600px] animate-pulse rounded-lg bg-gray-800 md:h-96 md:w-96" />
            )
          )}

          {eventsData && eventsData?.length > 0 ? (
            <p className="mt-8 hidden text-lg font-semibold uppercase text-[#646D7A] md:flex">
              History
            </p>
          ) : (
            isLoading && (
              <div className="mt-8 hidden h-8 w-1/2 animate-pulse rounded-lg bg-gray-800 md:flex" />
            )
          )}

          {eventsLoading ? (
            <div className="mt-2 hidden h-8 w-1/2 animate-pulse rounded-lg bg-gray-800 md:flex" />
          ) : (
            <div className="mt-4 hidden flex-col gap-4 md:flex">
              {eventsData?.map((event) => (
                <HistoryCard event={event} key={event.transactionHash} />
              ))}
            </div>
          )}
        </div>

        <div className="mt-10 flex w-full flex-col gap-6 px-10 md:mt-0 md:min-h-screen md:w-1/2">
          <div className="flex flex-col">
            {contractMetadata?.name ? (
              <p className="text-lg font-semibold uppercase text-[#646D7A]">
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
              <p className="text-3xl font-bold text-white">
                {contractMetadata?.name}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <p className="text-lg font-semibold uppercase text-[#646D7A]">
              #{id}
            </p>

            {nft?.metadata.name ? (
              <p className="text-3xl font-bold text-white">
                {String(nft?.metadata.name).split("#")[0]}
              </p>
            ) : (
              isLoading && (
                <div className="mt-2 h-8 w-1/2 animate-pulse rounded-lg bg-gray-800" />
              )
            )}
          </div>

          <div className="flex flex-col">
            {nft?.metadata.description ? (
              <p className="text-lg font-semibold uppercase text-[#646D7A]">
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
              <p className="text-lg font-medium text-white">
                {nft?.metadata.description}
              </p>
            )}
          </div>

          <div className="-mt-4 flex flex-col gap-4">
            {nft?.metadata.attributes && (nft.metadata.attributes as any[]).length > 0 && (
              <>
                {isLoading ? (
                  <div className="mt-2 h-8 w-1/2 animate-pulse rounded-lg bg-gray-800" />
                ) : (
                  <>
                    <p className="text-lg font-semibold uppercase text-[#646D7A]">
                      Attributes
                    </p>
                    <div className="flex flex-wrap gap-4">
                      {(nft.metadata.attributes as any[]).map(
                        (attr: { trait_type: string; value: string | string[] }) => (
                          <div
                            className="flex flex-col rounded-lg border border-gray-700 p-4"
                            key={attr.trait_type}
                          >
                            <h2 className="text-sm font-semibold text-[#646D7A]">
                              {attr.trait_type}
                            </h2>
                            <h1 className="text-xl font-semibold text-gray-200">
                              {Array.isArray(attr.value)
                                ? attr.value.join(", ")
                                : attr.value}
                            </h1>
                          </div>
                        )
                      )}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTPage;
