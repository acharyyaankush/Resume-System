import React, { createContext, useContext, useReducer } from 'react';

const ResumeContext = createContext();

const initialResumeData = {
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

function resumeReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_PERSONAL_INFO':
      return {
        ...state,
        personalInfo: { ...state.personalInfo, ...action.payload }
      };
    case 'UPDATE_SUMMARY':
      return { ...state, summary: action.payload };
    case 'ADD_EDUCATION':
      return { ...state, education: [...state.education, action.payload] };
    case 'UPDATE_EDUCATION':
      const updatedEducation = state.education.map((edu, index) =>
        index === action.payload.index ? action.payload.data : edu
      );
      return { ...state, education: updatedEducation };
    case 'ADD_EXPERIENCE':
      return { ...state, experience: [...state.experience, action.payload] };
    case 'UPDATE_EXPERIENCE':
      const updatedExperience = state.experience.map((exp, index) =>
        index === action.payload.index ? action.payload.data : exp
      );
      return { ...state, experience: updatedExperience };
    case 'ADD_PROJECT':
      return { ...state, projects: [...state.projects, action.payload] };
    case 'ADD_SKILL':
      return { ...state, skills: [...state.skills, action.payload] };
    case 'ADD_CERTIFICATION':
      return { ...state, certifications: [...state.certifications, action.payload] };
    case 'ADD_ACHIEVEMENT':
      return { ...state, achievements: [...state.achievements, action.payload] };
    case 'LOAD_SAMPLE_DATA':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export function ResumeProvider({ children }) {
  const [resumeData, dispatch] = useReducer(resumeReducer, initialResumeData);

  return (
    <ResumeContext.Provider value={{ resumeData, dispatch }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}