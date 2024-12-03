import { createThirdwebClient, getContract } from "thirdweb";
import { ethereum, sepolia } from "thirdweb/chains";
import {
  createWallet,
  walletConnect,
  inAppWallet,
} from "thirdweb/wallets";
import { createCampaign, dashboard, logout, payment, profile, withdraw } from "@/assets";

/** Change these values to configure the application for your own use. **/

export const client = createThirdwebClient({
  clientId: import.meta.env.VITE_TEMPLATE_CLIENT_ID,
  secretKey: import.meta.env.PRIVATE_KEY,
});

// Use ReturnType to extract the type directly
export const startupContract: ReturnType<typeof getContract> = getContract({
  // Your smart contract address (available on the thirdweb dashboard)
  address: import.meta.env.VITE_STARTUP_CONTRACT_ADDRESS,
  // The chain object of the chain your contract is deployed to.
  // If that chain isn't in the default list of our SDK, use `defineChain` - for example: defineChain(666666)
  chain: sepolia,
  client,
});

export const investorContract: ReturnType<typeof getContract> = getContract({
  // Your smart contract address (available on the thirdweb dashboard)
  address: import.meta.env.VITE_INVESTOR_CONTRACT_ADDRESS,
  // The chain object of the chain your contract is deployed to.
  // If that chain isn't in the default list of our SDK, use `defineChain` - for example: defineChain(666666)
  chain: sepolia,
  client,
});

export const connectorContract: ReturnType<typeof getContract> = getContract({
  // Your smart contract address (available on the thirdweb dashboard)
  address: import.meta.env.VITE_CONNECTOR_CONTRACT_ADDRESS,
  // The chain object of the chain your contract is deployed to.
  // If that chain isn't in the default list of our SDK, use `defineChain` - for example: defineChain(666666)
  chain: sepolia,
  client,
});

export const accessContract: ReturnType<typeof getContract> = getContract({
  // Your smart contract address (available on the thirdweb dashboard)
  address: import.meta.env.VITE_ACCESS_CONTRACT_ADDRESS,
  // The chain object of the chain your contract is deployed to.
  // If that chain isn't in the default list of our SDK, use `defineChain` - for example: defineChain(666666)
  chain: sepolia,
  client,
});

export const snapshotParams = {
  space: 'metatrondao.eth',
  // Add other necessary parameters here
};

export const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  walletConnect(),
  inAppWallet({
    auth: {
      options: [
        "email",
        "google",
        "apple",
        "facebook",
        "phone",
      ],
    },
  }),
];

export const navlinks = [
  {
    name: 'startups',
    imgUrl: dashboard,
    link: '/',
    disabled: false, // todo implement logic later on according to access conditions
    contract: startupContract as any, // todo check what would be more suitable for each navlink
  },
  {
    name: 'investors',
    imgUrl: createCampaign,
    link: '/investors',
    disabled: false,
    contract: investorContract as any,
  },
  {
    name: 'connectors',
    imgUrl: payment,
    link: '/connectors',
    disabled: false,
    contract: connectorContract as any,
  },
  {
    name: 'vote',
    imgUrl: withdraw,
    link: '/vote',
    disabled: false,
  },
  {
    name: 'profile',
    imgUrl: profile,
    link: '/profile',
    disabled: false,
  },
  {
    name: 'logout',
    imgUrl: logout,
    link: '/logout',
    disabled: false, 
  },
];


// The block explorer you want to use (Opens when user clicks on history of events. i.e. transfers)
export const blockExplorer = "https://etherscan.io";


