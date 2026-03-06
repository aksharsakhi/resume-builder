import { useState, useEffect } from 'react';
import type { ResumeData, ResumeSettings, ColorTheme, FontFamily } from './types';
import { getEmptyResume } from './atsChecker';
import ResumePreview from './components/ResumePreview';
import TemplateSelector from './components/TemplateSelector';
import PersonalInfoForm from './components/PersonalInfoForm';
import ExperienceForm from './components/ExperienceForm';
import EducationForm from './components/EducationForm';
import SkillsForm from './components/SkillsForm';
import ProjectsForm from './components/ProjectsForm';
import CertificationsForm from './components/CertificationsForm';
import ATSChecker from './components/ATSChecker';
import ExportButtons from './components/ExportButtons';
import { 
  FileText, Palette, Type, User, Briefcase, GraduationCap, 
  Code, FolderKanban, Award, CheckCircle, Settings, Eye,
  Menu, X, ChevronRight, Sparkles
} from 'lucide-react';

const STORAGE_KEY = 'resume-builder-data';
const SETTINGS_KEY = 'resume-builder-settings';

const defaultSettings: ResumeSettings = {
  template: 'professional',
  colorTheme: 'blue',
  fontFamily: 'inter',
  fontSize: 'medium',
  showPhoto: true,
  showLinks: true,
};

function App() {
  const [resume, setResume] = useState<ResumeData>(getEmptyResume);
  const [settings, setSettings] = useState<ResumeSettings>(defaultSettings);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview' | 'ats' | 'settings'>('edit');
  const [activeSection, setActiveSection] = useState<string>('personal');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    const savedSettings = localStorage.getItem(SETTINGS_KEY);
    
    if (savedData) {
      try {
        setResume(JSON.parse(savedData));
      } catch (e) {
        console.error('Failed to load saved resume');
      }
    }
    
    if (savedSettings) {
      try {
        setSettings({ ...defaultSettings, ...JSON.parse(savedSettings) });
      } catch (e) {
        console.error('Failed to load settings');
      }
    }
  }, []);

  // Auto-save
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resume));
  }, [resume]);

  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }, [settings]);

  const sections = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'certifications', label: 'Certifications', icon: Award },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'personal':
        return <PersonalInfoForm data={resume.personalInfo} onChange={(data) => setResume({ ...resume, personalInfo: data })} />;
      case 'experience':
        return <ExperienceForm data={resume.experience} onChange={(data) => setResume({ ...resume, experience: data })} />;
      case 'education':
        return <EducationForm data={resume.education} onChange={(data) => setResume({ ...resume, education: data })} />;
      case 'skills':
        return <SkillsForm data={resume.skills} onChange={(data) => setResume({ ...resume, skills: data })} />;
      case 'projects':
        return <ProjectsForm data={resume.projects} onChange={(data) => setResume({ ...resume, projects: data })} />;
      case 'certifications':
        return <CertificationsForm data={resume.certifications} onChange={(data) => setResume({ ...resume, certifications: data })} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-[1800px] mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-white/10 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
            </button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">Astra Resume</h1>
                <p className="text-xs text-gray-400">ATS-Ready • Professional Templates</p>
              </div>
            </div>
          </div>

          {/* Tab Buttons */}
          <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-xl p-1">
            {[
              { id: 'edit', label: 'Edit', icon: FileText },
              { id: 'preview', label: 'Preview', icon: Eye },
              { id: 'ats', label: 'ATS Score', icon: CheckCircle },
              { id: 'settings', label: 'Settings', icon: Settings },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-gray-900'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Export Buttons */}
          <ExportButtons resume={resume} settings={settings} />
        </div>

        {/* Mobile Tab Buttons */}
        <div className="md:hidden flex items-center gap-1 px-4 pb-3 overflow-x-auto">
          {[
            { id: 'edit', label: 'Edit', icon: FileText },
            { id: 'preview', label: 'Preview', icon: Eye },
            { id: 'ats', label: 'ATS', icon: CheckCircle },
            { id: 'settings', label: 'Settings', icon: Settings },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-gray-900'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <tab.icon className="w-3 h-3" />
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      <div className="max-w-[1800px] mx-auto flex">
        {/* Sidebar */}
        <aside
          className={`${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 fixed lg:sticky top-[73px] lg:top-0 left-0 h-[calc(100vh-73px)] w-64 bg-black/20 backdrop-blur-xl border-r border-white/10 transition-transform z-40`}
        >
          <div className="p-4">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Sections</h2>
            <nav className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => {
                    setActiveSection(section.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                    activeSection === section.id
                      ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-purple-500/30'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <section.icon className="w-4 h-4" />
                  {section.label}
                  <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6 min-h-[calc(100vh-73px)]">
          {activeTab === 'edit' && (
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
              {renderSection()}
            </div>
          )}

          {activeTab === 'preview' && (
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
              <TemplateSelector
                currentTemplate={settings.template}
                onSelect={(template) => setSettings({ ...settings, template })}
              />
              <div className="mt-6">
                <ResumePreview resume={resume} settings={settings} />
              </div>
            </div>
          )}

          {activeTab === 'ats' && (
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
              <ATSChecker resume={resume} />
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
              <h2 className="text-xl font-bold text-white mb-6">Resume Settings</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Color Theme */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    <Palette className="w-4 h-4 inline mr-2" />
                    Color Theme
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {(['blue', 'green', 'purple', 'red', 'orange', 'teal', 'gray'] as ColorTheme[]).map((color) => (
                      <button
                        key={color}
                        onClick={() => setSettings({ ...settings, colorTheme: color })}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                          settings.colorTheme === color ? 'border-white scale-110' : 'border-transparent'
                        }`}
                        style={{ backgroundColor: color === 'gray' ? '#374151' : color === 'red' ? '#dc2626' : color === 'orange' ? '#ea580c' : color === 'teal' ? '#0d9488' : color === 'green' ? '#059669' : color === 'purple' ? '#7c3aed' : '#2563eb' }}
                      />
                    ))}
                  </div>
                </div>

                {/* Font Family */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    <Type className="w-4 h-4 inline mr-2" />
                    Font Family
                  </label>
                  <select
                    value={settings.fontFamily}
                    onChange={(e) => setSettings({ ...settings, fontFamily: e.target.value as FontFamily })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="inter">Inter</option>
                    <option value="roboto">Roboto</option>
                    <option value="lato">Lato</option>
                    <option value="opensans">Open Sans</option>
                    <option value="merriweather">Merriweather</option>
                    <option value="playfair">Playfair Display</option>
                  </select>
                </div>

                {/* Font Size */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Font Size</label>
                  <select
                    value={settings.fontSize}
                    onChange={(e) => setSettings({ ...settings, fontSize: e.target.value as 'small' | 'medium' | 'large' })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>

                {/* Toggle Options */}
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.showPhoto}
                      onChange={(e) => setSettings({ ...settings, showPhoto: e.target.checked })}
                      className="w-4 h-4 rounded bg-white/10 border-white/20 text-purple-500 focus:ring-purple-500"
                    />
                    <span className="text-gray-300">Show Photo</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.showLinks}
                      onChange={(e) => setSettings({ ...settings, showLinks: e.target.checked })}
                      className="w-4 h-4 rounded bg-white/10 border-white/20 text-purple-500 focus:ring-purple-500"
                    />
                    <span className="text-gray-300">Show Links</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
