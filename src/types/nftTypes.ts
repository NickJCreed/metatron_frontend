import { NFT } from "thirdweb";

// Extract NFTMetadata type from NFT
export type NFTMetadata = NFT extends { metadata: infer M } ? M : never;

// Extract NFTAttribute type from NFTMetadata
export type NFTAttribute = NFTMetadata extends { attributes: (infer A)[] } ? A : { trait_type: string; value: string | string[] | number | boolean };

// Re-export NFT to use it directly alongside these extended types
export type { NFT };
