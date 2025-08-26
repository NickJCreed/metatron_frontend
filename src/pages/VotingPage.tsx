import React from 'react';
import { useTheme } from '../context/ThemeProvider';
import { logo } from '../assets';

interface VotingPageProps {
  onNavigate: (page: string) => void;
}

const VotingPage: React.FC<VotingPageProps> = ({ onNavigate }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: theme.colors.secondaryBg }}>
      {/* Header with Logo and Theme Toggle */}
      <div className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: theme.colors.modalBg }}>
        <div className="flex justify-between items-center px-6 py-4">
          {/* Metatron Logo */}
          <div className="flex items-center" style={{ gap: '11px' }}>
            <img src={logo} alt="Metatron Logo" className="w-12 h-12" />
            <span className="text-2xl font-bold text-[#17a65d]">metatron</span>
          </div>
          
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
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
        {/* Extended border line across full header width */}
        <div className="absolute left-0 right-0 h-px" style={{ backgroundColor: theme.colors.borderColor, bottom: '1px' }}></div>
      </div>


      {/* Main Layout with Sidebar and Content */}
      <div className="flex pt-24">
        {/* Left Sidebar Navigation */}
        <div className="fixed left-0 top-0 h-screen z-30" style={{ backgroundColor: theme.colors.modalBg, width: '196px' }}>
          <div className="p-6" style={{ marginTop: '88px' }}>
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
                <span className="font-medium">Startups</span>
              </button>
              
              <button
                className="w-full text-left px-4 py-3 rounded-lg transition-colors duration-300 hover:scale-105 flex items-center space-x-3"
                style={{
                  backgroundColor: theme.colors.secondaryButtonBg,
                  color: theme.colors.primaryText
                }}
                onClick={() => onNavigate('connectors')}
              >
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
                <span className="font-medium">Profile</span>
              </button>
              
              <button
                className="w-full text-left px-4 py-3 rounded-lg transition-colors duration-300 hover:scale-105 flex items-center space-x-3"
                style={{
                  backgroundColor: theme.colors.accentButtonBg,
                  color: theme.colors.accentButtonText
                }}
                onClick={() => onNavigate('voting')}
              >
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
        <div className="flex-1" style={{ marginLeft: '196px' }}>
          <div className="z-20 mx-auto flex min-h-screen w-full flex-col px-6 pt-8 pb-8">
            {/* Header */}
            <div className="mb-12 text-center">
              <h1 className="text-5xl font-bold mb-4 transition-colors duration-300" style={{ color: theme.colors.primaryText }}>
                🗳️ DAO Governance
              </h1>
              <p className="text-xl max-w-2xl mx-auto transition-colors duration-300" style={{ color: theme.colors.secondaryText }}>
                Participate in community decisions and shape the future of metatron
              </p>
            </div>

            {/* Voting Content */}
            <div className="max-w-6xl mx-auto">
              {/* Active Proposals Section */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-6" style={{ color: theme.colors.primaryText }}>
                  Active Proposals
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Proposal Card 1 */}
                  <div className="p-6 rounded-lg shadow-lg transition-colors duration-300 hover:scale-105" style={{ backgroundColor: theme.colors.modalBg }}>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium text-green-600 bg-green-100">
                        Active
                      </span>
                      <span className="text-sm" style={{ color: theme.colors.secondaryText }}>
                        Ends in 2 days
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2" style={{ color: theme.colors.primaryText }}>
                      Platform Fee Reduction
                    </h3>
                    <p className="text-sm mb-4" style={{ color: theme.colors.secondaryText }}>
                      Reduce platform fees from 2.5% to 1.5% to increase user adoption and competitiveness.
                    </p>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span style={{ color: theme.colors.secondaryText }}>Yes</span>
                        <span style={{ color: theme.colors.primaryText }}>68%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '68%' }}></div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        className="flex-1 px-4 py-2 rounded-lg transition-colors duration-300 text-sm font-medium"
                        style={{
                          backgroundColor: theme.colors.accentButtonBg,
                          color: theme.colors.accentButtonText
                        }}
                      >
                        Vote Yes
                      </button>
                      <button
                        className="flex-1 px-4 py-2 rounded-lg border transition-colors duration-300 text-sm font-medium"
                        style={{
                          backgroundColor: theme.colors.secondaryButtonBg,
                          borderColor: theme.colors.borderColor,
                          color: theme.colors.primaryText
                        }}
                      >
                        Vote No
                      </button>
                    </div>
                  </div>

                  {/* Proposal Card 2 */}
                  <div className="p-6 rounded-lg shadow-lg transition-colors duration-300 hover:scale-105" style={{ backgroundColor: theme.colors.modalBg }}>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium text-yellow-600 bg-yellow-100">
                        Close
                      </span>
                      <span className="text-sm" style={{ color: theme.colors.secondaryText }}>
                        Ends in 5 hours
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2" style={{ color: theme.colors.primaryText }}>
                      New Feature: AI Matching
                    </h3>
                    <p className="text-sm mb-4" style={{ color: theme.colors.secondaryText }}>
                      Implement AI-powered matching algorithm to connect startups with the most suitable investors.
                    </p>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span style={{ color: theme.colors.secondaryText }}>Yes</span>
                        <span style={{ color: theme.colors.primaryText }}>52%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '52%' }}></div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        className="flex-1 px-4 py-2 rounded-lg transition-colors duration-300 text-sm font-medium"
                        style={{
                          backgroundColor: theme.colors.accentButtonBg,
                          color: theme.colors.accentButtonText
                        }}
                      >
                        Vote Yes
                      </button>
                      <button
                        className="flex-1 px-4 py-2 rounded-lg border transition-colors duration-300 text-sm font-medium"
                        style={{
                          backgroundColor: theme.colors.secondaryButtonBg,
                          borderColor: theme.colors.borderColor,
                          color: theme.colors.primaryText
                        }}
                      >
                        Vote No
                      </button>
                    </div>
                  </div>

                  {/* Proposal Card 3 */}
                  <div className="p-6 rounded-lg shadow-lg transition-colors duration-300 hover:scale-105" style={{ backgroundColor: theme.colors.modalBg }}>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium text-blue-600 bg-blue-100">
                        New
                      </span>
                      <span className="text-sm" style={{ color: theme.colors.secondaryText }}>
                        Ends in 7 days
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2" style={{ color: theme.colors.primaryText }}>
                      Community Treasury Allocation
                    </h3>
                    <p className="text-sm mb-4" style={{ color: theme.colors.secondaryText }}>
                      Allocate 20% of platform revenue to community development and marketing initiatives.
                    </p>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span style={{ color: theme.colors.secondaryText }}>Yes</span>
                        <span style={{ color: theme.colors.primaryText }}>45%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        className="flex-1 px-4 py-2 rounded-lg transition-colors duration-300 text-sm font-medium"
                        style={{
                          backgroundColor: theme.colors.accentButtonBg,
                          color: theme.colors.accentButtonText
                        }}
                      >
                        Vote Yes
                      </button>
                      <button
                        className="flex-1 px-4 py-2 rounded-lg border transition-colors duration-300 text-sm font-medium"
                        style={{
                          backgroundColor: theme.colors.secondaryButtonBg,
                          borderColor: theme.colors.borderColor,
                          color: theme.colors.primaryText
                        }}
                      >
                        Vote No
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Results Section */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-6" style={{ color: theme.colors.primaryText }}>
                  Recent Results
                </h2>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg transition-colors duration-300" style={{ backgroundColor: theme.colors.modalBg }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold" style={{ color: theme.colors.primaryText }}>
                          Mobile App Development
                        </h3>
                        <p className="text-sm" style={{ color: theme.colors.secondaryText }}>
                          Develop native mobile applications for iOS and Android
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="px-3 py-1 rounded-full text-xs font-medium text-green-600 bg-green-100">
                          Passed
                        </span>
                        <p className="text-sm mt-1" style={{ color: theme.colors.secondaryText }}>
                          78% Yes • 22% No
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg transition-colors duration-300" style={{ backgroundColor: theme.colors.modalBg }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold" style={{ color: theme.colors.primaryText }}>
                          Partnership with TechCrunch
                        </h3>
                        <p className="text-sm" style={{ color: theme.colors.secondaryText }}>
                          Establish media partnership for increased platform visibility
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="px-3 py-1 rounded-full text-xs font-medium text-red-600 bg-red-100">
                          Failed
                        </span>
                        <p className="text-sm mt-1" style={{ color: theme.colors.secondaryText }}>
                          42% Yes • 58% No
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Create Proposal Section */}
              <div className="p-6 rounded-lg shadow-lg transition-colors duration-300" style={{ backgroundColor: theme.colors.modalBg }}>
                <h2 className="text-xl font-semibold mb-4" style={{ color: theme.colors.primaryText }}>
                  Create New Proposal
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: theme.colors.secondaryText }}>
                      Proposal Title
                    </label>
                    <input
                      type="text"
                      placeholder="Enter proposal title..."
                      className="w-full px-3 py-2 rounded-lg border transition-colors duration-300"
                      style={{
                        backgroundColor: theme.colors.secondaryBg,
                        borderColor: theme.colors.borderColor,
                        color: theme.colors.primaryText
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: theme.colors.secondaryText }}>
                      Description
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Describe your proposal in detail..."
                      className="w-full px-3 py-2 rounded-lg border transition-colors duration-300"
                      style={{
                        backgroundColor: theme.colors.secondaryBg,
                        borderColor: theme.colors.borderColor,
                        color: theme.colors.primaryText
                      }}
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      className="px-6 py-2 rounded-lg transition-colors duration-300"
                      style={{
                        backgroundColor: theme.colors.accentButtonBg,
                        color: theme.colors.accentButtonText
                      }}
                    >
                      Submit Proposal
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VotingPage;
