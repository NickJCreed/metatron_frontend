import { createThirdwebClient, getContract } from "thirdweb";
import { ethereum, sepolia } from "thirdweb/chains";
import {
  createWallet,
  walletConnect,
  inAppWallet,
} from "thirdweb/wallets";
import { createCampaign, dashboard, logout, payment, profile, withdraw } from '../assets';

/** Change these values to configure the application for your own use. **/

export const client = createThirdwebClient({
  clientId: import.meta.env.VITE_TEMPLATE_CLIENT_ID,
  secretKey: import.meta.env.PRIVATE_KEY,
});

export const startupContract = getContract({
  // Your smart contract address (available on the thirdweb dashboard)
  address: import.meta.env.VITE_STARTUP_CONTRACT_ADDRESS,
  // The chain object of the chain your contract is deployed to.
  // If that chain isn't in the default list of our SDK, use `defineChain` - for example: defineChain(666666)
  chain: sepolia,
  client,
});

export const investorContract = getContract({
  // Your smart contract address (available on the thirdweb dashboard)
  address: import.meta.env.VITE_INVESTOR_CONTRACT_ADDRESS,
  // The chain object of the chain your contract is deployed to.
  // If that chain isn't in the default list of our SDK, use `defineChain` - for example: defineChain(666666)
  chain: ethereum,
  client,
});

export const connectorContract = getContract({
  // Your smart contract address (available on the thirdweb dashboard)
  address: import.meta.env.VITE_CONNECTOR_CONTRACT_ADDRESS,
  // The chain object of the chain your contract is deployed to.
  // If that chain isn't in the default list of our SDK, use `defineChain` - for example: defineChain(666666)
  chain: ethereum,
  client,
});

export const accessContract = getContract({
  // Your smart contract address (available on the thirdweb dashboard)
  address: import.meta.env.VITE_ACCESS_CONTRACT_ADDRESS,
  // The chain object of the chain your contract is deployed to.
  // If that chain isn't in the default list of our SDK, use `defineChain` - for example: defineChain(666666)
  chain: sepolia,
  client,
});

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
  },
  {
    name: 'investors',
    imgUrl: createCampaign,
    link: '/investors',
  },
  {
    name: 'connectors',
    imgUrl: payment,
    link: '/connectors',
  },
  {
    name: 'vault',
    imgUrl: withdraw,
    link: '/vault',
  },
  {
    name: 'profile',
    imgUrl: profile,
    link: '/profile',
  },
  {
    name: 'logout',
    imgUrl: logout,
    link: '/logout',
  },
];


// The block explorer you want to use (Opens when user clicks on history of events. i.e. transfers)
export const blockExplorer = "https://etherscan.io";
