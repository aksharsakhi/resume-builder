import type { ResumeData } from '../types';
import { Mail, Phone, MapPin, Linkedin, Globe, Printer } from 'lucide-react';

interface Props {
  resume: ResumeData;
}

const ResumePreview = ({ resume }: Props) => {
  const handlePrint = () => {
    window.print();
  };

  const { personalInfo, experience, education, skills, projects } = resume;

  return (
    <div>
      {/* Print Button */}
      <div className="flex justify-end mb-4 no-print">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-purple-50 transition-colors shadow"
        >
          <Printer size={18} />
          Print / Save PDF
        </button>
      </div>

      {/* Resume Document */}
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-4xl mx-auto print:shadow-none print:p-0">
        {/* Header */}
        <header className="text-center border-b-2 border-gray-200 pb-4 mb-6">
          <h1 className="text-3xl font-bold text-gray-900">{personalInfo.fullName || 'Your Name'}</h1>
          
          <div className="flex flex-wrap justify-center gap-4 mt-3 text-sm text-gray-600">
            {personalInfo.email && (
              <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1 hover:text-purple-600">
                <Mail size={14} />
                {personalInfo.email}
              </a>
            )}
            {personalInfo.phone && (
              <span className="flex items-center gap-1">
                <Phone size={14} />
                {personalInfo.phone}
              </span>
            )}
            {personalInfo.location && (
              <span className="flex items-center gap-1">
                <MapPin size={14} />
                {personalInfo.location}
              </span>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-2 text-sm text-gray-600">
            {personalInfo.linkedin && (
              <a href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-purple-600">
                <Linkedin size={14} />
                LinkedIn
              </a>
            )}
            {personalInfo.website && (
              <a href={personalInfo.website.startsWith('http') ? personalInfo.website : `https://${personalInfo.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-purple-600">
                <Globe size={14} />
                Portfolio
              </a>
            )}
          </div>
        </header>

        {/* Summary */}
        {personalInfo.summary && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-gray-800 border-b border-gray-300 pb-1 mb-3">
              Professional Summary
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">{personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-gray-800 border-b border-gray-300 pb-1 mb-3">
              Work Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{exp.position || 'Position'}</h3>
                      <p className="text-purple-600">{exp.company || 'Company'}{exp.location && `, ${exp.location}`}</p>
                    </div>
                    <span className="text-sm text-gray-500 whitespace-nowrap">
                      {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-gray-700 text-sm mt-2 whitespace-pre-line">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-gray-800 border-b border-gray-300 pb-1 mb-3">
              Education
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{edu.degree || 'Degree'}{edu.field && ` in ${edu.field}`}</h3>
                      <p className="text-purple-600">{edu.institution || 'Institution'}{edu.location && `, ${edu.location}`}</p>
                    </div>
                    <span className="text-sm text-gray-500 whitespace-nowrap">
                      {edu.startDate} — {edu.endDate}
                    </span>
                  </div>
                  {edu.gpa && <p className="text-sm text-gray-600 mt-1">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-gray-800 border-b border-gray-300 pb-1 mb-3">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {skill.name}
                  {skill.level === 'expert' && ' ★'}
                  {skill.level === 'advanced' && ' •'}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-gray-800 border-b border-gray-300 pb-1 mb-3">
              Projects
            </h2>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-gray-900">{proj.name || 'Project Name'}</h3>
                    {proj.link && (
                      <a
                        href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-purple-600 hover:underline"
                      >
                        View Project
                      </a>
                    )}
                  </div>
                  {proj.technologies && (
                    <p className="text-sm text-gray-500 mt-1">Technologies: {proj.technologies}</p>
                  )}
                  {proj.description && (
                    <p className="text-gray-700 text-sm mt-1">{proj.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;
