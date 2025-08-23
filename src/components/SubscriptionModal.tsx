import React, { FC } from "react";
import { FaTimes } from 'react-icons/fa';
import { useAuth } from "@/context/AuthProvider";
import { useTheme } from "@/context/ThemeProvider";

interface SubscriptionModalProps {
  onClose: () => void;
}

const subscriptionOptions = [
  { tier: "Free", description: "Basic access", price: "$0" },
  { tier: "Basic", description: "Access to Startups and Investors", price: "$5/month" },
  { tier: "Pro", description: "Advanced features and priority support", price: "$10/month" },
  { tier: "Pro VDR", description: "All features with dedicated support", price: "$15/month" },
];

const SubscriptionModal: FC<SubscriptionModalProps> = ({ onClose }) => {
  const { isAuthorized, promptLogin, subscribe } = useAuth();
  const { theme } = useTheme();

  const handlePlanSelect = async (tier: string) => {
    if (!isAuthorized) {
      // If the user isn't logged in, prompt for login first
      promptLogin();
    } else {
      // Otherwise proceed with the subscription process (Stripe integration, etc.)
      await subscribe(tier);
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-start justify-center bg-black bg-opacity-50 z-20"
      style={{ paddingTop: "100px" }} // Increased offset from top so it doesn't cover the header
    >
      <div
        className="rounded-lg p-6 w-11/12 md:w-2/3 lg:w-1/2 max-h-[85vh] overflow-y-auto"
        style={{ backgroundColor: theme.colors.modalBg, color: theme.colors.primaryText }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Choose a Plan</h2>
          <button onClick={onClose}>
            <FaTimes size={24} />
          </button>
        </div>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">Features</th>
              <th className="border px-4 py-2">Free</th>
              <th className="border px-4 py-2">Basic ($5/month)</th>
              <th className="border px-4 py-2">Pro ($10/month)</th>
              <th className="border px-4 py-2">Pro VDR ($15/month)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">Access to Startups</td>
              <td className="border px-4 py-2">Limited</td>
              <td className="border px-4 py-2">✔️</td>
              <td className="border px-4 py-2">✔️</td>
              <td className="border px-4 py-2">✔️</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Access to Investors</td>
              <td className="border px-4 py-2">Limited</td>
              <td className="border px-4 py-2">✔️</td>
              <td className="border px-4 py-2">✔️</td>
              <td className="border px-4 py-2">✔️</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Upload Investor Lists</td>
              <td className="border px-4 py-2">✔️</td>
              <td className="border px-4 py-2">✔️</td>
              <td className="border px-4 py-2">✔️</td>
              <td className="border px-4 py-2">✔️</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Advanced Search Filters</td>
              <td className="border px-4 py-2">❌</td>
              <td className="border px-4 py-2">✔️</td>
              <td className="border px-4 py-2">✔️</td>
              <td className="border px-4 py-2">✔️</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Share Pitch Data</td>
              <td className="border px-4 py-2">❌</td>
              <td className="border px-4 py-2">✔️</td>
              <td className="border px-4 py-2">✔️</td>
              <td className="border px-4 py-2">✔️</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Verified Profile</td>
              <td className="border px-4 py-2">❌</td>
              <td className="border px-4 py-2">✔️</td>
              <td className="border px-4 py-2">✔️</td>
              <td className="border px-4 py-2">✔️</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Priority Support</td>
              <td className="border px-4 py-2">❌</td>
              <td className="border px-4 py-2">❌</td>
              <td className="border px-4 py-2">✔️</td>
              <td className="border px-4 py-2">✔️</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">On-chain Virtual Data Room</td>
              <td className="border px-4 py-2">❌</td>
              <td className="border px-4 py-2">❌</td>
              <td className="border px-4 py-2">❌</td>
              <td className="border px-4 py-2">✔️</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Join Launchpad</td>
              <td className="border px-4 py-2">❌</td>
              <td className="border px-4 py-2">❌</td>
              <td className="border px-4 py-2">❌</td>
              <td className="border px-4 py-2">✔️</td>
            </tr>
            <tr>
              <td className="border px-4 py-2"></td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handlePlanSelect('Free')}
                  className="w-full bg-gray-500 text-white py-2 rounded-md"
                >
                  Select
                </button>
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handlePlanSelect('Basic')}
                  className="w-full bg-blue-500 text-white py-2 rounded-md"
                >
                  Select
                </button>
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handlePlanSelect('Pro')}
                  className="w-full bg-blue-500 text-white py-2 rounded-md"
                >
                  Select
                </button>
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handlePlanSelect('Pro VDR')}
                  className="w-full bg-blue-500 text-white py-2 rounded-md"
                >
                  Select
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubscriptionModal;