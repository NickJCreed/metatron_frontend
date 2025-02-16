// thirdwebAuth.js
import { ThirdwebAuth } from "@thirdweb-dev/auth";
import { ethers } from "ethers";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { auth } from "./firebase";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

const thirdwebAuth = new ThirdwebAuth({
  domain: "your-domain.com", // Use your custom domain here
  provider,
});

export const loginWithWeb3 = async () => {
  try {
    // Request the user to sign a message with their wallet
    const payload = await thirdwebAuth.sign(signer);

    // Send the signed message to Firebase to get a custom token
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ payload }),
    });

    const { token } = await response.json();

    // Sign in to Firebase with the custom token
    await signInWithCustomToken(auth, token);
    console.log("User signed in with Web3!");
  } catch (error) {
    console.error("Web3 login failed:", error);
  }
};
