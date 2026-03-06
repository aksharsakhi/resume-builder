import type { ResumeData, ResumeSettings } from '../../types';

interface Props { resume: ResumeData; settings: ResumeSettings; }

const MinimalTemplate = ({ resume }: Props) => {
  const { personalInfo, experience, education, skills, projects } = resume;

  return (
    <div className="resume-template p-12 max-w-2xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-light text-gray-900 tracking-tight">{personalInfo.fullName || 'Your Name'}</h1>
        <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
        </div>
      </header>

      {personalInfo.summary && (
        <section className="mb-6">
          <p className="text-gray-600 leading-relaxed">{personalInfo.summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Experience</h2>
          {experience.map(exp => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between">
                <h3 className="font-medium text-gray-900">{exp.position}</h3>
                <span className="text-xs text-gray-400">{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              <p className="text-gray-500 text-sm">{exp.company}</p>
              {exp.description && <p className="text-gray-600 text-sm mt-1">{exp.description}</p>}
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Education</h2>
          {education.map(edu => (
            <div key={edu.id} className="mb-2">
              <div className="flex justify-between">
                <h3 className="font-medium text-gray-900">{edu.degree}{edu.field && ` in ${edu.field}`}</h3>
                <span className="text-xs text-gray-400">{edu.endDate}</span>
              </div>
              <p className="text-gray-500 text-sm">{edu.institution}</p>
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Skills</h2>
          <p className="text-gray-600 text-sm">{skills.map(s => s.name).join(' • ')}</p>
        </section>
      )}

      {projects.length > 0 && (
        <section>
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Projects</h2>
          {projects.map(proj => (
            <div key={proj.id} className="mb-3">
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

export default MinimalTemplate;
