// src/components/ResumeCustomizer.jsx
import React, { useState, useEffect } from 'react';
import { useResume } from '../context/ResumeContext';
import { Plus, Trash2, Edit3, Save, X } from 'lucide-react';

const ResumeCustomizer = ({ initialSection = 'personal' }) => {
  const { resumeData, dispatch } = useResume();
  const [activeSection, setActiveSection] = useState(initialSection);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingData, setEditingData] = useState(null);

  // Set initial section from props
  useEffect(() => {
    setActiveSection(initialSection);
  }, [initialSection]);

  const sections = [
    { id: 'personal', label: 'Personal Info', icon: '👤' },
    { id: 'summary', label: 'Summary', icon: '📝' },
    { id: 'education', label: 'Education', icon: '🎓' },
    { id: 'experience', label: 'Experience', icon: '💼' },
    { id: 'skills', label: 'Skills', icon: '⚡' },
    { id: 'projects', label: 'Projects', icon: '🚀' },
    { id: 'certifications', label: 'Certifications', icon: '🏆' },
    { id: 'achievements', label: 'Achievements', icon: '⭐' }
  ];

  // Personal Info
  const updatePersonalInfo = (field, value) => {
    dispatch({
      type: 'UPDATE_PERSONAL_INFO',
      payload: { [field]: value }
    });
  };

  // Summary
  const updateSummary = (value) => {
    dispatch({ type: 'UPDATE_SUMMARY', payload: value });
  };

  // Education
  const addEducation = () => {
    const newEducation = {
      degree: '',
      institution: '',
      startDate: '',
      endDate: '',
      gpa: ''
    };
    dispatch({ type: 'ADD_EDUCATION', payload: newEducation });
  };

  const updateEducation = (index, field, value) => {
    const updatedEducation = { ...resumeData.education[index], [field]: value };
    dispatch({
      type: 'UPDATE_EDUCATION',
      payload: { index, data: updatedEducation }
    });
  };

  const removeEducation = (index) => {
    const updatedEducation = resumeData.education.filter((_, i) => i !== index);
    dispatch({
      type: 'UPDATE_EDUCATION',
      payload: { index, data: updatedEducation }
    });
  };

  // Experience
  const addExperience = () => {
    const newExperience = {
      position: '',
      company: '',
      startDate: '',
      endDate: '',
      responsibilities: ['']
    };
    dispatch({ type: 'ADD_EXPERIENCE', payload: newExperience });
  };

  const updateExperience = (index, field, value) => {
    const updatedExperience = { ...resumeData.experience[index], [field]: value };
    dispatch({
      type: 'UPDATE_EXPERIENCE',
      payload: { index, data: updatedExperience }
    });
  };

  const addResponsibility = (expIndex) => {
    const updatedExp = { ...resumeData.experience[expIndex] };
    updatedExp.responsibilities = [...updatedExp.responsibilities, ''];
    dispatch({
      type: 'UPDATE_EXPERIENCE',
      payload: { index: expIndex, data: updatedExp }
    });
  };

  const updateResponsibility = (expIndex, respIndex, value) => {
    const updatedExp = { ...resumeData.experience[expIndex] };
    updatedExp.responsibilities[respIndex] = value;
    dispatch({
      type: 'UPDATE_EXPERIENCE',
      payload: { index: expIndex, data: updatedExp }
    });
  };

  const removeResponsibility = (expIndex, respIndex) => {
    const updatedExp = { ...resumeData.experience[expIndex] };
    updatedExp.responsibilities = updatedExp.responsibilities.filter((_, i) => i !== respIndex);
    dispatch({
      type: 'UPDATE_EXPERIENCE',
      payload: { index: expIndex, data: updatedExp }
    });
  };

  const removeExperience = (index) => {
    const updatedExperience = resumeData.experience.filter((_, i) => i !== index);
    // This would need to be handled differently in the reducer
  };

  // Skills
  const addSkill = () => {
    const skill = prompt('Enter a skill:');
    if (skill && skill.trim()) {
      dispatch({ type: 'ADD_SKILL', payload: skill.trim() });
    }
  };

  const removeSkill = (index) => {
    const updatedSkills = resumeData.skills.filter((_, i) => i !== index);
    // This would need to be handled differently in the reducer
  };

  const addProject = () => {
    const newProject = {
      name: '',
      description: '',
      technologies: [],
      url: '',
      github: ''
    };
    dispatch({ type: 'ADD_PROJECT', payload: newProject });
  };

  const updateProject = (index, field, value) => {
    const updatedProject = { ...resumeData.projects[index], [field]: value };
    const updatedProjects = resumeData.projects.map((project, i) => 
      i === index ? updatedProject : project
    );
    dispatch({ type: 'LOAD_SAMPLE_DATA', payload: { ...resumeData, projects: updatedProjects } });
  };

  const removeProject = (index) => {
    const updatedProjects = resumeData.projects.filter((_, i) => i !== index);
    dispatch({ type: 'LOAD_SAMPLE_DATA', payload: { ...resumeData, projects: updatedProjects } });
  };

  const addTechnology = (projectIndex, technology) => {
    if (technology && technology.trim()) {
      const project = resumeData.projects[projectIndex];
      const updatedProject = {
        ...project,
        technologies: [...project.technologies, technology.trim()]
      };
      const updatedProjects = resumeData.projects.map((proj, i) => 
        i === projectIndex ? updatedProject : proj
      );
      dispatch({ type: 'LOAD_SAMPLE_DATA', payload: { ...resumeData, projects: updatedProjects } });
    }
  };

  const removeTechnology = (projectIndex, technologyIndex) => {
    const project = resumeData.projects[projectIndex];
    const updatedProject = {
      ...project,
      technologies: project.technologies.filter((_, i) => i !== technologyIndex)
    };
    const updatedProjects = resumeData.projects.map((proj, i) => 
      i === projectIndex ? updatedProject : proj
    );
    dispatch({ type: 'LOAD_SAMPLE_DATA', payload: { ...resumeData, projects: updatedProjects } });
  };

  // Certifications - FIXED FUNCTIONS
  const addCertification = () => {
    const newCertification = {
      name: '',
      issuer: '',
      date: '',
      url: ''
    };
    dispatch({ type: 'ADD_CERTIFICATION', payload: newCertification });
  };

  const updateCertification = (index, field, value) => {
    const updatedCertification = { ...resumeData.certifications[index], [field]: value };
    const updatedCertifications = resumeData.certifications.map((cert, i) => 
      i === index ? updatedCertification : cert
    );
    dispatch({ type: 'LOAD_SAMPLE_DATA', payload: { ...resumeData, certifications: updatedCertifications } });
  };

  const removeCertification = (index) => {
    const updatedCertifications = resumeData.certifications.filter((_, i) => i !== index);
    dispatch({ type: 'LOAD_SAMPLE_DATA', payload: { ...resumeData, certifications: updatedCertifications } });
  };

  // Achievements
  const addAchievement = () => {
    const achievement = prompt('Enter an achievement:');
    if (achievement && achievement.trim()) {
      dispatch({ type: 'ADD_ACHIEVEMENT', payload: achievement.trim() });
    }
  };

  const removeAchievement = (index) => {
    const updatedAchievements = resumeData.achievements.filter((_, i) => i !== index);
    // This would need to be handled differently in the reducer
  };

  return (
    <div className="resume-customizer">
      {/* Section Tabs */}
      <div className="section-tabs-container">
        <div className="section-tabs">
          {sections.map(section => (
            <button
              key={section.id}
              className={`section-tab ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => setActiveSection(section.id)}
            >
              <span className="tab-icon">{section.icon}</span>
              <span className="tab-label">{section.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Section Content */}
      <div className="section-content">
        {/* Personal Information Section */}
        {activeSection === 'personal' && (
          <div className="form-section">
            <h3>Personal Information</h3>
            <p className="section-description">Add your basic contact information</p>
            
            <div className="form-grid">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={resumeData.personalInfo.name}
                  onChange={(e) => updatePersonalInfo('name', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  placeholder="john.doe@example.com"
                  value={resumeData.personalInfo.email}
                  onChange={(e) => updatePersonalInfo('email', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={resumeData.personalInfo.phone}
                  onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  placeholder="San Francisco, CA"
                  value={resumeData.personalInfo.location}
                  onChange={(e) => updatePersonalInfo('location', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>LinkedIn URL</label>
                <input
                  type="url"
                  placeholder="https://linkedin.com/in/username"
                  value={resumeData.personalInfo.linkedin}
                  onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>GitHub URL</label>
                <input
                  type="url"
                  placeholder="https://github.com/username"
                  value={resumeData.personalInfo.github}
                  onChange={(e) => updatePersonalInfo('github', e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Summary Section */}
        {activeSection === 'summary' && (
          <div className="form-section">
            <h3>Professional Summary</h3>
            <p className="section-description">
              Write a brief overview of your professional background and career objectives
            </p>
            
            <div className="form-group">
              <textarea
                placeholder="Experienced software developer with 5+ years in full-stack web development. Passionate about creating efficient, scalable solutions and continuously learning new technologies..."
                value={resumeData.summary}
                onChange={(e) => updateSummary(e.target.value)}
                rows={8}
                className="summary-textarea"
              />
            </div>

            <div className="summary-tips">
              <h4>💡 Tips for a great summary:</h4>
              <ul>
                <li>Keep it concise (3-5 sentences)</li>
                <li>Highlight your key skills and experience</li>
                <li>Mention your career objectives</li>
                <li>Use action words and quantify achievements</li>
              </ul>
            </div>
          </div>
        )}

        {/* Education Section */}
        {activeSection === 'education' && (
          <div className="form-section">
            <div className="section-header">
              <div>
                <h3>Education</h3>
                <p className="section-description">Add your educational background</p>
              </div>
              <button onClick={addEducation} className="add-btn">
                <Plus size={16} />
                Add Education
              </button>
            </div>

            {resumeData.education.length === 0 ? (
              <div className="empty-state">
                <p>No education added yet. Add your first education entry to get started.</p>
              </div>
            ) : (
              <div className="items-list">
                {resumeData.education.map((edu, index) => (
                  <div key={index} className="form-card">
                    <div className="card-header">
                      <h4>Education #{index + 1}</h4>
                      <button 
                        onClick={() => removeEducation(index)}
                        className="remove-btn"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Degree *</label>
                        <input
                          type="text"
                          placeholder="Bachelor of Science in Computer Science"
                          value={edu.degree}
                          onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label>Institution *</label>
                        <input
                          type="text"
                          placeholder="University Name"
                          value={edu.institution}
                          onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label>Start Date</label>
                        <input
                          type="text"
                          placeholder="2016"
                          value={edu.startDate}
                          onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label>End Date</label>
                        <input
                          type="text"
                          placeholder="2020 or Present"
                          value={edu.endDate}
                          onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label>GPA</label>
                        <input
                          type="text"
                          placeholder="3.8/4.0"
                          value={edu.gpa}
                          onChange={(e) => updateEducation(index, 'gpa', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Experience Section */}
        {activeSection === 'experience' && (
          <div className="form-section">
            <div className="section-header">
              <div>
                <h3>Work Experience</h3>
                <p className="section-description">Add your professional work experience</p>
              </div>
              <button onClick={addExperience} className="add-btn">
                <Plus size={16} />
                Add Experience
              </button>
            </div>

            {resumeData.experience.length === 0 ? (
              <div className="empty-state">
                <p>No work experience added yet. Add your first job to get started.</p>
              </div>
            ) : (
              <div className="items-list">
                {resumeData.experience.map((exp, expIndex) => (
                  <div key={expIndex} className="form-card">
                    <div className="card-header">
                      <h4>Experience #{expIndex + 1}</h4>
                      <button 
                        onClick={() => removeExperience(expIndex)}
                        className="remove-btn"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Position *</label>
                        <input
                          type="text"
                          placeholder="Senior Software Engineer"
                          value={exp.position}
                          onChange={(e) => updateExperience(expIndex, 'position', e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label>Company *</label>
                        <input
                          type="text"
                          placeholder="Tech Company Inc."
                          value={exp.company}
                          onChange={(e) => updateExperience(expIndex, 'company', e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label>Start Date</label>
                        <input
                          type="text"
                          placeholder="Jan 2022"
                          value={exp.startDate}
                          onChange={(e) => updateExperience(expIndex, 'startDate', e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label>End Date</label>
                        <input
                          type="text"
                          placeholder="Present or Dec 2023"
                          value={exp.endDate}
                          onChange={(e) => updateExperience(expIndex, 'endDate', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="responsibilities-section">
                      <label>Responsibilities & Achievements</label>
                      {exp.responsibilities.map((resp, respIndex) => (
                        <div key={respIndex} className="responsibility-item">
                          <input
                            type="text"
                            placeholder="Describe your key responsibilities and achievements..."
                            value={resp}
                            onChange={(e) => updateResponsibility(expIndex, respIndex, e.target.value)}
                          />
                          {exp.responsibilities.length > 1 && (
                            <button
                              onClick={() => removeResponsibility(expIndex, respIndex)}
                              className="remove-responsibility"
                            >
                              <X size={16} />
                            </button>
                          )}
                        </div>
                      ))}
                      <button 
                        onClick={() => addResponsibility(expIndex)}
                        className="add-responsibility"
                      >
                        <Plus size={14} />
                        Add Responsibility
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Skills Section */}
        {activeSection === 'skills' && (
          <div className="form-section">
            <div className="section-header">
              <div>
                <h3>Skills</h3>
                <p className="section-description">Add your technical and professional skills</p>
              </div>
              <button onClick={addSkill} className="add-btn">
                <Plus size={16} />
                Add Skill
              </button>
            </div>

            {resumeData.skills.length === 0 ? (
              <div className="empty-state">
                <p>No skills added yet. Add your first skill to get started.</p>
              </div>
            ) : (
              <div className="skills-container">
                <div className="skills-display">
                  {resumeData.skills.map((skill, index) => (
                    <div key={index} className="skill-tag-editable">
                      <span>{skill}</span>
                      <button 
                        onClick={() => removeSkill(index)}
                        className="remove-skill"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="skills-tips">
              <h4>💡 Skill Categories to Consider:</h4>
              <div className="skill-categories">
                <div className="category">
                  <strong>Technical:</strong> Programming languages, frameworks, tools
                </div>
                <div className="category">
                  <strong>Soft Skills:</strong> Communication, leadership, problem-solving
                </div>
                <div className="category">
                  <strong>Languages:</strong> English, Spanish, etc.
                </div>
              </div>
            </div>
          </div>
        )}

           {activeSection === 'projects' && (
          <div className="content-section">
            <div className="section-header">
              <h2>Projects</h2>
              <button onClick={addProject} className="add-btn">
                <Plus size={16} />
                Add Project
              </button>
            </div>

            {resumeData.projects.length === 0 ? (
              <div className="empty-state">
                <p>No projects added yet. Add your first project to showcase your work.</p>
              </div>
            ) : (
              <div className="items-list">
                {resumeData.projects.map((project, index) => (
                  <div key={index} className="form-card">
                    <div className="card-header">
                      <h4>Project #{index + 1}</h4>
                      <button 
                        onClick={() => removeProject(index)}
                        className="remove-btn"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Project Name *</label>
                        <input
                          type="text"
                          placeholder="E-commerce Platform"
                          value={project.name}
                          onChange={(e) => updateProject(index, 'name', e.target.value)}
                        />
                      </div>
                      
                      <div className="form-group full-width">
                        <label>Description</label>
                        <textarea
                          placeholder="Describe the project, your role, and key achievements..."
                          value={project.description}
                          onChange={(e) => updateProject(index, 'description', e.target.value)}
                          rows={4}
                        />
                      </div>
                      
                      <div className="form-group full-width">
                        <label>Technologies Used</label>
                        <div className="technologies-input">
                          <input
                            type="text"
                            placeholder="Add technology and press Enter"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && e.target.value.trim()) {
                                addTechnology(index, e.target.value.trim());
                                e.target.value = '';
                              }
                            }}
                            className="technology-input"
                          />
                          <div className="technologies-list">
                            {project.technologies.map((tech, techIndex) => (
                              <span key={techIndex} className="technology-tag">
                                {tech}
                                <button 
                                  onClick={() => removeTechnology(index, techIndex)}
                                  className="remove-technology"
                                >
                                  <X size={12} />
                                </button>
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="form-group">
                        <label>Project URL</label>
                        <input
                          type="url"
                          placeholder="https://example.com"
                          value={project.url || ''}
                          onChange={(e) => updateProject(index, 'url', e.target.value)}
                        />
                      </div>

                      <div className="form-group">
                        <label>GitHub Repository</label>
                        <input
                          type="url"
                          placeholder="https://github.com/username/repo"
                          value={project.github || ''}
                          onChange={(e) => updateProject(index, 'github', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Certifications Section */}
        {activeSection === 'certifications' && (
          <div className="content-section">
            <div className="section-header">
              <h2>Certifications</h2>
              <button onClick={addCertification} className="add-btn">
                <Plus size={16} />
                Add Certification
              </button>
            </div>

            {resumeData.certifications.length === 0 ? (
              <div className="empty-state">
                <p>No certifications added yet. Add your first certification.</p>
              </div>
            ) : (
              <div className="items-list">
                {resumeData.certifications.map((cert, index) => (
                  <div key={index} className="form-card">
                    <div className="card-header">
                      <h4>Certification #{index + 1}</h4>
                      <button 
                        onClick={() => removeCertification(index)}
                        className="remove-btn"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Certification Name *</label>
                        <input
                          type="text"
                          placeholder="AWS Certified Solutions Architect"
                          value={cert.name}
                          onChange={(e) => updateCertification(index, 'name', e.target.value)}
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Issuing Organization *</label>
                        <input
                          type="text"
                          placeholder="Amazon Web Services"
                          value={cert.issuer}
                          onChange={(e) => updateCertification(index, 'issuer', e.target.value)}
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Issue Date</label>
                        <input
                          type="text"
                          placeholder="Jan 2023"
                          value={cert.date}
                          onChange={(e) => updateCertification(index, 'date', e.target.value)}
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Credential URL</label>
                        <input
                          type="url"
                          placeholder="https://www.credly.com/users/username/badges/123456"
                          value={cert.url || ''}
                          onChange={(e) => updateCertification(index, 'url', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}


        {/* Achievements Section */}
        {activeSection === 'achievements' && (
          <div className="form-section">
            <div className="section-header">
              <div>
                <h3>Achievements</h3>
                <p className="section-description">Highlight your awards and accomplishments</p>
              </div>
              <button onClick={addAchievement} className="add-btn">
                <Plus size={16} />
                Add Achievement
              </button>
            </div>

            {resumeData.achievements.length === 0 ? (
              <div className="empty-state">
                <p>No achievements added yet. Add your first achievement.</p>
              </div>
            ) : (
              <div className="achievements-list">
                {resumeData.achievements.map((achievement, index) => (
                  <div key={index} className="achievement-item">
                    <input
                      type="text"
                      placeholder="Describe your achievement..."
                      value={achievement}
                      onChange={(e) => {
                        // This would need updateAchievement function
                      }}
                    />
                    <button 
                      onClick={() => removeAchievement(index)}
                      className="remove-achievement"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeCustomizer;