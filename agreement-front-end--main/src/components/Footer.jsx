import React from 'react';

const Footer = () => {
  return (
    <footer id="about" className="main-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h4>lekha.ai</h4>
            <p>
              Empowering tenants through transparent rental agreements and comprehensive legal resources. 
              Your rights matter, and we're here to help you protect them.
            </p>
          </div>
          <div className="footer-col">
            <h4>Platform</h4>
            <ul>
              <li><a href="#features">Lease Analysis</a></li>
              <li><a href="#resources">Know Your Rights</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Resources</h4>
            <ul>
              <li><a href="#">Tenant Guides</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Our Mission</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 lekha.ai. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;