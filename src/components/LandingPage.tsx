import React from 'react';
import { Link } from 'react-router-dom';
import { logo } from '@/assets';
import { useTheme } from '@/context/ThemeProvider';

const LandingPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme.type === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
        : 'bg-gradient-to-br from-gray-300 to-gray-400'
    }`}>
      {/* Header */}
      <header className="flex items-center justify-between p-6">
        <div className="flex items-center space-x-4">
          <img src={logo} alt="metatron Logo" className="h-12 w-12" />
          <span className="text-2xl font-bold text-[#17a65d]">metatron</span>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-3 rounded-lg transition-colors duration-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            style={{
              backgroundColor: theme.type === 'dark' ? theme.colors.secondaryButtonBg : '#e5e7eb',
              color: theme.colors.primaryText
            }}
          >
            {theme.type === 'dark' ? '☀️' : '🌙'}
          </button>
          <Link
            to="/login"
            className="px-6 py-3 bg-[#1DC071] hover:bg-[#17a65d] text-white rounded-lg font-medium transition-colors"
          >
            Sign In
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center px-6 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 transition-colors duration-300" style={{ color: theme.colors.primaryText }}>
          Welcome to{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1DC071] to-[#17a65d]">
            metatron
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 max-w-3xl transition-colors duration-300" style={{ color: theme.colors.secondaryText }}>
          Discover innovative startups, connect with investors, and be part of the future of entrepreneurship. 
          Join our exclusive community of founders, deal-makers, and investors.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <Link
            to="/login"
            className="px-8 py-4 bg-[#1DC071] hover:bg-[#17a65d] text-white rounded-lg font-medium text-lg transition-colors"
          >
            Get Started
          </Link>
          <button className="px-8 py-4 border-2 border-[#1DC071] text-[#1DC071] hover:bg-[#1DC071] hover:text-white rounded-lg font-medium text-lg transition-colors">
            Learn More
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl w-full mt-16">
          <div className="p-8 rounded-xl shadow-lg transition-colors duration-300" style={{ backgroundColor: theme.colors.secondaryBg }}>
            <div className="w-16 h-16 bg-[#1DC071]/10 rounded-full flex items-center justify-center mb-4 mx-auto">
              <span className="text-2xl">🚀</span>
            </div>
            <h3 className="text-xl font-semibold mb-3 transition-colors duration-300" style={{ color: theme.colors.primaryText }}>Startup Discovery</h3>
            <p className="transition-colors duration-300" style={{ color: theme.colors.secondaryText }}>
              Explore innovative startups and investment opportunities across various industries.
            </p>
          </div>

          <div className="p-8 rounded-xl shadow-lg transition-colors duration-300" style={{ backgroundColor: theme.colors.secondaryBg }}>
            <div className="w-16 h-16 bg-[#1DC071]/10 rounded-full flex items-center justify-center mb-4 mx-auto">
              <span className="text-2xl">🔗</span>
            </div>
            <h3 className="text-xl font-semibold mb-3 transition-colors duration-300" style={{ color: theme.colors.primaryText }}>Deal-Maker Platform</h3>
            <p className="transition-colors duration-300" style={{ color: theme.colors.secondaryText }}>
              Bridge the gap between startups and investors with our deal-maker ecosystem.
            </p>
          </div>

          <div className="p-8 rounded-xl shadow-lg transition-colors duration-300" style={{ backgroundColor: theme.colors.secondaryBg }}>
            <div className="w-16 h-16 bg-[#1DC071]/10 rounded-full flex items-center justify-center mb-4 mx-auto">
              <span className="text-2xl">💼</span>
            </div>
            <h3 className="text-xl font-semibold mb-3 transition-colors duration-300" style={{ color: theme.colors.primaryText }}>Investor Network</h3>
            <p className="transition-colors duration-300" style={{ color: theme.colors.secondaryText }}>
              Connect with accredited investors and build meaningful business relationships.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-8 max-w-4xl w-full mt-20">
          <div className="text-center">
            <div className="text-3xl font-bold text-[#1DC071] mb-2">500+</div>
            <div className="transition-colors duration-300" style={{ color: theme.colors.secondaryText }}>Startups</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#1DC071] mb-2">200+</div>
            <div className="transition-colors duration-300" style={{ color: theme.colors.secondaryText }}>Deal-Makers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#1DC071] mb-2">100+</div>
            <div className="transition-colors duration-300" style={{ color: theme.colors.secondaryText }}>Investors</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#1DC071] mb-2">$50M+</div>
            <div className="transition-colors duration-300" style={{ color: theme.colors.secondaryText }}>Invested</div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 mt-20 transition-colors duration-300" style={{ backgroundColor: theme.colors.secondaryBg }}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <img src={logo} alt="metatron Logo" className="h-8 w-8" />
            <span className="text-xl font-bold transition-colors duration-300" style={{ color: theme.colors.primaryText }}>metatron</span>
          </div>
          <p className="mb-6 transition-colors duration-300" style={{ color: theme.colors.secondaryText }}>
            Empowering the future of entrepreneurship through innovative connections.
          </p>
          <div className="text-sm transition-colors duration-300" style={{ color: theme.colors.tertiaryText }}>
            © 2024 metatron. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
