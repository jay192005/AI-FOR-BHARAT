import React from 'react';

const HowItWorks = ({ onStartAnalysisClick }) => {
  const steps = [
    {
      number: "1",
      icon: "📄",
      title: "Upload Your Lease",
      description: "Simply upload a photo or PDF of your rental agreement. Our secure, encrypted platform protects your privacy at every step."
    },
    {
      number: "2", 
      icon: "🔍",
      title: "AI Analysis",
      description: "Our advanced AI analyzes your lease for unfair terms, missing protections, and legal compliance issues in real-time."
    },
    {
      number: "3",
      icon: "📊",
      title: "Get Your Report", 
      description: "Receive a detailed, easy-to-understand report highlighting issues and your rights as a tenant with actionable recommendations."
    }
  ];

  return (
    <>
      <section id="how-it-works" className="how-it-works">
        <div className="container">
          <h2>How It Works: Simple, Fast, Effective</h2>
          <p className="section-subtitle">
            Get peace of mind about your rental agreement in just minutes. Our streamlined process makes tenant protection accessible to everyone, everywhere.
          </p>
          <div className="how-it-works-content">
            <div className="how-it-works-steps">
              {steps.map((step, index) => (
                <div key={index} className="step">
                  <h4>{step.icon} {step.number}. {step.title}</h4>
                  <p>{step.description}</p>
                </div>
              ))}
            </div>
            <div className="how-it-works-image">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="AI analysis dashboard in progress"
              />
            </div>
          </div>
        </div>
      </section>
      
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Analyze Your Lease?</h2>
          <p className="section-subtitle">
            Join thousands of tenants who have gained clarity and confidence about their rental agreements. 
            Start your analysis today - it's completely free for your first lease review.
          </p>
          <div className="hero-buttons" style={{ justifyContent: 'center' }}>
            <button onClick={onStartAnalysisClick} className="btn btn-primary">
              🚀 Start Free Analysis
            </button>
            <button className="btn btn-secondary">📋 View Sample Report</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default HowItWorks;