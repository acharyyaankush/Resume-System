import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import ResumePreview from '../components/ResumePreview';
import ResumeCustomizer from '../components/ResumeCustomizer';
import { ArrowLeft, Eye, Edit3, Layout, Download } from 'lucide-react';

const ResumeBuilder = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { resumeData, dispatch } = useResume();
  const [activeTab, setActiveTab] = useState('customize');
  const [autoSaveStatus, setAutoSaveStatus] = useState('saved');

  const initialSection = searchParams.get('section') || 'personal';

  useEffect(() => {
    if (autoSaveStatus === 'saving') {
      const timer = setTimeout(() => {
        setAutoSaveStatus('saved');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [autoSaveStatus]);

  useEffect(() => {
    setAutoSaveStatus('saving');
  }, [resumeData]);

  const loadSampleData = () => {
    const sampleData = {
      personalInfo: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        linkedin: 'linkedin.com/in/johndoe',
        github: 'github.com/johndoe'
      },
      summary: 'Full-stack developer with 5+ years of experience building scalable web applications. Proficient in React, Node.js, and cloud technologies. Passionate about creating efficient, user-friendly solutions and continuously learning new technologies.',
      education: [
        {
          degree: 'Bachelor of Science in Computer Science',
          institution: 'Stanford University',
          startDate: '2016',
          endDate: '2020',
          gpa: '3.8/4.0'
        }
      ],
      experience: [
        {
          position: 'Senior Frontend Developer',
          company: 'TechCorp Inc.',
          startDate: '2022',
          endDate: 'Present',
          responsibilities: [
            'Led development of customer-facing React applications serving 100k+ users',
            'Implemented responsive designs and improved site performance by 40%',
            'Mentored 3 junior developers and established coding standards',
            'Collaborated with UX team to implement user-centered design principles'
          ]
        },
        {
          position: 'Full Stack Developer',
          company: 'StartupXYZ',
          startDate: '2020',
          endDate: '2022',
          responsibilities: [
            'Developed and maintained both frontend and backend systems using React and Node.js',
            'Built RESTful APIs and integrated with third-party services',
            'Implemented real-time features using WebSocket connections',
            'Deployed applications on AWS using Docker and CI/CD pipelines'
          ]
        }
      ],
      projects: [
        {
          name: 'E-commerce Platform',
          description: 'Built a full-stack e-commerce solution with React, Node.js, and MongoDB',
          technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe API']
        },
        {
          name: 'Task Management App',
          description: 'Developed a collaborative task management application with real-time updates',
          technologies: ['React', 'Socket.io', 'PostgreSQL', 'Redis']
        }
      ],
      skills: [
        'JavaScript (ES6+)',
        'React & React Hooks',
        'Node.js',
        'TypeScript',
        'Python',
        'AWS',
        'Docker',
        'Git',
        'RESTful APIs',
        'MongoDB',
        'PostgreSQL',
        'CI/CD'
      ],
      certifications: [
        {
          name: 'AWS Certified Solutions Architect',
          issuer: 'Amazon Web Services',
          date: '2023'
        },
        {
          name: 'React Advanced Patterns',
          issuer: 'Frontend Masters',
          date: '2022'
        }
      ],
      achievements: [
        'Employee of the Year 2023 at TechCorp Inc.',
        'Best Hackathon Project at Tech Conference 2021',
        'Open Source Contributor to 10+ projects'
      ]
    };

    dispatch({ type: 'LOAD_SAMPLE_DATA', payload: sampleData });
  };

  const clearAllData = () => {
    if (window.confirm('Are you sure you want to clear all resume data? This action cannot be undone.')) {
      const emptyData = {
        personalInfo: {
          name: '',
          email: '',
          phone: '',
          location: '',
          linkedin: '',
          github: ''
        },
        summary: '',
        education: [],
        experience: [],
        projects: [],
        skills: [],
        certifications: [],
        achievements: []
      };
      dispatch({ type: 'LOAD_SAMPLE_DATA', payload: emptyData });
    }
  };

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

  return (
    <div className="resume-builder-page">
      <div className="builder-header">
        <div className="header-left">
          <button 
            onClick={() => navigate('/dashboard')}
            className="back-button"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </button>
          <div className="header-info">
            <h1>Resume Builder</h1>
            <div className="save-status">
              <span className={`status-dot ${autoSaveStatus}`}></span>
              {autoSaveStatus === 'saved' ? 'All changes saved' : 'Saving...'}
            </div>
          </div>
        </div>

        <div className="header-right">
         <div className="completion-indicator">
            <div className="completion-bar">
              <div 
                className="completion-fill"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            <span>{completionPercentage}% Complete</span>
          </div>

          <div className="header-actions">
            <button
              onClick={() => setActiveTab(activeTab === 'customize' ? 'preview' : 'customize')}
              className="tab-toggle-button"
            >
              {activeTab === 'customize' ? (
                <>
                  <Eye size={16} />
                  Preview
                </>
              ) : (
                <>
                  <Edit3 size={16} />
                  Edit
                </>
              )}
            </button>

            <div className="dropdown">
              <button className="options-button">
                <Layout size={16} />
                Options
              </button>
              <div className="dropdown-content">
                <button onClick={loadSampleData} className="dropdown-item">
                  Load Sample Data
                </button>
                <button onClick={clearAllData} className="dropdown-item destructive">
                  Clear All Data
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="progress-section">
        <div className="progress-steps">
          <div className={`progress-step ${completionPercentage > 0 ? 'completed' : 'current'}`}>
            <div className="step-number">1</div>
            <span>Personal Info</span>
          </div>
          <div className={`progress-step ${completionPercentage >= 25 ? 'completed' : ''}`}>
            <div className="step-number">2</div>
            <span>Summary</span>
          </div>
          <div className={`progress-step ${completionPercentage >= 35 ? 'completed' : ''}`}>
            <div className="step-number">3</div>
            <span>Education</span>
          </div>
          <div className={`progress-step ${completionPercentage >= 45 ? 'completed' : ''}`}>
            <div className="step-number">4</div>
            <span>Experience</span>
          </div>
          <div className={`progress-step ${completionPercentage >= 55 ? 'completed' : ''}`}>
            <div className="step-number">5</div>
            <span>Skills</span>
          </div>
          <div className={`progress-step ${completionPercentage >= 65 ? 'completed' : ''}`}>
            <div className="step-number">6</div>
            <span>Projects</span>
          </div>
          <div className={`progress-step ${completionPercentage >= 75 ? 'completed' : ''}`}>
            <div className="step-number">7</div>
            <span>Certifications</span>
          </div>
          <div className={`progress-step ${completionPercentage >= 85 ? 'completed' : ''}`}>
            <div className="step-number">8</div>
            <span>Achievements</span>
          </div>
          <div className={`progress-step ${completionPercentage >= 95 ? 'completed' : ''}`}>
            <div className="step-number">9</div>
            <span>Review</span>
          </div>
        </div>
      </div>

      <div className="builder-content">
        {activeTab === 'customize' ? (
          <div className="customize-view">
            <ResumeCustomizer initialSection={initialSection} />
          </div>
        ) : (
          <div className="preview-view">
            <ResumePreview />
          </div>
        )}
      </div>

      <div className="builder-footer">
        <div className="footer-actions">
          <button
            onClick={() => setActiveTab('preview')}
            className="footer-button secondary"
          >
            <Eye size={16} />
            Preview Resume
          </button>
          <button
            onClick={() => {
              const downloadBtn = document.querySelector('.download-btn');
              if (downloadBtn) downloadBtn.click();
            }}
            className="footer-button primary"
            disabled={completionPercentage < 50}
          >
            <Download size={16} />
            Download PDF
          </button>
        </div>
        <div className="footer-tips">
          {completionPercentage < 50 && (
            <p className="tip-warning">
              💡 Add more content to your resume (currently {completionPercentage}% complete)
            </p>
          )}
          {completionPercentage >= 50 && completionPercentage < 80 && (
            <p className="tip-info">
              💡 Your resume is looking good! Consider adding more details to reach 80% completion.
            </p>
          )}
          {completionPercentage >= 80 && (
            <p className="tip-success">
              ✅ Great! Your resume is ready to download and share.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;