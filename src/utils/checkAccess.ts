import { detectFeatures, Erc721 } from "@thirdweb-dev/sdk";
import { erc1155TokenId, minimumBalance } from "../consts/yourDetails";
import { accessContract } from "../consts/parameters";

export default async function checkBalance(address: string) {
  const contract = accessContract as unknown as Erc721; // Cast to ERC721
  const balance = await contract.balanceOf(address);
  return balance.gte(minimumBalance);
}
