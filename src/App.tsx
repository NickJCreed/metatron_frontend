import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeProvider';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import ProfilePage from './pages/ProfilePage';
import Login from './components/Login';

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
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'profile':
        return <ProfilePage />;
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
        {/* Navigation Bar - Only show when not on landingpage AND not on login */}
        {currentPage !== 'landingpage' && currentPage !== 'login' && (
          <div style={{
            padding: '20px', 
            backgroundColor: '#333', 
            color: 'white',
            display: 'flex',
            gap: '20px',
            alignItems: 'center'
          }}>
            <h2 style={{margin: 0}}>Metatron App</h2>
            <button 
              onClick={() => setCurrentPage('landingpage')}
              style={{
                padding: '10px 20px',
                backgroundColor: currentPage === 'landingpage' ? '#007bff' : '#666',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              🏠 Landing Page
            </button>
            <button 
              onClick={() => setCurrentPage('dashboard')}
              style={{
                padding: '10px 20px',
                backgroundColor: currentPage === 'dashboard' ? '#007bff' : '#666',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              📊 Dashboard
            </button>
            <button 
              onClick={() => setCurrentPage('profile')}
              style={{
                padding: '10px 20px',
                backgroundColor: currentPage === 'profile' ? '#007bff' : '#666',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              👤 Profile
            </button>
            <button 
              onClick={() => setCurrentPage('login')}
              style={{
                padding: '10px 20px',
                backgroundColor: currentPage === 'login' ? '#007bff' : '#666',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              🔐 Login
            </button>
          </div>
        )}
        
        {/* Page Content */}
        {renderPage()}
      </div>
    </ThemeProvider>
  );
}

export default App;
