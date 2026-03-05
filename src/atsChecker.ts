import type { ResumeData, ATSScore, PersonalInfo, Experience, Education, Skill, Project } from './types';

const COMMON_KEYWORDS = [
  // Action verbs
  'achieved', 'developed', 'managed', 'created', 'implemented', 'designed',
  'led', 'improved', 'increased', 'reduced', 'analyzed', 'coordinated',
  'established', 'launched', 'optimized', 'streamlined', 'spearheaded',
  
  // Tech skills
  'javascript', 'typescript', 'python', 'java', 'react', 'node', 'sql',
  'aws', 'docker', 'kubernetes', 'git', 'agile', 'scrum', 'api', 'rest',
  'machine learning', 'data analysis', 'project management',
  
  // Soft skills
  'leadership', 'communication', 'teamwork', 'problem-solving', 'collaboration',
  'adaptability', 'time management', 'critical thinking',
];

const SECTION_WEIGHTS = {
  personalInfo: 15,
  experience: 30,
  education: 15,
  skills: 25,
  projects: 15,
};

export function calculateATSScore(resume: ResumeData, jobDescription: string): ATSScore {
  const sections: ATSScore['sections'] = [];
  const issues: string[] = [];
  let totalScore = 0;

  // Extract keywords from job description
  const jobKeywords = extractKeywords(jobDescription.toLowerCase());
  
  // Check Personal Info
  const personalScore = scorePersonalInfo(resume.personalInfo);
  sections.push({
    name: 'Personal Information',
    score: personalScore.score,
    maxScore: SECTION_WEIGHTS.personalInfo,
    suggestions: personalScore.suggestions,
  });
  totalScore += personalScore.score;
  issues.push(...personalScore.issues);

  // Check Experience
  const expScore = scoreExperience(resume.experience, jobKeywords);
  sections.push({
    name: 'Work Experience',
    score: expScore.score,
    maxScore: SECTION_WEIGHTS.experience,
    suggestions: expScore.suggestions,
  });
  totalScore += expScore.score;
  issues.push(...expScore.issues);

  // Check Education
  const eduScore = scoreEducation(resume.education);
  sections.push({
    name: 'Education',
    score: eduScore.score,
    maxScore: SECTION_WEIGHTS.education,
    suggestions: eduScore.suggestions,
  });
  totalScore += eduScore.score;

  // Check Skills
  const skillsScore = scoreSkills(resume.skills, jobKeywords);
  sections.push({
    name: 'Skills',
    score: skillsScore.score,
    maxScore: SECTION_WEIGHTS.skills,
    suggestions: skillsScore.suggestions,
  });
  totalScore += skillsScore.score;

  // Check Projects
  const projScore = scoreProjects(resume.projects, jobKeywords);
  sections.push({
    name: 'Projects',
    score: projScore.score,
    maxScore: SECTION_WEIGHTS.projects,
    suggestions: projScore.suggestions,
  });
  totalScore += projScore.score;

  // Find keywords
  const resumeText = getResumeText(resume).toLowerCase();
  const foundKeywords: string[] = [];
  const missingKeywords: string[] = [];

  jobKeywords.forEach(keyword => {
    if (resumeText.includes(keyword)) {
      foundKeywords.push(keyword);
    } else {
      missingKeywords.push(keyword);
    }
  });

  // Add missing important keywords as issues
  if (missingKeywords.length > 0) {
    issues.push(`Consider adding these keywords from the job description: ${missingKeywords.slice(0, 5).join(', ')}`);
  }

  return {
    total: Math.min(100, Math.round(totalScore)),
    sections,
    keywords: {
      found: foundKeywords,
      missing: missingKeywords.slice(0, 10),
    },
    issues: [...new Set(issues)],
  };
}

function extractKeywords(text: string): string[] {
  const words = text.match(/\b[a-z]{3,}\b/g) || [];
  const uniqueWords = [...new Set(words)];
  
  // Filter out common words
  const stopWords = new Set(['the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had', 'her', 'was', 'one', 'our', 'out', 'has', 'have', 'been', 'will', 'would', 'could', 'should', 'with', 'this', 'that', 'from', 'they', 'been', 'were', 'said', 'each', 'which', 'their', 'time', 'very', 'when', 'come', 'made', 'your', 'about', 'more', 'some', 'than', 'into', 'then', 'them', 'these', 'those', 'only', 'also', 'most', 'must', 'made', 'make', 'being', 'after', 'before', 'through', 'where', 'while', 'both', 'what', 'there', 'here']);
  
  return uniqueWords.filter(word => !stopWords.has(word));
}

