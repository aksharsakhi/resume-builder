import type { ResumeData, ResumeSettings } from '../../types';

interface Props { resume: ResumeData; settings: ResumeSettings; }

const colorMap: Record<string, string> = {
  blue: '#3b82f6', green: '#10b981', purple: '#8b5cf6', red: '#ef4444', orange: '#f97316', teal: '#14b8a6', gray: '#6b7280',
};

const ElegantTemplate = ({ resume, settings }: Props) => {
  const { personalInfo, experience, education, skills, projects } = resume;
  const primaryColor = colorMap[settings.colorTheme];

  return (
    <div className="resume-template p-10" style={{ fontFamily: "'Lora', serif" }}>
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-normal text-gray-900 tracking-wide">{personalInfo.fullName || 'Your Name'}</h1>
        <div className="flex justify-center items-center gap-2 mt-3">
          <div className="h-px w-16" style={{ backgroundColor: primaryColor }} />
          <span className="text-sm text-gray-500">✦</span>
          <div className="h-px w-16" style={{ backgroundColor: primaryColor }} />
        </div>
        <div className="flex justify-center gap-6 mt-4 text-sm text-gray-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </header>

      {personalInfo.summary && (
        <section className="mb-8 text-center">
          <p className="text-gray-600 italic leading-relaxed max-w-2xl mx-auto">"{personalInfo.summary}"</p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-center text-sm font-medium uppercase tracking-widest mb-6" style={{ color: primaryColor }}>Experience</h2>
          {experience.map(exp => (
            <div key={exp.id} className="mb-5 text-center">
              <h3 className="font-semibold text-gray-900">{exp.position}</h3>
              <p className="text-gray-500 text-sm">{exp.company} • {exp.location}</p>
              <p className="text-xs text-gray-400 mt-1">{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</p>
              {exp.description && <p className="text-gray-600 text-sm mt-2 leading-relaxed">{exp.description}</p>}
            </div>
          ))}
        </section>
      )}

      <div className="grid grid-cols-2 gap-8">
        {education.length > 0 && (
          <section>
            <h2 className="text-center text-sm font-medium uppercase tracking-widest mb-4" style={{ color: primaryColor }}>Education</h2>
            {education.map(edu => (
              <div key={edu.id} className="text-center mb-3">
                <h3 className="font-medium text-gray-900">{edu.degree}</h3>
                <p className="text-gray-500 text-sm">{edu.institution}</p>
              </div>
            ))}
          </section>
        )}

        {skills.length > 0 && (
          <section>
            <h2 className="text-center text-sm font-medium uppercase tracking-widest mb-4" style={{ color: primaryColor }}>Skills</h2>
            <p className="text-center text-gray-600 text-sm leading-relaxed">{skills.map(s => s.name).join(' • ')}</p>
          </section>
        )}
      </div>

      {projects.length > 0 && (
        <section className="mt-8">
          <h2 className="text-center text-sm font-medium uppercase tracking-widest mb-4" style={{ color: primaryColor }}>Notable Projects</h2>
          {projects.map(proj => (
            <div key={proj.id} className="text-center mb-3">
              <h3 className="font-medium text-gray-900">{proj.name}</h3>
              {proj.technologies && <p className="text-xs text-gray-400">{proj.technologies}</p>}
              {proj.description && <p className="text-gray-600 text-sm mt-1">{proj.description}</p>}
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default ElegantTemplate;
