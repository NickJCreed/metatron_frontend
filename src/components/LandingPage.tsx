import React from 'react';
import { logo } from '@/assets';
import { useTheme } from '@/context/ThemeProvider';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme.type === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
        : 'bg-gradient-to-br from-gray-100 to-gray-200'
    }`}>
      {/* Header */}
      <header className="flex items-center justify-between p-6">
        <div className="flex items-center" style={{ gap: '11px' }}>
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
          <button
            onClick={() => onNavigate('login')}
            className="px-6 py-3 bg-[#1DC071] hover:bg-[#17a65d] text-white rounded-lg font-medium transition-colors"
          >
            Sign In
          </button>
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
          <button
            onClick={() => onNavigate('login')}
            className="px-8 py-4 bg-[#1DC071] hover:bg-[#17a65d] text-white rounded-lg font-medium text-lg transition-colors"
          >
            Get Started
          </button>
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
            <div className="text-3xl font-bold mb-2" style={{ color: theme.colors.primaryText }}>500+</div>
            <div className="text-sm" style={{ color: theme.colors.secondaryText }}>Startups</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2" style={{ color: theme.colors.primaryText }}>200+</div>
            <div className="text-sm" style={{ color: theme.colors.secondaryText }}>Investors</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2" style={{ color: theme.colors.primaryText }}>50+</div>
            <div className="text-sm" style={{ color: theme.colors.secondaryText }}>Deal-Makers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2" style={{ color: theme.colors.primaryText }}>$2B+</div>
            <div className="text-sm" style={{ color: theme.colors.secondaryText }}>Capital Raised</div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 py-12" style={{ backgroundColor: theme.colors.modalBg, borderTop: `1px solid ${theme.colors.borderColor}` }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <img src={logo} alt="metatron Logo" className="h-8 w-8" />
                <span className="text-xl font-bold text-[#17a65d]">metatron</span>
              </div>
              <p className="text-sm mb-4 max-w-md" style={{ color: theme.colors.secondaryText }}>
                Empowering the future of entrepreneurship through innovative startup discovery, 
                deal-making, and investor networking.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-[#1DC071] transition-colors">
                  <span className="text-xl">📘</span>
                </a>
                <a href="#" className="text-gray-400 hover:text-[#1DC071] transition-colors">
                  <span className="text-xl">🐦</span>
                </a>
                <a href="#" className="text-gray-400 hover:text-[#1DC071] transition-colors">
                  <span className="text-xl">💼</span>
                </a>
                <a href="#" className="text-gray-400 hover:text-[#1DC071] transition-colors">
                  <span className="text-xl">📧</span>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4" style={{ color: theme.colors.primaryText }}>Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm hover:text-[#1DC071] transition-colors" style={{ color: theme.colors.secondaryText }}>About Us</a></li>
                <li><a href="#" className="text-sm hover:text-[#1DC071] transition-colors" style={{ color: theme.colors.secondaryText }}>Startups</a></li>
                <li><a href="#" className="text-sm hover:text-[#1DC071] transition-colors" style={{ color: theme.colors.secondaryText }}>Investors</a></li>
                <li><a href="#" className="text-sm hover:text-[#1DC071] transition-colors" style={{ color: theme.colors.secondaryText }}>Deal-Makers</a></li>
                <li><a href="#" className="text-sm hover:text-[#1DC071] transition-colors" style={{ color: theme.colors.secondaryText }}>Contact</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold mb-4" style={{ color: theme.colors.primaryText }}>Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm hover:text-[#1DC071] transition-colors" style={{ color: theme.colors.secondaryText }}>Help Center</a></li>
                <li><a href="#" className="text-sm hover:text-[#1DC071] transition-colors" style={{ color: theme.colors.secondaryText }}>Privacy Policy</a></li>
                <li><a href="#" className="text-sm hover:text-[#1DC071] transition-colors" style={{ color: theme.colors.secondaryText }}>Terms of Service</a></li>
                <li><a href="#" className="text-sm hover:text-[#1DC071] transition-colors" style={{ color: theme.colors.secondaryText }}>Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center" style={{ borderColor: theme.colors.borderColor }}>
            <p className="text-sm" style={{ color: theme.colors.secondaryText }}>
              © 2024 metatron. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-xs" style={{ color: theme.colors.tertiaryText }}>
                Made with ❤️ for entrepreneurs
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