function scorePersonalInfo(info: PersonalInfo) {
  let score = 0;
  const suggestions: string[] = [];
  const issues: string[] = [];

  if (info.fullName.trim()) score += 3;
  else issues.push('Add your full name');

  if (info.email.trim() && isValidEmail(info.email)) score += 3;
  else suggestions.push('Add a valid email address');

  if (info.phone.trim()) score += 3;
  else suggestions.push('Add your phone number');

  if (info.location.trim()) score += 2;
  else suggestions.push('Add your location');

  if (info.linkedin.trim()) score += 2;
  else suggestions.push('Add your LinkedIn profile');

  if (info.summary.trim() && info.summary.length > 50) score += 2;
  else suggestions.push('Add a professional summary (50+ characters)');

  return { score, suggestions, issues };
}

function scoreExperience(experiences: Experience[], jobKeywords: string[]) {
  let score = 0;
  const suggestions: string[] = [];
  const issues: string[] = [];

  if (experiences.length === 0) {
    issues.push('Add work experience');
    return { score, suggestions, issues };
  }

  score += Math.min(experiences.length * 5, 15);

  experiences.forEach(exp => {
    if (exp.company && exp.position) score += 2;
    
    if (exp.description) {
      const descWords = exp.description.toLowerCase().split(/\s+/);
      const hasActionVerbs = descWords.some(word => 
        COMMON_KEYWORDS.slice(0, 15).includes(word)
      );
      if (hasActionVerbs) score += 2;
      
      const keywordMatches = jobKeywords.filter(kw => 
        exp.description.toLowerCase().includes(kw)
      ).length;
      score += Math.min(keywordMatches, 3);
    } else {
      suggestions.push(`Add description for ${exp.position || 'experience'}`);
    }
  });

  return { score: Math.min(score, 30), suggestions, issues };
}

function scoreEducation(educations: Education[]) {
  let score = 0;
  const suggestions: string[] = [];

  if (educations.length === 0) return { score, suggestions, issues: ['Add education'] };

  educations.forEach(edu => {
    if (edu.institution && edu.degree) score += 5;
    if (edu.field) score += 2;
    if (edu.gpa) score += 1;
  });

  if (educations.length > 0 && !educations[0].gpa) {
    suggestions.push('Consider adding GPA if it\'s strong (3.5+)');
  }

  return { score: Math.min(score, 15), suggestions, issues: [] };
}

function scoreSkills(skills: Skill[], jobKeywords: string[]) {
  let score = 0;
  const suggestions: string[] = [];

  if (skills.length === 0) return { score, suggestions, issues: ['Add skills'] };

  score += Math.min(skills.length * 2, 10);

  const skillNames = skills.map(s => s.name.toLowerCase());
  const matchingKeywords = jobKeywords.filter(kw => 
    skillNames.some(name => name.includes(kw) || kw.includes(name))
  );

  score += Math.min(matchingKeywords.length * 3, 15);

  if (matchingKeywords.length < 3) {
    suggestions.push('Align skills more closely with the job description');
  }

  return { score: Math.min(score, 25), suggestions, issues: [] };
}

function scoreProjects(projects: Project[], jobKeywords: string[]) {
  let score = 0;
  const suggestions: string[] = [];

  if (projects.length === 0) {
    suggestions.push('Add relevant projects to strengthen your resume');
    return { score, suggestions };
  }

  score += Math.min(projects.length * 3, 6);

  projects.forEach(proj => {
    if (proj.name && proj.description) score += 2;
    if (proj.technologies) {
      const techKeywords = proj.technologies.toLowerCase().split(/,\s*/);
      const matches = techKeywords.filter(t => 
        jobKeywords.some(kw => t.includes(kw) || kw.includes(t))
      );
      score += Math.min(matches.length * 2, 4);
    }
  });

  return { score: Math.min(score, 15), suggestions };
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getResumeText(resume: ResumeData): string {
  const parts: string[] = [];
  
  parts.push(resume.personalInfo.fullName);
  parts.push(resume.personalInfo.summary);
  
  resume.experience.forEach(exp => {
    parts.push(exp.position);
    parts.push(exp.company);
    parts.push(exp.description);
  });
  
  resume.education.forEach(edu => {
    parts.push(edu.degree);
    parts.push(edu.field);
    parts.push(edu.institution);
  });
  
  resume.skills.forEach(skill => parts.push(skill.name));
  
  resume.projects.forEach(proj => {
    parts.push(proj.name);
    parts.push(proj.description);
    parts.push(proj.technologies);
  });
  
  return parts.join(' ');
}

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
    },
    experience: [],
    education: [],
    skills: [],
    projects: [],
  };
}
