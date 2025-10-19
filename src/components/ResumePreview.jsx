import React, { useRef } from 'react';
import { useResume } from '../context/ResumeContext';
import { Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ResumePreview = () => {
  const { resumeData } = useResume();
  const resumeRef = useRef();

  const downloadPDF = async () => {
    const element = resumeRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`${resumeData.personalInfo.name || 'resume'}.pdf`);
  };

  return (
    <div className="resume-preview-container">
      <div className="preview-header">
        <h2>Resume Preview</h2>
        <button onClick={downloadPDF} className="download-btn">
          <Download size={16} />
          Download PDF
        </button>
      </div>
      
      <div ref={resumeRef} className="resume-preview">
        <header className="resume-header">
          <h1>{resumeData.personalInfo.name || 'Your Name'}</h1>
          <div className="contact-info">
            {resumeData.personalInfo.email && <span>{resumeData.personalInfo.email}</span>}
            {resumeData.personalInfo.phone && <span>{resumeData.personalInfo.phone}</span>}
            {resumeData.personalInfo.location && <span>{resumeData.personalInfo.location}</span>}
          </div>
        </header>

        {resumeData.summary && (
          <section className="resume-section">
            <h2>Professional Summary</h2>
            <p>{resumeData.summary}</p>
          </section>
        )}

        {resumeData.education.length > 0 && (
          <section className="resume-section">
            <h2>Education</h2>
            {resumeData.education.map((edu, index) => (
              <div key={index} className="education-item">
                <h3>{edu.degree}</h3>
                <p className="institution">{edu.institution}</p>
                <p className="duration">{edu.startDate} - {edu.endDate}</p>
                {edu.gpa && <p className="gpa">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </section>
        )}

        {resumeData.experience.length > 0 && (
          <section className="resume-section">
            <h2>Experience</h2>
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="experience-item">
                <h3>{exp.position}</h3>
                <p className="company">{exp.company}</p>
                <p className="duration">{exp.startDate} - {exp.endDate}</p>
                <ul className="responsibilities">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx}>{resp}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}

        {resumeData.projects.length > 0 && (
          <section className="resume-section">
            <h2>Projects</h2>
            {resumeData.projects.map((project, index) => (
              <div key={index} className="project-item">
                <h3>{project.name}</h3>
                <p className="project-description">{project.description}</p>
                <p className="technologies">
                  <strong>Technologies:</strong> {project.technologies.join(', ')}
                </p>
              </div>
            ))}
          </section>
        )}

        {resumeData.skills.length > 0 && (
          <section className="resume-section">
            <h2>Skills</h2>
            <div className="skills-list">
              {resumeData.skills.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </section>
        )}

        {resumeData.certifications.length > 0 && (
          <section className="resume-section">
            <h2>Certifications</h2>
            {resumeData.certifications.map((cert, index) => (
              <div key={index} className="certification-item">
                <h3>{cert.name}</h3>
                <p className="issuer">{cert.issuer}</p>
                <p className="date">{cert.date}</p>
              </div>
            ))}
          </section>
        )}

        {resumeData.achievements.length > 0 && (
          <section className="resume-section">
            <h2>Achievements</h2>
            <ul className="achievements-list">
              {resumeData.achievements.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
};

export default ResumePreview