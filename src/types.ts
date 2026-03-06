export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
  summary: string;
  photo: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  highlights: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa: string;
  highlights: string[];
}

export interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string;
  link: string;
  highlights: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link: string;
}

export interface Language {
  id: string;
  name: string;
  level: 'basic' | 'conversational' | 'fluent' | 'native';
}

export interface Award {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  awards: Award[];
}

export interface ATSScore {
  total: number;
  sections: {
    name: string;
    score: number;
    maxScore: number;
    suggestions: string[];
  }[];
  keywords: {
    found: string[];
    missing: string[];
  };
  issues: string[];
}

export type TemplateId = 'professional' | 'modern' | 'creative' | 'minimal' | 'executive' | 'elegant';
export type ColorTheme = 'blue' | 'green' | 'purple' | 'red' | 'orange' | 'teal' | 'gray';
export type FontFamily = 'inter' | 'roboto' | 'lato' | 'opensans' | 'merriweather' | 'playfair';

export interface ResumeSettings {
  template: TemplateId;
  colorTheme: ColorTheme;
  fontFamily: FontFamily;
  fontSize: 'small' | 'medium' | 'large';
  showPhoto: boolean;
  showLinks: boolean;
}

export const COLOR_THEMES: Record<ColorTheme, { primary: string; secondary: string; accent: string }> = {
  blue: { primary: '#2563eb', secondary: '#1e40af', accent: '#3b82f6' },
  green: { primary: '#059669', secondary: '#047857', accent: '#10b981' },
  purple: { primary: '#7c3aed', secondary: '#6d28d9', accent: '#8b5cf6' },
  red: { primary: '#dc2626', secondary: '#b91c1c', accent: '#ef4444' },
  orange: { primary: '#ea580c', secondary: '#c2410c', accent: '#f97316' },
  teal: { primary: '#0d9488', secondary: '#0f766e', accent: '#14b8a6' },
  gray: { primary: '#374151', secondary: '#1f2937', accent: '#6b7280' },
};

export const FONT_FAMILIES: Record<FontFamily, { name: string; import: string }> = {
  inter: { name: 'Inter', import: 'Inter' },
  roboto: { name: 'Roboto', import: 'Roboto' },
  lato: { name: 'Lato', import: 'Lato' },
  opensans: { name: 'Open Sans', import: 'Open Sans' },
  merriweather: { name: 'Merriweather', import: 'Merriweather' },
  playfair: { name: 'Playfair Display', import: 'Playfair Display' },
};
