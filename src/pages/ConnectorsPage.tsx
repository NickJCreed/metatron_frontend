import React from 'react';
import { useTheme } from '../context/ThemeProvider';
import { logo } from '../assets';

interface ConnectorsPageProps {
  onNavigate: (page: string) => void;
}

const ConnectorsPage: React.FC<ConnectorsPageProps> = ({ onNavigate }) => {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: theme.colors.secondaryBg }}>
      {/* Header with Logo and Theme Toggle */}
      <div className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: theme.colors.modalBg, borderBottom: `1px solid ${theme.colors.borderColor}` }}>
        <div className="flex justify-between items-center px-6 py-4">
          {/* Metatron Logo */}
          <div className="flex items-center space-x-4">
            <img src={logo} alt="Metatron Logo" className="w-12 h-12" />
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

      {/* Main Layout with Sidebar and Content */}
      <div className="flex pt-24">
        {/* Left Sidebar Navigation */}
        <div className="fixed left-0 top-24 w-64 h-screen z-40" style={{ backgroundColor: theme.colors.modalBg, borderRight: `1px solid ${theme.colors.borderColor}` }}>
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-6" style={{ color: theme.colors.primaryText }}>
              Navigation
            </h2>
            
            {/* Navigation Buttons */}
            <div className="space-y-3">
              <button
                className="w-full text-left px-4 py-3 rounded-lg transition-colors duration-300 hover:scale-105 flex items-center space-x-3"
                style={{
                  backgroundColor: theme.colors.secondaryButtonBg,
                  color: theme.colors.primaryText
                }}
                onClick={() => onNavigate('startups')}
              >
                <span className="text-xl">🚀</span>
                <span className="font-medium">Startups</span>
              </button>
              
              <button
                className="w-full text-left px-4 py-3 rounded-lg transition-colors duration-300 hover:scale-105 flex items-center space-x-3"
                style={{
                  backgroundColor: theme.colors.accentButtonBg,
                  color: theme.colors.accentButtonText
                }}
                onClick={() => onNavigate('connectors')}
              >
                <span className="text-xl">🤝</span>
                <span className="font-medium">Deal-makers</span>
              </button>
              
              <button
                className="w-full text-left px-4 py-3 rounded-lg transition-colors duration-300 hover:scale-105 flex items-center space-x-3"
                style={{
                  backgroundColor: theme.colors.secondaryButtonBg,
                  color: theme.colors.primaryText
                }}
                onClick={() => onNavigate('investors')}
              >
                <span className="text-xl">💰</span>
                <span className="font-medium">Investors</span>
              </button>
              
              <button
                className="w-full text-left px-4 py-3 rounded-lg transition-colors duration-300 hover:scale-105 flex items-center space-x-3"
                style={{
                  backgroundColor: theme.colors.secondaryButtonBg,
                  color: theme.colors.primaryText
                }}
                onClick={() => onNavigate('profile')}
              >
                <span className="text-xl">👤</span>
                <span className="font-medium">Profile</span>
              </button>
              
              <button
                className="w-full text-left px-4 py-3 rounded-lg transition-colors duration-300 hover:scale-105 flex items-center space-x-3"
                style={{
                  backgroundColor: theme.colors.secondaryButtonBg,
                  color: theme.colors.primaryText
                }}
                onClick={() => onNavigate('voting')}
              >
                <span className="text-xl">🗳️</span>
                <span className="font-medium">Voting</span>
              </button>
              
              <button
                className="w-full text-left px-4 py-3 rounded-lg transition-colors duration-300 hover:scale-105 flex items-center space-x-3"
                style={{
                  backgroundColor: theme.colors.secondaryButtonBg,
                  color: theme.colors.primaryText
                }}
                onClick={() => onNavigate('landingpage')}
              >
                <span className="text-xl">🚪</span>
                <span className="font-medium">Logout</span>
              </button>
            </div>
            
            {/* User Info Section */}
            <div className="mt-8 pt-6" style={{ borderTop: `1px solid ${theme.colors.borderColor}` }}>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">U</span>
                </div>
                <p className="text-sm font-medium" style={{ color: theme.colors.primaryText }}>
                  Welcome back!
                </p>
                <p className="text-xs" style={{ color: theme.colors.secondaryText }}>
                  User Dashboard
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="ml-64 flex-1">
          <div className="z-20 mx-auto flex min-h-screen w-full flex-col px-6 pt-8 pb-8">
            {/* Header */}
            <div className="mb-12 text-center">
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
    </div>
  );
};

export default ConnectorsPage;
