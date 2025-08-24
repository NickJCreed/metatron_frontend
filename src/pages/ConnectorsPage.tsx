import React from 'react';
import { useTheme } from '../context/ThemeProvider';

const ConnectorsPage: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: theme.colors.secondaryBg }}>
      {/* Header with Logo and Theme Toggle */}
      <div className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: theme.colors.modalBg, borderBottom: `1px solid ${theme.colors.borderColor}` }}>
        <div className="flex justify-between items-center px-6 py-4">
          {/* Metatron Logo */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#1DC071] to-[#17a65d] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <span className="text-2xl font-bold text-[#17a65d]">metatron</span>
          </div>
          
          {/* Theme Toggle */}
          <button
            onClick={() => {}} // TODO: Add theme toggle functionality
            className="p-3 rounded-lg transition-colors duration-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            style={{
              backgroundColor: theme.type === 'dark' ? theme.colors.secondaryButtonBg : '#e5e7eb',
              color: theme.colors.primaryText
            }}
            title={theme.type === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme.type === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 transition-colors duration-300" style={{ color: theme.colors.primaryText }}>
              🤝 Deal-makers
            </h1>
            <p className="text-xl max-w-2xl mx-auto transition-colors duration-300" style={{ color: theme.colors.secondaryText }}>
              Bridge the gap between startups and investors with our deal-maker ecosystem
            </p>
          </div>

          {/* Placeholder Content */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="p-6 rounded-lg shadow-lg transition-colors duration-300 hover:scale-105"
                style={{ backgroundColor: theme.colors.modalBg }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#1DC071] to-[#17a65d] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🤝</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-center" style={{ color: theme.colors.primaryText }}>
                  Deal-maker #{index + 1}
                </h3>
                <p className="text-sm text-center mb-4" style={{ color: theme.colors.secondaryText }}>
                  Professional intermediary connecting startups and investors
                </p>
                <button
                  className="w-full px-4 py-2 rounded-lg transition-colors duration-300"
                  style={{
                    backgroundColor: theme.colors.accentButtonBg,
                    color: theme.colors.accentButtonText
                  }}
                >
                  Connect
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectorsPage;
