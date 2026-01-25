import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './App.css';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Features from './components/Features.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import Resources from './components/Resources.jsx';
import Footer from './components/Footer.jsx';
import AuthModal from './components/AuthModal.jsx';
import DocumentAnalyzer from './components/DocumentAnalyzer.jsx';

function MainApp() {
  const [currentPage, setCurrentPage] = useState('landing'); // 'landing' or 'analyzer'
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      setUser({ email: userEmail });
    }
  }, []);

  const handleLogin = (email) => {
    localStorage.setItem('userEmail', email);
    setUser({ email });
    setIsAuthModalOpen(false);
    // After login, navigate to analyzer
    setCurrentPage('analyzer');
  };

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    setUser(null);
    setCurrentPage('landing');
  };

  const openAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const navigateToAnalyzer = () => {
    if (user) {
      setCurrentPage('analyzer');
    } else {
      openAuthModal();
    }
  };

  const navigateToHome = () => {
    setCurrentPage('landing');
  };

  // Landing Page View
  if (currentPage === 'landing') {
    return (
      <div className="App">
        <Header 
          user={user} 
          onLogin={openAuthModal} 
          onLogout={handleLogout}
          onAnalyzeClick={navigateToAnalyzer}
        />
        
        <main>
          <Hero onAnalyzeClick={navigateToAnalyzer} onLearnMoreClick={openAuthModal} />
          <Features />
          <HowItWorks onStartAnalysisClick={navigateToAnalyzer} />
          <Resources />
        </main>
        
        <Footer />
        
        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={closeAuthModal} 
          onLogin={handleLogin} 
        />
      </div>
    );
  }

  // Analyzer Page View
  return (
    <div className="analyzer-page">
      <header className="analyzer-page-header">
        <div className="container">
          <div className="analyzer-nav">
            <button className="back-btn" onClick={navigateToHome}>
              ← Back to Home
            </button>
            <div className="logo">lekha.ai</div>
            <div className="user-section">
              {user ? (
                <div className="user-info">
                  <span className="user-email">{user.email}</span>
                  <button className="btn btn-secondary" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              ) : (
                <button className="btn btn-primary" onClick={openAuthModal}>
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <DocumentAnalyzer 
        isOpen={true} 
        onClose={navigateToHome} 
        user={user}
      />

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={closeAuthModal} 
        onLogin={handleLogin} 
      />
    </div>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<MainApp />);