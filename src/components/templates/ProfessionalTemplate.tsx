import type { ResumeData, ResumeSettings } from '../../types';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface Props {
  resume: ResumeData;
  settings: ResumeSettings;
}

const colorMap: Record<string, string> = {
  blue: '#2563eb',
  green: '#059669',
  purple: '#7c3aed',
  red: '#dc2626',
  orange: '#ea580c',
  teal: '#0d9488',
  gray: '#374151',
};

const fontMap: Record<string, string> = {
  inter: "'Inter', sans-serif",
  roboto: "'Roboto', sans-serif",
  lato: "'Lato', sans-serif",
  opensans: "'Open Sans', sans-serif",
  merriweather: "'Merriweather', serif",
  playfair: "'Playfair Display', serif",
};

const sizeMap: Record<string, string> = {
  small: '14px',
  medium: '16px',
  large: '18px',
};

const ProfessionalTemplate = ({ resume, settings }: Props) => {
  const { personalInfo, experience, education, skills, projects, certifications } = resume;
  const primaryColor = colorMap[settings.colorTheme];
  const fontFamily = fontMap[settings.fontFamily];
  const fontSize = sizeMap[settings.fontSize];

  return (
    <div className="resume-template p-8" style={{ fontFamily, fontSize }}>
      {/* Header */}
      <header className="text-center border-b-2 pb-4 mb-6" style={{ borderColor: primaryColor }}>
        <h1 className="text-3xl font-bold text-gray-900">{personalInfo.fullName || 'Your Name'}</h1>
        <div className="flex flex-wrap justify-center gap-4 mt-3 text-sm text-gray-600">
          {personalInfo.email && <span className="flex items-center gap-1"><Mail size={14} />{personalInfo.email}</span>}
          {personalInfo.phone && <span className="flex items-center gap-1"><Phone size={14} />{personalInfo.phone}</span>}
          {personalInfo.location && <span className="flex items-center gap-1"><MapPin size={14} />{personalInfo.location}</span>}
        </div>
        {settings.showLinks && (
          <div className="flex flex-wrap justify-center gap-4 mt-2 text-sm">
            {personalInfo.linkedin && <a href={personalInfo.linkedin} className="flex items-center gap-1" style={{ color: primaryColor }}><Linkedin size={14} />LinkedIn</a>}
            {personalInfo.website && <a href={personalInfo.website} className="flex items-center gap-1" style={{ color: primaryColor }}><Globe size={14} />Portfolio</a>}
          </div>
        )}
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-2" style={{ color: primaryColor }}>Professional Summary</h2>
          <p className="text-gray-700 text-sm leading-relaxed">{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-3 border-b" style={{ color: primaryColor, borderColor: primaryColor }}>Work Experience</h2>
          {experience.map(exp => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                  <p style={{ color: primaryColor }}>{exp.company}{exp.location && `, ${exp.location}`}</p>
                </div>
                <span className="text-sm text-gray-500">{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              {exp.description && <p className="text-gray-700 text-sm mt-2 whitespace-pre-line">{exp.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-3 border-b" style={{ color: primaryColor, borderColor: primaryColor }}>Education</h2>
          {education.map(edu => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{edu.degree}{edu.field && ` in ${edu.field}`}</h3>
                  <p style={{ color: primaryColor }}>{edu.institution}</p>
                </div>
                <span className="text-sm text-gray-500">{edu.startDate} — {edu.endDate}</span>
              </div>
              {edu.gpa && <p className="text-sm text-gray-600 mt-1">GPA: {edu.gpa}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-3 border-b" style={{ color: primaryColor, borderColor: primaryColor }}>Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map(skill => (
              <span key={skill.id} className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}>
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-3 border-b" style={{ color: primaryColor, borderColor: primaryColor }}>Projects</h2>
          {projects.map(proj => (
            <div key={proj.id} className="mb-3">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-gray-900">{proj.name}</h3>
                {proj.link && <a href={proj.link} className="text-sm" style={{ color: primaryColor }}>View →</a>}
              </div>
              {proj.technologies && <p className="text-sm text-gray-500">Technologies: {proj.technologies}</p>}
              {proj.description && <p className="text-gray-700 text-sm mt-1">{proj.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section>
          <h2 className="text-lg font-bold mb-3 border-b" style={{ color: primaryColor, borderColor: primaryColor }}>Certifications</h2>
          {certifications.map(cert => (
            <div key={cert.id} className="flex justify-between items-center mb-2">
              <div>
                <span className="font-medium text-gray-900">{cert.name}</span>
                <span className="text-gray-500"> - {cert.issuer}</span>
              </div>
              {cert.date && <span className="text-sm text-gray-500">{cert.date}</span>}
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default ProfessionalTemplate;
