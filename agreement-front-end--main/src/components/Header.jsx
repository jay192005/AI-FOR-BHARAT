import React, { useState } from 'react';
import UserProfile from './UserProfile';

const Header = ({ user, onLogin, onLogout, onAnalyzeClick }) => {
  const [showProfile, setShowProfile] = useState(false);

  const getInitials = (email) => {
    if (!email) return 'U';
    const name = email.split('@')[0];
    return name.charAt(0).toUpperCase();
  };

  const getAvatarColor = (email) => {
    if (!email) return '#667eea';
    const colors = [
      '#667eea', '#764ba2', '#f093fb', '#f5576c', 
      '#4facfe', '#00f2fe', '#43e97b', '#38f9d7',
      '#ffecd2', '#fcb69f', '#a8edea', '#fed6e3'
    ];
    const index = email.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const handleProfileClick = () => {
    setShowProfile(true);
  };

  const handleCloseProfile = () => {
    setShowProfile(false);
  };

  const handleLogout = () => {
    setShowProfile(false);
    onLogout();
  };

  return (
    <>
      <header className="main-header">
        <div className="container">
          <nav className="main-nav">
            <a href="#" className="logo">lekha.ai</a>
            <ul className="nav-links">
              <li><a href="#features">Features</a></li>
              <li><a href="#resources">Resources</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
              {user && (
                <li><a href="/history">My History</a></li>
              )}
              <li><a href="#about">About</a></li>
            </ul>
            <div className="nav-actions">
              {!user ? (
                <button onClick={onLogin} className="btn btn-primary">
                  Log In
                </button>
              ) : (
                <div 
                  id="userProfileIcon" 
                  onClick={handleProfileClick}
                  style={{ 
                    backgroundColor: getAvatarColor(user.email),
                    cursor: 'pointer'
                  }}
                  title={`${user.email} - Click to view profile`}
                >
                  {getInitials(user.email)}
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>

      {showProfile && user && (
        <UserProfile 
          user={user} 
          onClose={handleCloseProfile} 
          onLogout={handleLogout}
        />
      )}
    </>
  );
};

export default Header;