import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeProvider';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import ProfilePage from './pages/ProfilePage';
import Login from './components/Login';
import ConnectorsPage from './pages/ConnectorsPage';
import InvestorsPage from './pages/InvestorsPage';
import VotingPage from './pages/VotingPage';

function App() {
  const [currentPage, setCurrentPage] = useState('landingpage');
  console.log('App component is rendering! Current page:', currentPage);
  
  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };
  
  const renderPage = () => {
    switch(currentPage) {
      case 'landingpage':
        return <LandingPage onNavigate={handleNavigate} />;
      case 'startups':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'connectors':
        return <ConnectorsPage onNavigate={handleNavigate} />;
      case 'investors':
        return <InvestorsPage onNavigate={handleNavigate} />;
      case 'profile':
        return <ProfilePage onNavigate={handleNavigate} />;
      case 'voting':
        return <VotingPage onNavigate={handleNavigate} />;
      case 'login':
        return <Login onNavigate={handleNavigate} />;
      default:
        return (
          <div style={{padding: '50px', fontSize: '24px', backgroundColor: 'lightcoral'}}>
            <h1>❌ ERROR PAGE</h1>
            <p>Unknown page: {currentPage}</p>
          </div>
        );
    }
  };
  
  return (
    <ThemeProvider>
      <div>
        {/* Navigation Bar - Disabled for all pages since each page has its own navigation */}
        
        {/* Page Content */}
        {renderPage()}
      </div>
    </ThemeProvider>
  );
}

export default App;
