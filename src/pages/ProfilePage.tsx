import React from 'react';
import { useTheme } from '../context/ThemeProvider';
import { logo } from '../assets';

interface ProfilePageProps {
  onNavigate: (page: string) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate }) => {
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
                  backgroundColor: theme.colors.secondaryButtonBg,
                  color: theme.colors.primaryText
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
                  backgroundColor: theme.colors.accentButtonBg,
                  color: theme.colors.accentButtonText
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
                👤 User Profile
              </h1>
              <p className="text-xl max-w-2xl mx-auto transition-colors duration-300" style={{ color: theme.colors.secondaryText }}>
                Manage your account settings and preferences
              </p>
            </div>

            {/* Profile Content */}
            <div className="max-w-4xl mx-auto">
              {/* Profile Card */}
              <div className="mb-8 p-8 rounded-lg shadow-lg transition-colors duration-300" style={{ backgroundColor: theme.colors.modalBg }}>
                <div className="flex items-center space-x-6 mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-3xl">U</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2" style={{ color: theme.colors.primaryText }}>
                      John Doe
                    </h2>
                    <p className="text-lg mb-1" style={{ color: theme.colors.secondaryText }}>
                      john.doe@example.com
                    </p>
                    <p className="text-sm" style={{ color: theme.colors.secondaryText }}>
                      Member since January 2024
                    </p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3" style={{ color: theme.colors.primaryText }}>
                      Personal Information
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: theme.colors.secondaryText }}>
                          Full Name
                        </label>
                        <input
                          type="text"
                          defaultValue="John Doe"
                          className="w-full px-3 py-2 rounded-lg border transition-colors duration-300"
                          style={{
                            backgroundColor: theme.colors.secondaryBg,
                            borderColor: theme.colors.borderColor,
                            color: theme.colors.primaryText
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: theme.colors.secondaryText }}>
                          Email
                        </label>
                        <input
                          type="email"
                          defaultValue="john.doe@example.com"
                          className="w-full px-3 py-2 rounded-lg border transition-colors duration-300"
                          style={{
                            backgroundColor: theme.colors.secondaryBg,
                            borderColor: theme.colors.borderColor,
                            color: theme.colors.primaryText
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: theme.colors.secondaryText }}>
                          Phone
                        </label>
                        <input
                          type="tel"
                          defaultValue="+1 (555) 123-4567"
                          className="w-full px-3 py-2 rounded-lg border transition-colors duration-300"
                          style={{
                            backgroundColor: theme.colors.secondaryBg,
                            borderColor: theme.colors.borderColor,
                            color: theme.colors.primaryText
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3" style={{ color: theme.colors.primaryText }}>
                      Account Settings
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: theme.colors.secondaryText }}>
                          Username
                        </label>
                        <input
                          type="text"
                          defaultValue="johndoe"
                          className="w-full px-3 py-2 rounded-lg border transition-colors duration-300"
                          style={{
                            backgroundColor: theme.colors.secondaryBg,
                            borderColor: theme.colors.borderColor,
                            color: theme.colors.primaryText
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: theme.colors.secondaryText }}>
                          Location
                        </label>
                        <input
                          type="text"
                          defaultValue="San Francisco, CA"
                          className="w-full px-3 py-2 rounded-lg border transition-colors duration-300"
                          style={{
                            backgroundColor: theme.colors.secondaryBg,
                            borderColor: theme.colors.borderColor,
                            color: theme.colors.primaryText
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: theme.colors.secondaryText }}>
                          Timezone
                        </label>
                        <select
                          defaultValue="America/Los_Angeles"
                          className="w-full px-3 py-2 rounded-lg border transition-colors duration-300"
                          style={{
                            backgroundColor: theme.colors.secondaryBg,
                            borderColor: theme.colors.borderColor,
                            color: theme.colors.primaryText
                          }}
                        >
                          <option value="America/Los_Angeles">Pacific Time (PT)</option>
                          <option value="America/New_York">Eastern Time (ET)</option>
                          <option value="Europe/London">London (GMT)</option>
                          <option value="Asia/Tokyo">Tokyo (JST)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6" style={{ borderTop: `1px solid ${theme.colors.borderColor}` }}>
                  <div className="flex justify-end space-x-4">
                    <button
                      className="px-6 py-2 rounded-lg border transition-colors duration-300"
                      style={{
                        backgroundColor: theme.colors.secondaryButtonBg,
                        borderColor: theme.colors.borderColor,
                        color: theme.colors.primaryText
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-6 py-2 rounded-lg transition-colors duration-300"
                      style={{
                        backgroundColor: theme.colors.accentButtonBg,
                        color: theme.colors.accentButtonText
                      }}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>

              {/* Preferences Section */}
              <div className="p-8 rounded-lg shadow-lg transition-colors duration-300" style={{ backgroundColor: theme.colors.modalBg }}>
                <h3 className="text-xl font-semibold mb-6" style={{ color: theme.colors.primaryText }}>
                  Preferences
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium" style={{ color: theme.colors.primaryText }}>
                        Email Notifications
                      </h4>
                      <p className="text-sm" style={{ color: theme.colors.secondaryText }}>
                        Receive updates about startups and investment opportunities
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium" style={{ color: theme.colors.primaryText }}>
                        SMS Notifications
                      </h4>
                      <p className="text-sm" style={{ color: theme.colors.secondaryText }}>
                        Receive important alerts via text message
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium" style={{ color: theme.colors.primaryText }}>
                        Two-Factor Authentication
                      </h4>
                      <p className="text-sm" style={{ color: theme.colors.secondaryText }}>
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <button
                      className="px-4 py-2 rounded-lg transition-colors duration-300"
                      style={{
                        backgroundColor: theme.colors.accentButtonBg,
                        color: theme.colors.accentButtonText
                      }}
                    >
                      Enable
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

export default ProfilePage; 