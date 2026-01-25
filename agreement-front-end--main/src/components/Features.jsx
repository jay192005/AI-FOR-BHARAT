import React from 'react';

const Features = () => {
  const features = [
    {
      icon: "🤖",
      title: "AI-Powered Analysis",
      items: ["Instant results in seconds", "Advanced machine learning", "Plain English explanations"]
    },
    {
      icon: "🚨",
      title: "Red Flag Detection",
      items: ["Real-time warnings", "Legal compliance check", "Risk assessment scoring"]
    },
    {
      icon: "⚖️",
      title: "Know Your Rights",
      items: ["Location-specific laws", "Interactive legal guides", "Regular law updates"]
    },
    {
      icon: "👨‍💼",
      title: "Legal Resources",
      items: ["Vetted professionals", "Free consultations", "Affordable legal options"]
    },
    {
      icon: "🤝",
      title: "Community Support",
      items: ["Peer support network", "Local tenant groups", "Success stories"]
    },
    {
      icon: "📚",
      title: "Educational Hub",
      items: ["Video tutorials", "Downloadable guides", "Expert tips & tricks"]
    }
  ];

  return (
    <section id="features" className="features">
      <div className="container">
        <h2>Everything You Need to Protect Your Rights</h2>
        <p className="section-subtitle">
          Our comprehensive platform provides all the tools and resources you need to understand, 
          analyze, and act on your rental agreements with complete confidence.
        </p>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <ul>
                {feature.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;