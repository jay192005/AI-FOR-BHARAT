import React, { useState, useEffect } from 'react';

const UserProfile = ({ user, onClose, onLogout }) => {
  const [userStats, setUserStats] = useState({
    analysesCount: 0,
    joinDate: '',
    lastLogin: '',
    savedDocuments: 0,
    riskScore: 0
  });

  useEffect(() => {
    // Simulate fetching user data
    const mockUserData = {
      analysesCount: Math.floor(Math.random() * 15) + 1,
      joinDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      lastLogin: new Date().toLocaleDateString(),
      savedDocuments: Math.floor(Math.random() * 8) + 1,
      riskScore: Math.floor(Math.random() * 40) + 60 // 60-100 range
    };
    setUserStats(mockUserData);
  }, []);

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

  const recentAnalyses = [
    { id: 1, document: 'Apartment Lease - Downtown', date: '2 days ago', risk: 'Low', score: 85 },
    { id: 2, document: 'Commercial Space Agreement', date: '1 week ago', risk: 'Medium', score: 72 },
    { id: 3, document: 'Studio Rental Contract', date: '2 weeks ago', risk: 'Low', score: 91 }
  ];

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Low': return '#48bb78';
      case 'Medium': return '#ed8936';
      case 'High': return '#f56565';
      default: return '#718096';
    }
  };

  return (
    <div className="profile-overlay" onClick={onClose}>
      <div className="profile-popup" onClick={(e) => e.stopPropagation()}>
        <div className="profile-header">
          <div className="profile-avatar-large" style={{ backgroundColor: getAvatarColor(user.email) }}>
            {getInitials(user.email)}
          </div>
          <div className="profile-info">
            <h3>{user.email.split('@')[0]}</h3>
            <p>{user.email}</p>
            <div className="profile-badges">
              <span className="badge badge-premium">Premium User</span>
              <span className="badge badge-verified">✓ Verified</span>
            </div>
          </div>
          <button className="profile-close" onClick={onClose}>×</button>
        </div>

        <div className="profile-stats">
          <div className="stat-card">
            <div className="stat-number">{userStats.analysesCount}</div>
            <div className="stat-label">Analyses</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{userStats.savedDocuments}</div>
            <div className="stat-label">Saved Docs</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{userStats.riskScore}%</div>
            <div className="stat-label">Avg Score</div>
          </div>
        </div>

        <div className="profile-section">
          <h4>📊 Account Overview</h4>
          <div className="profile-details">
            <div className="detail-row">
              <span className="detail-label">Member Since:</span>
              <span className="detail-value">{userStats.joinDate}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Last Login:</span>
              <span className="detail-value">{userStats.lastLogin}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Account Type:</span>
              <span className="detail-value">Premium</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Status:</span>
              <span className="detail-value status-active">Active</span>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h4>📋 Recent Analyses</h4>
          <div className="recent-analyses">
            {recentAnalyses.map((analysis) => (
              <div key={analysis.id} className="analysis-item">
                <div className="analysis-info">
                  <div className="analysis-name">{analysis.document}</div>
                  <div className="analysis-date">{analysis.date}</div>
                </div>
                <div className="analysis-result">
                  <span 
                    className="risk-badge" 
                    style={{ backgroundColor: getRiskColor(analysis.risk) }}
                  >
                    {analysis.risk} Risk
                  </span>
                  <span className="score">{analysis.score}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="profile-section">
          <h4>⚙️ Quick Actions</h4>
          <div className="quick-actions">
            <button className="action-btn" onClick={() => { onClose(); /* Open analyzer */ }}>
              <span className="action-icon">📄</span>
              New Analysis
            </button>
            <button className="action-btn">
              <span className="action-icon">📚</span>
              View History
            </button>
            <button className="action-btn">
              <span className="action-icon">⚙️</span>
              Settings
            </button>
            <button className="action-btn logout-btn" onClick={onLogout}>
              <span className="action-icon">🚪</span>
              Logout
            </button>
          </div>
        </div>

        <div className="profile-footer">
          <div className="subscription-info">
            <div className="subscription-badge">
              <span className="crown-icon">👑</span>
              Premium Plan
            </div>
            <div className="subscription-details">
              <p>Unlimited analyses • Priority support • Advanced features</p>
              <button className="upgrade-btn">Manage Subscription</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;