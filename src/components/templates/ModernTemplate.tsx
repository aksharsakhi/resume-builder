import type { ResumeData, ResumeSettings } from '../../types';

interface Props {
  resume: ResumeData;
  settings: ResumeSettings;
}

const colorMap: Record<string, string> = {
  blue: '#2563eb', green: '#059669', purple: '#7c3aed', red: '#dc2626', orange: '#ea580c', teal: '#0d9488', gray: '#374151',
};

const ModernTemplate = ({ resume, settings }: Props) => {
  const { personalInfo, experience, education, skills, projects } = resume;
  const primaryColor = colorMap[settings.colorTheme];

  return (
    <div className="resume-template" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Header with gradient */}
      <div className="p-8 text-white" style={{ background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}dd)` }}>
        <h1 className="text-4xl font-bold">{personalInfo.fullName || 'Your Name'}</h1>
        <p className="text-white/80 mt-1">{personalInfo.summary?.slice(0, 100) || 'Professional Summary'}</p>
        <div className="flex flex-wrap gap-4 mt-4 text-sm text-white/90">
          {personalInfo.email && <span>✉ {personalInfo.email}</span>}
          {personalInfo.phone && <span>📱 {personalInfo.phone}</span>}
          {personalInfo.location && <span>📍 {personalInfo.location}</span>}
        </div>
      </div>

      <div className="p-8">
        {/* Two Column Layout */}
        <div className="grid grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="col-span-2 space-y-6">
            {experience.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-1 rounded" style={{ backgroundColor: primaryColor }} />
                  Experience
                </h2>
                {experience.map(exp => (
                  <div key={exp.id} className="mb-4 border-l-2 pl-4" style={{ borderColor: primaryColor }}>
                    <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                    <p className="text-sm" style={{ color: primaryColor }}>{exp.company}</p>
                    <p className="text-xs text-gray-400">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                    {exp.description && <p className="text-gray-600 text-sm mt-2">{exp.description}</p>}
                  </div>
                ))}
              </section>
            )}

            {projects.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-1 rounded" style={{ backgroundColor: primaryColor }} />
                  Projects
                </h2>
                {projects.map(proj => (
                  <div key={proj.id} className="mb-3">
                    <h3 className="font-semibold text-gray-900">{proj.name}</h3>
                    {proj.technologies && <p className="text-xs text-gray-500">{proj.technologies}</p>}
                    {proj.description && <p className="text-gray-600 text-sm mt-1">{proj.description}</p>}
                  </div>
                ))}
              </section>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {education.length > 0 && (
              <section>
                <h2 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Education</h2>
                {education.map(edu => (
                  <div key={edu.id} className="mb-3 p-3 rounded-lg" style={{ backgroundColor: `${primaryColor}10` }}>
                    <h3 className="font-medium text-gray-900 text-sm">{edu.degree}</h3>
                    <p className="text-xs text-gray-600">{edu.institution}</p>
                  </div>
                ))}
              </section>
            )}

            {skills.length > 0 && (
              <section>
                <h2 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Skills</h2>
                <div className="flex flex-wrap gap-1">
                  {skills.map(skill => (
                    <span key={skill.id} className="px-2 py-1 text-xs rounded" style={{ backgroundColor: primaryColor, color: 'white' }}>
                      {skill.name}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;
