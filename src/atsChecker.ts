import type { ResumeData, ATSScore, PersonalInfo, Experience, Education, Skill, Project } from './types';

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
  const commonWords = new Set([
    'the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had', 'her', 'was', 'one', 'our', 'out',
    'with', 'this', 'that', 'from', 'they', 'will', 'have', 'been', 'more', 'when', 'into', 'some', 'than',
    'them', 'other', 'time', 'very', 'just', 'know', 'take', 'person', 'your', 'good', 'some', 'could', 'them',
    'about', 'which', 'their', 'would', 'there', 'could', 'being', 'after', 'before', 'should', 'must', 'also',
    'job', 'work', 'role', 'team', 'need', 'able', 'looking', 'seeking', 'required', 'preferred', 'must', 'strong',
    'experience', 'years', 'skills', 'ability', 'excellent', 'including', 'understanding', 'working', 'knowledge',
  ]);

  return text
    .toLowerCase()
    .replace(/[^\w\s+#.-]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2 && !commonWords.has(word) && !/^\d+$/.test(word));
}

function scorePersonalInfo(info: PersonalInfo) {
  let score = 0;
  const maxScore = 20;
  const suggestions: string[] = [];

  if (info.fullName) score += 4;
  else suggestions.push('Add your full name');

  if (info.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(info.email)) score += 4;
  else suggestions.push('Add a valid email address');

  if (info.phone) score += 3;
  else suggestions.push('Add a phone number');

  if (info.location) score += 3;
  else suggestions.push('Add your location');

  if (info.linkedin) score += 3;
  else suggestions.push('Add your LinkedIn profile');

  if (info.summary && info.summary.length > 50) score += 3;
  else if (!info.summary) suggestions.push('Add a professional summary');
  else suggestions.push('Expand your professional summary');

  return { score, maxScore, suggestions };
}

function scoreExperience(experiences: Experience[], jobKeywords: string[]) {
  let score = 0;
  const maxScore = 30;
  const suggestions: string[] = [];

  if (experiences.length === 0) {
    suggestions.push('Add your work experience');
    return { score, maxScore, suggestions };
  }

  score += Math.min(experiences.length * 5, 10);

  const allText = experiences.map(e => `${e.position} ${e.company} ${e.description}`).join(' ').toLowerCase();
  const matchedKeywords = jobKeywords.filter(kw => allText.includes(kw.toLowerCase()));
  score += Math.min(matchedKeywords.length * 2, 15);

  const hasDescriptions = experiences.every(e => e.description && e.description.length > 20);
  if (hasDescriptions) score += 5;
  else suggestions.push('Add detailed descriptions to your experience entries');

  if (matchedKeywords.length < 5 && jobKeywords.length > 0) {
    suggestions.push(`Consider adding keywords: ${jobKeywords.slice(0, 5).join(', ')}`);
  }

  return { score, maxScore, suggestions };
}

function scoreEducation(educations: Education[]) {
  let score = 0;
  const maxScore = 15;
  const suggestions: string[] = [];

  if (educations.length === 0) {
    suggestions.push('Add your education background');
    return { score, maxScore, suggestions };
  }

  score += Math.min(educations.length * 5, 10);

  const hasCompleteInfo = educations.every(e => e.institution && e.degree && e.field);
  if (hasCompleteInfo) score += 5;
  else suggestions.push('Complete all education fields (institution, degree, field)');

  return { score, maxScore, suggestions };
}

function scoreSkills(skills: Skill[], jobKeywords: string[]) {
  let score = 0;
  const maxScore = 20;
  const suggestions: string[] = [];

  if (skills.length === 0) {
    suggestions.push('Add your skills');
    return { score, maxScore, suggestions };
  }

  score += Math.min(skills.length * 2, 10);

  const skillNames = skills.map(s => s.name.toLowerCase());
  const matchedKeywords = jobKeywords.filter(kw => skillNames.some(sn => sn.includes(kw.toLowerCase()) || kw.toLowerCase().includes(sn)));
  score += Math.min(matchedKeywords.length * 2, 10);

  if (skills.length < 5) {
    suggestions.push('Add more relevant skills (aim for 8-15)');
  }

  return { score, maxScore, suggestions };
}

function scoreProjects(projects: Project[], jobKeywords: string[]) {
  let score = 0;
  const maxScore = 15;
  const suggestions: string[] = [];

  if (projects.length === 0) {
    return { score, maxScore, suggestions: ['Consider adding relevant projects'] };
  }

  score += Math.min(projects.length * 3, 6);

  const allText = projects.map(p => `${p.name} ${p.description} ${p.technologies}`).join(' ').toLowerCase();
  const matchedKeywords = jobKeywords.filter(kw => allText.includes(kw.toLowerCase()));
  score += Math.min(matchedKeywords.length * 2, 6);

  const hasTechnologies = projects.some(p => p.technologies);
  if (hasTechnologies) score += 3;

  return { score, maxScore, suggestions };
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
