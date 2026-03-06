import type { ResumeData, ResumeSettings } from '../../types';

interface Props { resume: ResumeData; settings: ResumeSettings; }

const colorMap: Record<string, string> = {
  blue: '#1e3a5f', green: '#1a3d2e', purple: '#2d1f47', red: '#5f1e1e', orange: '#5f3a1e', teal: '#1a3d3d', gray: '#2d2d2d',
};

const ExecutiveTemplate = ({ resume, settings }: Props) => {
  const { personalInfo, experience, education, skills } = resume;
  const primaryColor = colorMap[settings.colorTheme];

  return (
    <div className="resume-template" style={{ fontFamily: "'Playfair Display', serif" }}>
      {/* Header */}
      <div className="p-10 text-center border-b-4" style={{ borderColor: primaryColor }}>
        <h1 className="text-5xl font-bold tracking-wide" style={{ color: primaryColor }}>{personalInfo.fullName || 'YOUR NAME'}</h1>
        <p className="text-gray-500 mt-2 tracking-widest uppercase text-sm">Executive Professional</p>
        <div className="flex justify-center gap-6 mt-4 text-sm text-gray-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>| {personalInfo.phone}</span>}
          {personalInfo.location && <span>| {personalInfo.location}</span>}
        </div>
      </div>

      <div className="p-10">
        {personalInfo.summary && (
          <section className="mb-8">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: primaryColor }}>Executive Summary</h2>
            <p className="text-gray-700 leading-relaxed italic text-lg">{personalInfo.summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-4 pb-2 border-b" style={{ color: primaryColor, borderColor: primaryColor }}>Professional Experience</h2>
            {experience.map(exp => (
              <div key={exp.id} className="mb-6">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-xl font-semibold text-gray-900">{exp.position}</h3>
                  <span className="text-sm text-gray-500">{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <p className="text-lg text-gray-600">{exp.company}</p>
                {exp.description && <p className="text-gray-700 mt-2 leading-relaxed">{exp.description}</p>}
              </div>
            ))}
          </section>
        )}

        <div className="grid grid-cols-2 gap-8">
          {education.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: primaryColor }}>Education</h2>
              {education.map(edu => (
                <div key={edu.id} className="mb-3">
                  <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                  <p className="text-gray-600">{edu.institution}</p>
                </div>
              ))}
            </section>
          )}

          {skills.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: primaryColor }}>Core Competencies</h2>
              <div className="grid grid-cols-2 gap-2">
                {skills.map(skill => (
                  <span key={skill.id} className="text-gray-700 text-sm">• {skill.name}</span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExecutiveTemplate;
