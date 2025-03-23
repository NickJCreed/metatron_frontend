import { getContract } from "thirdweb";
import { STAKING_CONTRACT_ABI } from "./stakingContractABI";
import { client } from "../../consts/parameters";
import { sepolia } from "thirdweb/chains";

// Replace these placeholder addresses with actual contract addresses
// These would normally be in environment variables
const tokenContractAddress = "0xTokenContractAddress"; // Replace with actual token contract address
const stakingContractAddress = "0xStakingContractAddress"; // Replace with actual staking contract address

// Our token is used for both staking and rewards in this case
export const TOKEN_CONTRACT = getContract({
  client: client,
  chain: sepolia,
  address: tokenContractAddress,
});

export const STAKING_CONTRACT = getContract({
  client: client,
  chain: sepolia,
  address: stakingContractAddress,
  abi: STAKING_CONTRACT_ABI,
});

// Utility functions for converting between Ether and Wei
export const toWei = (amount: string): bigint => {
  return BigInt(parseFloat(amount) * 10 ** 18);
};

export const toEther = (amount: bigint | undefined): number => {
  if (!amount) return 0;
  return Number(amount) / 10 ** 18;
}; 