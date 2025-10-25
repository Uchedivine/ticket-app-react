import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import TicketManagement from './components/TicketManagement';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    const session = localStorage.getItem('ticketapp_session');
    if (session) {
      setIsAuthenticated(true);
      setCurrentPage('dashboard');
    }
  }, []);

  const handleGetStarted = () => {
    setCurrentPage('auth');
  };

  const handleLogin = () => {
    setCurrentPage('auth');
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('ticketapp_session');
    setIsAuthenticated(false);
    setCurrentPage('landing');
  };

  const handleNavigateToTickets = () => {
    setCurrentPage('tickets');
  };

  const handleBackToDashboard = () => {
    setCurrentPage('dashboard');
  };

  return (
    <div className="App">
      {currentPage === 'landing' && (
        <LandingPage 
          onGetStarted={handleGetStarted}
          onLogin={handleLogin}
        />
      )}
      
      {currentPage === 'auth' && (
        <AuthPage onAuthSuccess={handleAuthSuccess} />
      )}

      {currentPage === 'dashboard' && (
        <Dashboard 
          onLogout={handleLogout}
          onNavigateToTickets={handleNavigateToTickets}
        />
      )}

      {currentPage === 'tickets' && (
        <TicketManagement onBackToDashboard={handleBackToDashboard} />
      )}
    </div>
  );
}

export default App;