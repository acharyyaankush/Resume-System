import React from 'react';
import { Link } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { FileText, Settings, Zap, TrendingUp, Plus, Eye, Download } from 'lucide-react';

const Dashboard = () => {
  const { resumeData } = useResume();

  const completionPercentage = calculateCompletion(resumeData);

  function calculateCompletion(data) {
    const fields = [
      data.personalInfo.name,
      data.personalInfo.email,
      data.summary,
      data.education.length,
      data.experience.length,
      data.skills.length
    ];
    
    const filledFields = fields.filter(field => {
      if (Array.isArray(field)) return field.length > 0;
      return Boolean(field);
    }).length;

    return Math.round((filledFields / fields.length) * 100);
  }

  const quickActions = [
    {
      title: 'Add Education',
      description: 'Add your educational background',
      icon: Plus,
      link: '/builder?section=education',
      color: 'var(--primary-color)'
    },
    {
      title: 'Add Experience',
      description: 'Add your work experience',
      icon: Plus,
      link: '/builder?section=experience',
      color: 'var(--success-color)'
    },
    {
      title: 'Add Skills',
      description: 'Showcase your technical skills',
      icon: Plus,
      link: '/builder?section=skills',
      color: 'var(--warning-color)'
    },
    {
      title: 'Preview Resume',
      description: 'View your current resume',
      icon: Eye,
      link: '/builder',
      color: 'var(--info-color)'
    }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Manage your professional resume and track your progress</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon primary">
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <h3>{completionPercentage}%</h3>
            <p>Profile Completion</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon success">
            <FileText size={24} />
          </div>
          <div className="stat-content">
            <h3>{resumeData.experience.length}</h3>
            <p>Work Experiences</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon warning">
            <Zap size={24} />
          </div>
          <div className="stat-content">
            <h3>{resumeData.skills.length}</h3>
            <p>Skills</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon info">
            <FileText size={24} />
          </div>
          <div className="stat-content">
            <h3>{resumeData.education.length}</h3>
            <p>Education Entries</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Quick Actions</h2>
            <Link to="/builder" className="view-all-link">
              Go to Builder
            </Link>
          </div>
          <div className="quick-actions-grid">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <Link key={index} to={action.link} className="quick-action-card">
                  <div 
                    className="action-icon"
                    style={{ backgroundColor: `${action.color}15`, color: action.color }}
                  >
                    <IconComponent size={24} />
                  </div>
                  <div className="action-content">
                    <h4>{action.title}</h4>
                    <p>{action.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h2>Recent Activity</h2>
          </div>
          <div className="activity-list">
            {resumeData.experience.length === 0 && resumeData.education.length === 0 ? (
              <div className="empty-state">
                <FileText size={48} className="empty-icon" />
                <h3>No activity yet</h3>
                <p>Start building your resume by adding your education and work experience.</p>
                <Link to="/builder" className="primary-button">
                  <Plus size={16} />
                  Start Building
                </Link>
              </div>
            ) : (
              <>
                {resumeData.experience.slice(0, 3).map((exp, index) => (
                  <div key={index} className="activity-item">
                    <div className="activity-icon experience">
                      <FileText size={16} />
                    </div>
                    <div className="activity-content">
                      <p>Added work experience at <strong>{exp.company}</strong></p>
                      <span className="activity-time">Recently added</span>
                    </div>
                  </div>
                ))}
                {resumeData.education.slice(0, 3).map((edu, index) => (
                  <div key={index} className="activity-item">
                    <div className="activity-icon education">
                      <FileText size={16} />
                    </div>
                    <div className="activity-content">
                      <p>Added education from <strong>{edu.institution}</strong></p>
                      <span className="activity-time">Recently added</span>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h2>Resume Preview</h2>
            <Link to="/builder" className="view-all-link">
              Edit Resume
            </Link>
          </div>
          <div className="resume-preview-card">
            <div className="preview-header">
              <h3>{resumeData.personalInfo.name || 'Your Name'}</h3>
              <p>{resumeData.personalInfo.email || 'your.email@example.com'}</p>
            </div>
            <div className="preview-stats">
              <div className="preview-stat">
                <span className="stat-value">{resumeData.experience.length}</span>
                <span className="stat-label">Experiences</span>
              </div>
              <div className="preview-stat">
                <span className="stat-value">{resumeData.education.length}</span>
                <span className="stat-label">Education</span>
              </div>
              <div className="preview-stat">
                <span className="stat-value">{resumeData.skills.length}</span>
                <span className="stat-label">Skills</span>
              </div>
            </div>
            <div className="preview-actions">
              <Link to="/builder" className="secondary-button">
                <Eye size={16} />
                Preview
              </Link>
              <button className="primary-button" disabled={completionPercentage < 50}>
                <Download size={16} />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard