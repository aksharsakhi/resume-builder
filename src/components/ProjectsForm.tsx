import type { Project } from '../types';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface Props {
  data: Project[];
  onChange: (data: Project[]) => void;
}

const ProjectsForm = ({ data, onChange }: Props) => {
  const [expanded, setExpanded] = useState<string | null>(null);

  const addProject = () => {
    const newProj: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: '',
      link: '',
      highlights: [],
    };
    onChange([...data, newProj]);
    setExpanded(newProj.id);
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    onChange(data.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const removeProject = (id: string) => {
    onChange(data.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Projects</h2>
        <button onClick={addProject} className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-12 bg-white/5 rounded-xl border border-dashed border-white/20">
          <p className="text-gray-400">No projects added yet</p>
          <button onClick={addProject} className="mt-4 text-purple-400 hover:text-purple-300 text-sm">Add your first project</button>
        </div>
      ) : (
        <div className="space-y-3">
          {data.map((proj) => (
            <div key={proj.id} className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
              <button onClick={() => setExpanded(expanded === proj.id ? null : proj.id)} className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
                <div className="text-left">
                  <p className="font-medium text-white">{proj.name || 'Project Name'}</p>
                  <p className="text-sm text-gray-400">{proj.technologies || 'Technologies'}</p>
                </div>
                {expanded === proj.id ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
              </button>

              {expanded === proj.id && (
                <div className="p-4 border-t border-white/10 space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <input type="text" value={proj.name} onChange={(e) => updateProject(proj.id, { name: e.target.value })} placeholder="Project Name" className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-500" />
                    <input type="text" value={proj.link} onChange={(e) => updateProject(proj.id, { link: e.target.value })} placeholder="Project URL (optional)" className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-500" />
                  </div>
                  <input type="text" value={proj.technologies} onChange={(e) => updateProject(proj.id, { technologies: e.target.value })} placeholder="Technologies used (e.g., React, Node.js, PostgreSQL)" className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-500" />
                  <textarea value={proj.description} onChange={(e) => updateProject(proj.id, { description: e.target.value })} placeholder="Describe the project, your role, and key achievements..." rows={3} className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-500 resize-none" />
                  <button onClick={() => removeProject(proj.id)} className="flex items-center gap-2 text-red-400 hover:text-red-300 text-sm">
                    <Trash2 className="w-4 h-4" /> Remove
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsForm;
