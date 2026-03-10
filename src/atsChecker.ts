import dotenv from 'dotenv';
import path from 'path';
dotenv.config();

import type { ResumeData, ATSScore, PersonalInfo, Experience, Education, Skill, Project } from './types';

const config = {
  api_key: process.env.ATS_API_KEY,
  api_secret: process.env.ATS_API_SECRET,
};

export function getEmptyResume(): ResumeData {
  return {
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      website: '',
      summary: '',
      photo: '',
    },
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: [],
    awards: [],
  };
}

function extractKeywords(text: string): string[] {
  // ...
}

function scorePersonalInfo(info: PersonalInfo) {
  // ...
}

function scoreExperience(experiences: Experience[], jobKeywords: string[]) {
  // ...
}

function scoreEducation(educations: Education[]) {
  // ...
}

function scoreSkills(skills: Skill[], jobKeywords: string[]) {
  // ...
}

function scoreProjects(projects: Project[], jobKeywords: string[]) {
  // ...
}

export function calculateATSScore(resume: ResumeData, jobDescription: string): ATSScore {
  const jobKeywords = [...new Set(extractKeywords(jobDescription))];
  const resumeText = `
    ${resume.personalInfo.fullName} ${resume.personalInfo.summary}
    ${resume.experience.map(e => `${e.position} ${e.company} ${e.description}`).join(' ')}
    ${resume.education.map(e => `${e.degree} ${e.field} ${e.institution}`).join(' ')}
    ${resume.skills.map(s => s.name).join(' ')}
    ${resume.projects.map(p => `${p.name} ${p.technologies} ${p.description}`).join(' ')}
    ${resume.certifications.map(c => `${c.name} ${c.issuer}`).join(' ')}
  `.toLowerCase();

  const foundKeywords = jobKeywords.filter(kw => resumeText.includes(kw.toLowerCase()));
  const missingKeywords = jobKeywords.filter(kw => !resumeText.includes(kw.toLowerCase()));

  const personalInfoResult = scorePersonalInfo(resume.personalInfo);
  const experienceResult = scoreExperience(resume.experience, jobKeywords);
  const educationResult = scoreEducation(resume.education);
  const skillsResult = scoreSkills(resume.skills, jobKeywords);
  const projectsResult = scoreProjects(resume.projects, jobKeywords);

  const sections: ATSScore['sections'] = [
    { name: 'Personal Info', ...personalInfoResult },
    { name: 'Experience', ...experienceResult },
    { name: 'Education', ...educationResult },
    { name: 'Skills', ...skillsResult },
    { name: 'Projects', ...projectsResult },
  ];

  const total = Math.round(sections.reduce((sum, s) => sum + s.score, 0) / sections.reduce((sum, s) => sum + s.maxScore, 0) * 100);

  const issues: string[] = [];
  if (!resume.personalInfo.email) issues.push('Missing email address');
  if (!resume.personalInfo.phone) issues.push('Missing phone number');
  if (resume.experience.length === 0) issues.push('No work experience listed');
  if (resume.skills.length < 5) issues.push('Too few skills listed (add more relevant skills)');
  if (resume.personalInfo.summary && resume.personalInfo.summary.length < 50) issues.push('Professional summary is too short');

  return {
    total,
    sections,
    keywords: {
      found: foundKeywords,
      missing: missingKeywords,
    },
    issues,
  };
}