import { detectFeatures } from "@thirdweb-dev/sdk";
import {
  erc1155TokenId,
  minimumBalance,
} from "../consts/yourDetails";
import { accessContract } from "../consts/parameters";

export default async function checkBalance(address) {
  const contract = accessContract;
  let balance;

  balance = await contract.erc721.balanceOf(address);
  return balance.gte(minimumBalance);
}
