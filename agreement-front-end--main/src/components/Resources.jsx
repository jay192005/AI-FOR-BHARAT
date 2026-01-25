import React from 'react';

const Resources = () => {
  const resources = [
    {
      icon: "📖",
      title: "Tenant Rights 101: Everything You Need to Know",
      description: "A comprehensive guide covering basic tenant rights, common issues, and how to protect yourself in any rental situation.",
      link: "#",
      category: "Essential Guide"
    },
    {
      icon: "💰",
      title: "How to Negotiate Your Rent Like a Pro", 
      description: "Expert tips and proven strategies for successful rent negotiations with your landlord, including scripts and timing advice.",
      link: "#",
      category: "Expert Tips"
    },
    {
      icon: "✅",
      title: "Lease Review Checklist",
      description: "A printable, comprehensive checklist to help you review any rental agreement before signing, ensuring you don't miss critical details.",
      link: "#",
      category: "Free Tool"
    }
  ];

  return (
    <section id="resources" className="resources">
      <div className="container">
        <h2>Free Resources to Empower You</h2>
        <p className="section-subtitle">
          Access our library of guides, templates, and educational materials created by tenant rights experts. 
          All resources are completely free and regularly updated with the latest legal information.
        </p>
        <div className="resources-grid">
          {resources.map((resource, index) => (
            <div key={index} className="resource-card">
              <div className="resource-content">
                <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>{resource.icon}</div>
                <div style={{ 
                  display: 'inline-block', 
                  background: 'var(--gradient-primary)', 
                  color: 'white', 
                  padding: '4px 12px', 
                  borderRadius: '20px', 
                  fontSize: '0.8rem', 
                  fontWeight: '600',
                  marginBottom: '15px'
                }}>
                  {resource.category}
                </div>
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
              </div>
              <div className="resource-footer">
                <a href={resource.link}>Access Resource</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Resources;