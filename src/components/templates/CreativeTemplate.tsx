import type { ResumeData, ResumeSettings } from '../../types';

interface Props { resume: ResumeData; settings: ResumeSettings; }

const colorMap: Record<string, string> = {
  blue: '#2563eb', green: '#059669', purple: '#7c3aed', red: '#dc2626', orange: '#ea580c', teal: '#0d9488', gray: '#374151',
};

const CreativeTemplate = ({ resume, settings }: Props) => {
  const { personalInfo, experience, education, skills, projects } = resume;
  const primaryColor = colorMap[settings.colorTheme];

  return (
    <div className="resume-template" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <div className="grid grid-cols-3 min-h-[800px]">
        {/* Sidebar */}
        <div className="p-6 text-white" style={{ backgroundColor: primaryColor }}>
          <div className="mb-8">
            {personalInfo.photo ? (
              <img src={personalInfo.photo} className="w-24 h-24 rounded-full mx-auto border-4 border-white/30 object-cover" alt="Profile" />
            ) : (
              <div className="w-24 h-24 rounded-full mx-auto border-4 border-white/30 flex items-center justify-center text-3xl">👤</div>
            )}
          </div>
          
          <h1 className="text-2xl font-bold text-center">{personalInfo.fullName || 'Your Name'}</h1>
          <p className="text-white/70 text-center text-sm mt-1">{personalInfo.email}</p>

          {skills.length > 0 && (
            <section className="mt-8">
              <h2 className="text-sm font-bold uppercase tracking-wider border-b border-white/30 pb-2 mb-3">Skills</h2>
              <div className="space-y-2">
                {skills.map(skill => (
                  <div key={skill.id} className="flex items-center justify-between text-sm">
                    <span>{skill.name}</span>
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(i => (
                        <div key={i} className={`w-2 h-2 rounded-full ${i <= (skill.level === 'expert' ? 5 : skill.level === 'advanced' ? 4 : skill.level === 'intermediate' ? 3 : 2) ? 'bg-white' : 'bg-white/30'}`} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section className="mt-8">
              <h2 className="text-sm font-bold uppercase tracking-wider border-b border-white/30 pb-2 mb-3">Education</h2>
              {education.map(edu => (
                <div key={edu.id} className="mb-3 text-sm">
                  <p className="font-medium">{edu.degree}</p>
                  <p className="text-white/70 text-xs">{edu.institution}</p>
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Main Content */}
        <div className="col-span-2 p-8">
          {personalInfo.summary && (
            <section className="mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-3">About Me</h2>
              <p className="text-gray-600 text-sm leading-relaxed">{personalInfo.summary}</p>
            </section>
          )}

          {experience.length > 0 && (
            <section className="mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Experience</h2>
              {experience.map(exp => (
                <div key={exp.id} className="relative pl-6 pb-6 border-l-2 last:border-l-transparent" style={{ borderColor: primaryColor }}>
                  <div className="absolute w-3 h-3 rounded-full -left-[7px] top-0" style={{ backgroundColor: primaryColor }} />
                  <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                  <p className="text-sm" style={{ color: primaryColor }}>{exp.company}</p>
                  <p className="text-xs text-gray-400 mt-1">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                  {exp.description && <p className="text-gray-600 text-sm mt-2">{exp.description}</p>}
                </div>
              ))}
            </section>
          )}

          {projects.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-4">Projects</h2>
              <div className="grid gap-3">
                {projects.map(proj => (
                  <div key={proj.id} className="p-4 rounded-lg border" style={{ borderColor: `${primaryColor}30` }}>
                    <h3 className="font-semibold text-gray-900">{proj.name}</h3>
                    {proj.technologies && <p className="text-xs text-gray-500 mt-1">{proj.technologies}</p>}
                    {proj.description && <p className="text-gray-600 text-sm mt-2">{proj.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreativeTemplate;
