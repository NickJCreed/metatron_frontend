import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { useAuth } from "@/context/AuthProvider";
import { useTheme } from "@/context/ThemeProvider";

interface SubscriptionModalProps {
  onClose: () => void;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ onClose }) => {
  const { isAuthorized, subscribe } = useAuth(); // Assume 'subscribe' is a method in AuthContext
  const { theme } = useTheme();

  const handlePlanSelect = (plan: string) => {
    // Trigger subscription process for the selected plan
    subscribe(plan);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
      <div
        className="bg-white dark:bg-gray-800 rounded-lg p-6 w-11/12 md:w-2/3 lg:w-1/2"
        style={{ backgroundColor: theme.colors.modalBg }} // Adjust based on theme
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
              <th className="border px-4 py-2">Basic ($5/month)</th>
              <th className="border px-4 py-2">Pro ($10/month)</th>
              <th className="border px-4 py-2">Enterprise ($20/month)</th>
              <th className="border px-4 py-2">Free</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">Access to Startups</td>
              <td className="border px-4 py-2">✔️</td>
              <td className="border px-4 py-2">✔️</td>
              <td className="border px-4 py-2">✔️</td>
              <td className="border px-4 py-2">Limited</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Access to Investors</td>
              <td className="border px-4 py-2">✔️</td>
              <td className="border px-4 py-2">✔️</td>
              <td className="border px-4 py-2">✔️</td>
              <td className="border px-4 py-2">Limited</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Advanced Search Filters</td>
              <td className="border px-4 py-2">❌</td>
              <td className="border px-4 py-2">✔️</td>
              <td className="border px-4 py-2">✔️</td>
              <td className="border px-4 py-2">❌</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Priority Support</td>
              <td className="border px-4 py-2">❌</td>
              <td className="border px-4 py-2">✔️</td>
              <td className="border px-4 py-2">✔️</td>
              <td className="border px-4 py-2">❌</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Verified Profile</td>
              <td className="border px-4 py-2">✔️</td>
              <td className="border px-4 py-2">✔️</td>
              <td className="border px-4 py-2">✔️</td>
              <td className="border px-4 py-2">❌</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Exclusive Deals</td>
              <td className="border px-4 py-2">❌</td>
              <td className="border px-4 py-2">❌</td>
              <td className="border px-4 py-2">✔️</td>
              <td className="border px-4 py-2">❌</td>
            </tr>
            <tr>
              <td className="border px-4 py-2"></td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handlePlanSelect('basic')}
                  className="w-full bg-blue-500 text-white py-2 rounded-md"
                >
                  Select
                </button>
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handlePlanSelect('pro')}
                  className="w-full bg-blue-500 text-white py-2 rounded-md"
                >
                  Select
                </button>
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handlePlanSelect('enterprise')}
                  className="w-full bg-blue-500 text-white py-2 rounded-md"
                >
                  Select
                </button>
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handlePlanSelect('free')}
                  className="w-full bg-gray-500 text-white py-2 rounded-md"
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
