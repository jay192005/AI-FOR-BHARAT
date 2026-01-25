import React from 'react';

const Hero = ({ onAnalyzeClick, onLearnMoreClick }) => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>Understand Your Lease in Minutes.</h1>
          <p>We give you the tools, knowledge, and support you need to protect your rights as a tenant. Analyze your lease for free with our AI-powered platform.</p>
          <div className="hero-buttons">
            <button onClick={onAnalyzeClick} className="btn btn-primary">
              ✨ Analyze My Lease
            </button>
            <button onClick={onLearnMoreClick} className="btn btn-secondary">
              📚 Learn More
            </button>
          </div>
        </div>
        <div className="hero-image">
          <img 
            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
            alt="Modern document analysis interface"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;