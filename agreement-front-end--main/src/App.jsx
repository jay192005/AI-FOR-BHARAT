import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Features from './components/Features.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import Resources from './components/Resources.jsx';
import Footer from './components/Footer.jsx';
import AuthModal from './components/AuthModal.jsx';
import DocumentAnalyzer from './components/DocumentAnalyzer.jsx';

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAnalyzerOpen, setIsAnalyzerOpen] = useState(false);
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
  };

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    setUser(null);
  };

  const openAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const openAnalyzer = () => {
    setIsAnalyzerOpen(true);
  };

  const closeAnalyzer = () => {
    setIsAnalyzerOpen(false);
  };

  const navigateToAnalyzer = () => {
    if (user) {
      openAnalyzer();
    } else {
      openAuthModal();
    }
  };

  return (
    <div className="App">
      <Header 
        user={user} 
        onLogin={openAuthModal} 
        onLogout={handleLogout} 
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

      <DocumentAnalyzer 
        isOpen={isAnalyzerOpen} 
        onClose={closeAnalyzer} 
        user={user}
      />
    </div>
  );
}

export default App;