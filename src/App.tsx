import { useState } from 'react';
import type { ResumeData, ATSScore } from './types';
import { calculateATSScore, getEmptyResume } from './atsChecker';
import { FileText, Briefcase, GraduationCap, Code, FolderGit2, BarChart3, Download, Plus, Trash2, Upload } from 'lucide-react';
import ResumePreview from './components/ResumePreview';

function App() {
  const [resume, setResume] = useState<ResumeData>(getEmptyResume);
  const [atsScore, setAtsScore] = useState<ATSScore | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [activeTab, setActiveTab] = useState<'edit' | 'preview' | 'ats'>('edit');
  const [activeSection, setActiveSection] = useState<'personal' | 'experience' | 'education' | 'skills' | 'projects'>('personal');

  const updatePersonalInfo = (field: keyof ResumeData['personalInfo'], value: string) => {
    setResume(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const addExperience = () => {
    setResume(prev => ({
      ...prev,
      experience: [...prev.experience, {
        id: Date.now().toString(),
        company: '',
        position: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      }]
    }));
  };

  const updateExperience = (id: string, field: string, value: string | boolean) => {
    setResume(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeExperience = (id: string) => {
    setResume(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const addEducation = () => {
    setResume(prev => ({
      ...prev,
      education: [...prev.education, {
        id: Date.now().toString(),
        institution: '',
        degree: '',
        field: '',
        location: '',
        startDate: '',
        endDate: '',
        gpa: ''
      }]
    }));
  };

  const updateEducation = (id: string, field: string, value: string) => {
    setResume(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const removeEducation = (id: string) => {
    setResume(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const addSkill = () => {
    setResume(prev => ({
      ...prev,
      skills: [...prev.skills, {
        id: Date.now().toString(),
        name: '',
        level: 'intermediate'
      }]
    }));
  };

  const updateSkill = (id: string, field: string, value: string) => {
    setResume(prev => ({
      ...prev,
      skills: prev.skills.map(skill => 
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    }));
  };

  const removeSkill = (id: string) => {
    setResume(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id)
    }));
  };

  const addProject = () => {
    setResume(prev => ({
      ...prev,
      projects: [...prev.projects, {
        id: Date.now().toString(),
        name: '',
        description: '',
        technologies: '',
        link: ''
      }]
    }));
  };

  const updateProject = (id: string, field: string, value: string) => {
    setResume(prev => ({
      ...prev,
      projects: prev.projects.map(proj => 
        proj.id === id ? { ...proj, [field]: value } : proj
      )
    }));
  };

  const removeProject = (id: string) => {
    setResume(prev => ({
      ...prev,
      projects: prev.projects.filter(proj => proj.id !== id)
    }));
  };

  const checkATS = () => {
    const score = calculateATSScore(resume, jobDescription);
    setAtsScore(score);
    setActiveTab('ats');
  };

  const exportToJSON = () => {
    const dataStr = JSON.stringify(resume, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const importFromJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result as string);
          setResume(data);
        } catch {
          alert('Invalid JSON file');
        }
      };
      reader.readAsText(file);
    }
  };

  const Input = ({ label, value, onChange, placeholder, type = 'text', className = '' }: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: string;
    className?: string;
  }) => (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      />
    </div>
  );

  const TextArea = ({ label, value, onChange, placeholder, rows = 3 }: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    rows?: number;
  }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Resume Builder</h1>
          <p className="text-purple-200">Build your resume and check ATS compatibility</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 no-print">
          <button
            onClick={() => setActiveTab('edit')}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'edit' 
                ? 'bg-white text-purple-600 shadow-lg' 
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            Edit
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'preview' 
                ? 'bg-white text-purple-600 shadow-lg' 
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            Preview
          </button>
          <button
            onClick={() => setActiveTab('ats')}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'ats' 
                ? 'bg-white text-purple-600 shadow-lg' 
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            ATS Score
          </button>
        </div>

        {/* Edit Tab */}
        {activeTab === 'edit' && (
          <div className="grid md:grid-cols-4 gap-6">
            {/* Section Navigation */}
            <div className="bg-white rounded-xl shadow-xl p-4 h-fit">
              <h3 className="font-semibold text-gray-800 mb-3">Sections</h3>
              <nav className="space-y-1">
                {[
                  { id: 'personal', label: 'Personal Info', icon: FileText },
                  { id: 'experience', label: 'Experience', icon: Briefcase },
                  { id: 'education', label: 'Education', icon: GraduationCap },
                  { id: 'skills', label: 'Skills', icon: Code },
                  { id: 'projects', label: 'Projects', icon: FolderGit2 },
                ].map(section => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id as typeof activeSection)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                      activeSection === section.id
                        ? 'bg-purple-100 text-purple-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <section.icon size={18} />
                    {section.label}
                  </button>
                ))}
              </nav>

              <div className="mt-6 pt-4 border-t border-gray-200 space-y-2">
                <button
                  onClick={exportToJSON}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <Download size={18} />
                  Export JSON
                </button>
                <label className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
                  <Upload size={18} />
                  Import JSON
                  <input type="file" accept=".json" onChange={importFromJSON} className="hidden" />
                </label>
              </div>
            </div>

            {/* Form Area */}
            <div className="md:col-span-3 bg-white rounded-xl shadow-xl p-6">
              {/* Personal Info */}
              {activeSection === 'personal' && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Personal Information</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input label="Full Name" value={resume.personalInfo.fullName} onChange={(v) => updatePersonalInfo('fullName', v)} placeholder="John Doe" />
                    <Input label="Email" type="email" value={resume.personalInfo.email} onChange={(v) => updatePersonalInfo('email', v)} placeholder="john@example.com" />
                    <Input label="Phone" value={resume.personalInfo.phone} onChange={(v) => updatePersonalInfo('phone', v)} placeholder="+1 234 567 8900" />
                    <Input label="Location" value={resume.personalInfo.location} onChange={(v) => updatePersonalInfo('location', v)} placeholder="City, Country" />
                    <Input label="LinkedIn" value={resume.personalInfo.linkedin} onChange={(v) => updatePersonalInfo('linkedin', v)} placeholder="linkedin.com/in/johndoe" />
                    <Input label="Website" value={resume.personalInfo.website} onChange={(v) => updatePersonalInfo('website', v)} placeholder="johndoe.com" />
                  </div>
                  <TextArea label="Professional Summary" value={resume.personalInfo.summary} onChange={(v) => updatePersonalInfo('summary', v)} placeholder="A brief summary of your professional background..." rows={4} />
                </div>
              )}

              {/* Experience */}
              {activeSection === 'experience' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800">Work Experience</h2>
                    <button onClick={addExperience} className="flex items-center gap-1 px-3 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm">
                      <Plus size={16} /> Add
                    </button>
                  </div>
                  {resume.experience.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No experience added yet. Click "Add" to get started.</p>
                  ) : (
                    resume.experience.map((exp, index) => (
                      <div key={exp.id} className="border border-gray-200 rounded-lg p-4 space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-500">Experience #{index + 1}</span>
                          <button onClick={() => removeExperience(exp.id)} className="text-red-500 hover:text-red-700">
                            <Trash2 size={18} />
                          </button>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <Input label="Company" value={exp.company} onChange={(v) => updateExperience(exp.id, 'company', v)} />
                          <Input label="Position" value={exp.position} onChange={(v) => updateExperience(exp.id, 'position', v)} />
                          <Input label="Location" value={exp.location} onChange={(v) => updateExperience(exp.id, 'location', v)} />
                          <div className="flex gap-2">
                            <Input label="Start Date" value={exp.startDate} onChange={(v) => updateExperience(exp.id, 'startDate', v)} placeholder="Jan 2020" className="flex-1" />
                            <Input label="End Date" value={exp.endDate} onChange={(v) => updateExperience(exp.id, 'endDate', v)} placeholder="Present" className="flex-1" />
                          </div>
                        </div>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" checked={exp.current} onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)} className="rounded" />
                          <span className="text-sm text-gray-600">Currently working here</span>
                        </label>
                        <TextArea label="Description" value={exp.description} onChange={(v) => updateExperience(exp.id, 'description', v)} placeholder="Describe your responsibilities and achievements..." rows={4} />
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Education */}
              {activeSection === 'education' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800">Education</h2>
                    <button onClick={addEducation} className="flex items-center gap-1 px-3 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm">
                      <Plus size={16} /> Add
                    </button>
                  </div>
                  {resume.education.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No education added yet. Click "Add" to get started.</p>
                  ) : (
                    resume.education.map((edu, index) => (
                      <div key={edu.id} className="border border-gray-200 rounded-lg p-4 space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-500">Education #{index + 1}</span>
                          <button onClick={() => removeEducation(edu.id)} className="text-red-500 hover:text-red-700">
                            <Trash2 size={18} />
                          </button>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <Input label="Institution" value={edu.institution} onChange={(v) => updateEducation(edu.id, 'institution', v)} />
                          <Input label="Degree" value={edu.degree} onChange={(v) => updateEducation(edu.id, 'degree', v)} placeholder="Bachelor's, Master's, etc." />
                          <Input label="Field of Study" value={edu.field} onChange={(v) => updateEducation(edu.id, 'field', v)} placeholder="Computer Science" />
                          <Input label="Location" value={edu.location} onChange={(v) => updateEducation(edu.id, 'location', v)} />
                          <div className="flex gap-2">
                            <Input label="Start Date" value={edu.startDate} onChange={(v) => updateEducation(edu.id, 'startDate', v)} placeholder="Aug 2016" className="flex-1" />
                            <Input label="End Date" value={edu.endDate} onChange={(v) => updateEducation(edu.id, 'endDate', v)} placeholder="May 2020" className="flex-1" />
                          </div>
                          <Input label="GPA" value={edu.gpa} onChange={(v) => updateEducation(edu.id, 'gpa', v)} placeholder="3.8/4.0" />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Skills */}
              {activeSection === 'skills' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800">Skills</h2>
                    <button onClick={addSkill} className="flex items-center gap-1 px-3 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm">
                      <Plus size={16} /> Add
                    </button>
                  </div>
                  {resume.skills.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No skills added yet. Click "Add" to get started.</p>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-4">
                      {resume.skills.map((skill, index) => (
                        <div key={skill.id} className="flex items-end gap-2">
                          <div className="flex-1">
                            <Input label={`Skill #${index + 1}`} value={skill.name} onChange={(v) => updateSkill(skill.id, 'name', v)} placeholder="JavaScript, Python, etc." />
                          </div>
                          <select
                            value={skill.level}
                            onChange={(e) => updateSkill(skill.id, 'level', e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 mb-0.5"
                          >
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                            <option value="expert">Expert</option>
                          </select>
                          <button onClick={() => removeSkill(skill.id)} className="text-red-500 hover:text-red-700 pb-2">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Projects */}
              {activeSection === 'projects' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800">Projects</h2>
                    <button onClick={addProject} className="flex items-center gap-1 px-3 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm">
                      <Plus size={16} /> Add
                    </button>
                  </div>
                  {resume.projects.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No projects added yet. Click "Add" to get started.</p>
                  ) : (
                    resume.projects.map((proj, index) => (
                      <div key={proj.id} className="border border-gray-200 rounded-lg p-4 space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-500">Project #{index + 1}</span>
                          <button onClick={() => removeProject(proj.id)} className="text-red-500 hover:text-red-700">
                            <Trash2 size={18} />
                          </button>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <Input label="Project Name" value={proj.name} onChange={(v) => updateProject(proj.id, 'name', v)} />
                          <Input label="Link" value={proj.link} onChange={(v) => updateProject(proj.id, 'link', v)} placeholder="https://github.com/..." />
                        </div>
                        <Input label="Technologies" value={proj.technologies} onChange={(v) => updateProject(proj.id, 'technologies', v)} placeholder="React, Node.js, MongoDB" />
                        <TextArea label="Description" value={proj.description} onChange={(v) => updateProject(proj.id, 'description', v)} placeholder="Describe what the project does and your role..." rows={3} />
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Preview Tab */}
        {activeTab === 'preview' && (
          <ResumePreview resume={resume} />
        )}

        {/* ATS Tab */}
        {activeTab === 'ats' && (
          <div className="space-y-6">
            {/* Job Description Input */}
            <div className="bg-white rounded-xl shadow-xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Job Description</h2>
              <p className="text-gray-600 text-sm mb-3">Paste the job description to check ATS compatibility</p>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here..."
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              />
              <button
                onClick={checkATS}
                className="mt-4 flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <BarChart3 size={18} />
                Check ATS Score
              </button>
            </div>

            {/* ATS Results */}
            {atsScore && (
              <div className="bg-white rounded-xl shadow-xl p-6">
                {/* Overall Score */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 mb-4">
                    <span className="text-4xl font-bold text-white">{atsScore.total}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">ATS Score</h3>
                  <p className="text-gray-500">
                    {atsScore.total >= 80 ? 'Excellent!' : atsScore.total >= 60 ? 'Good, but can improve' : 'Needs work'}
                  </p>
                </div>

                {/* Section Scores */}
                <div className="space-y-4 mb-8">
                  <h4 className="font-semibold text-gray-800">Section Scores</h4>
                  {atsScore.sections.map(section => (
                    <div key={section.name}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-700">{section.name}</span>
                        <span className="text-sm font-medium text-gray-500">{section.score}/{section.maxScore}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            section.score / section.maxScore >= 0.8 ? 'bg-green-500' :
                            section.score / section.maxScore >= 0.5 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${(section.score / section.maxScore) * 100}%` }}
                        />
                      </div>
                      {section.suggestions.length > 0 && (
                        <ul className="mt-2 text-sm text-gray-600 space-y-1">
                          {section.suggestions.map((suggestion, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-yellow-500">•</span>
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>

                {/* Keywords */}
                {atsScore.keywords.found.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-2">Keywords Found</h4>
                    <div className="flex flex-wrap gap-2">
                      {atsScore.keywords.found.slice(0, 15).map(keyword => (
                        <span key={keyword} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {atsScore.keywords.missing.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-2">Missing Keywords</h4>
                    <div className="flex flex-wrap gap-2">
                      {atsScore.keywords.missing.map(keyword => (
                        <span key={keyword} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Issues */}
                {atsScore.issues.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Issues to Address</h4>
                    <ul className="space-y-2">
                      {atsScore.issues.map((issue, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-700">
                          <span className="text-red-500 mt-1">⚠</span>
                          {issue}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
