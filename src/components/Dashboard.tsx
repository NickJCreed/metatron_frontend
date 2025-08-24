import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeProvider";
import { SearchIcon } from "../icons/SearchIcon";
import { FaFilter } from 'react-icons/fa';
import { FaSun, FaMoon } from 'react-icons/fa';

interface FilterMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeFilters: Record<string, string[]>;
  setActiveFilters: (filters: Record<string, string[]>) => void;
}

const FilterMenu: React.FC<FilterMenuProps> = ({ isOpen, onClose, activeFilters, setActiveFilters }) => {
  const { theme } = useTheme();
  
  if (!isOpen) return null;

  const filterOptions = {
    'Industry': ['Technology', 'Finance', 'Healthcare', 'AI', 'Blockchain'],
    'Funding Stage': ['Seed', 'Series A', 'Series B', 'Series C'],
    'Location': ['San Francisco', 'New York', 'London', 'Singapore', 'Berlin']
  };

  const toggleFilter = (category: string, value: string) => {
    const current = activeFilters[category] || [];
    const newFilters = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    
    setActiveFilters({
      ...activeFilters,
      [category]: newFilters
    });
  };

  return (
    <div className="fixed inset-0 flex items-start justify-end z-30">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div 
        className="relative rounded-lg p-4 m-4 w-80 max-h-[90vh] overflow-y-auto"
        style={{ backgroundColor: theme.colors.modalBg, border: `1px solid ${theme.colors.borderColor}` }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold" style={{ color: theme.colors.primaryText }}>Filters</h3>
          <button onClick={onClose} style={{ color: theme.colors.secondaryText }}>✕</button>
        </div>
        
        {Object.entries(filterOptions).map(([category, values]) => (
          <div key={category} className="mb-4">
            <h4 className="font-semibold mb-2" style={{ color: theme.colors.primaryText }}>{category}</h4>
            <div className="flex flex-wrap gap-2">
              {values.map((value) => (
                <button
                  key={value}
                  onClick={() => toggleFilter(category, value)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors duration-300 ${
                    (activeFilters[category] || []).includes(value)
                      ? 'text-white'
                      : 'text-gray-600'
                  }`}
                  style={{
                    backgroundColor: (activeFilters[category] || []).includes(value)
                      ? theme.colors.accentButtonBg
                      : theme.colors.secondaryButtonBg
                  }}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface DashboardProps {
  onNavigate: (page: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { theme, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState<string>("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: theme.colors.secondaryBg }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-xl" style={{ color: theme.colors.primaryText }}>Loading Dashboard...</p>
        </div>
      </div>
    );
  }

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
                  backgroundColor: theme.colors.accentButtonBg,
                  color: theme.colors.accentButtonText
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
                🚀 metatron Startups
              </h1>
              <p className="text-xl max-w-2xl mx-auto transition-colors duration-300" style={{ color: theme.colors.secondaryText }}>
                Discover innovative startups and connect with deal-makers
              </p>
            </div>

            {/* Search and Filter Bar */}
            <div className="mb-8 max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <SearchIcon />
                  <input
                    type="text"
                    placeholder="Search startups..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border transition-colors duration-300"
                    style={{
                      backgroundColor: theme.colors.modalBg,
                      borderColor: theme.colors.borderColor,
                      color: theme.colors.primaryText
                    }}
                  />
                </div>
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="px-6 py-3 rounded-lg border transition-colors duration-300 flex items-center gap-2"
                  style={{
                    backgroundColor: theme.colors.modalBg,
                    borderColor: theme.colors.borderColor,
                    color: theme.colors.primaryText
                  }}
                >
                  <FaFilter />
                  Filters
                </button>
              </div>
              
              {/* Filter Menu */}
              <FilterMenu
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                activeFilters={activeFilters}
                setActiveFilters={setActiveFilters}
              />
            </div>

            {/* NFT Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {Array.from({ length: itemsPerPage }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
                  style={{ backgroundColor: theme.colors.modalBg }}
                >
                  <div className="h-48 bg-gradient-to-br from-green-400 to-blue-500"></div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2 transition-colors duration-300" style={{ color: theme.colors.primaryText }}>
                      Startup NFT #{index + 1 + (page - 1) * itemsPerPage}
                    </h3>
                    <p className="text-sm mb-3 transition-colors duration-300" style={{ color: theme.colors.secondaryText }}>
                      Innovative startup in the metatron ecosystem
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-green-500">0.1 ETH</span>
                      <button
                        className="px-3 py-1 rounded-full text-xs font-medium transition-colors duration-300"
                        style={{
                          backgroundColor: theme.colors.accentButtonBg,
                          color: theme.colors.accentButtonText
                        }}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-4">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="px-4 py-2 rounded-lg transition-colors duration-300 disabled:opacity-50"
                style={{
                  backgroundColor: page === 1 ? theme.colors.secondaryButtonBg : theme.colors.accentButtonBg,
                  color: page === 1 ? theme.colors.secondaryText : theme.colors.accentButtonText
                }}
              >
                Previous
              </button>
              
              <span style={{ color: theme.colors.primaryText }}>
                Page {page} of 3
              </span>
              
              <button
                onClick={() => setPage(Math.min(3, page + 1))}
                disabled={page === 3}
                className="px-4 py-2 rounded-lg transition-colors duration-300 disabled:opacity-50"
                style={{
                  backgroundColor: page === 3 ? theme.colors.secondaryButtonBg : theme.colors.accentButtonBg,
                  color: page === 3 ? theme.colors.secondaryText : theme.colors.accentButtonText
                }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
