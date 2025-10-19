// src/pages/Integrations.jsx
import React, { useState } from 'react';
import { Github, BookOpen, Trophy, Briefcase, Link2, Check, Zap, Settings } from 'lucide-react';

const Integrations = () => {
  const [connectedPlatforms, setConnectedPlatforms] = useState([]);

  const platforms = [
    {
      id: 'github',
      name: 'GitHub',
      icon: Github,
      description: 'Sync your repositories and coding projects',
      connected: false,
      color: 'var(--primary-color)'
    },
    {
      id: 'coursera',
      name: 'Coursera',
      icon: BookOpen,
      description: 'Import your course certificates and achievements',
      connected: false,
      color: 'var(--success-color)'
    },
    {
      id: 'hackathon',
      name: 'Hackathon Platforms',
      icon: Trophy,
      description: 'Sync your hackathon participations and wins',
      connected: false,
      color: 'var(--warning-color)'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn Learning',
      icon: Briefcase,
      description: 'Import your LinkedIn Learning certificates',
      connected: false,
      color: 'var(--info-color)'
    }
  ];

  const toggleConnection = (platformId) => {
    setConnectedPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  return (
    <div className="integrations-page">
      <div className="page-header">
        <div className="header-content">
          <div className="header-icon">
            <Settings size={32} />
          </div>
          <div className="header-text">
            <h1>Platform Integrations</h1>
            <p>Connect your learning and professional platforms to automatically update your resume</p>
          </div>
        </div>
      </div>

      <div className="integrations-content">
        <div className="integrations-grid">
          {platforms.map(platform => {
            const isConnected = connectedPlatforms.includes(platform.id);
            const IconComponent = platform.icon;
            
            return (
              <div key={platform.id} className={`integration-card ${isConnected ? 'connected' : ''}`}>
                <div className="integration-header">
                  <div className="integration-icon" style={{ backgroundColor: `${platform.color}15`, color: platform.color }}>
                    <IconComponent size={24} />
                  </div>
                  <div className="integration-status">
                    {isConnected ? (
                      <span className="status-connected">
                        <Check size={16} />
                        Connected
                      </span>
                    ) : (
                      <span className="status-disconnected">Not Connected</span>
                    )}
                  </div>
                </div>
                
                <div className="integration-content">
                  <h3>{platform.name}</h3>
                  <p>{platform.description}</p>
                </div>

                <button
                  onClick={() => toggleConnection(platform.id)}
                  className={`connect-btn ${isConnected ? 'connected' : ''}`}
                >
                  <Link2 size={16} />
                  {isConnected ? 'Disconnect' : 'Connect'}
                </button>
              </div>
            );
          })}
        </div>

        <div className="integration-benefits">
          <h2>Benefits of Integration</h2>
          <div className="benefits-list">
            <div className="benefit-item">
              <Zap size={20} />
              <div>
                <h4>Real-time Updates</h4>
                <p>Your resume updates automatically when you complete new courses or projects</p>
              </div>
            </div>
            <div className="benefit-item">
              <Check size={20} />
              <div>
                <h4>Verified Achievements</h4>
                <p>All your accomplishments are verified through platform APIs</p>
              </div>
            </div>
            <div className="benefit-item">
              <Settings size={20} />
              <div>
                <h4>Dynamic Resume</h4>
                <p>Create multiple resume versions tailored for different job applications</p>
              </div>
            </div>
          </div>
        </div>

        <div className="integration-guide">
          <h2>How to Connect Platforms</h2>
          <div className="guide-steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Click Connect</h4>
                <p>Click the connect button on any platform you want to integrate</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Authorize Access</h4>
                <p>Grant permission for ResumeEco to access your platform data</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Automatic Sync</h4>
                <p>Your achievements will automatically appear in your resume</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Integrations;