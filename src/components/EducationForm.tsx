import type { Education } from '../types';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface Props {
  data: Education[];
  onChange: (data: Education[]) => void;
}

const EducationForm = ({ data, onChange }: Props) => {
  const [expanded, setExpanded] = useState<string | null>(data[0]?.id || null);

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: '',
      highlights: [],
    };
    onChange([...data, newEdu]);
    setExpanded(newEdu.id);
  };

  const updateEducation = (id: string, updates: Partial<Education>) => {
    onChange(data.map(edu => edu.id === id ? { ...edu, ...updates } : edu));
  };

  const removeEducation = (id: string) => {
    onChange(data.filter(edu => edu.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Education</h2>
        <button onClick={addEducation} className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" /> Add Education
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-12 bg-white/5 rounded-xl border border-dashed border-white/20">
          <p className="text-gray-400">No education added yet</p>
          <button onClick={addEducation} className="mt-4 text-purple-400 hover:text-purple-300 text-sm">Add your education</button>
        </div>
      ) : (
        <div className="space-y-3">
          {data.map((edu) => (
            <div key={edu.id} className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
              <button onClick={() => setExpanded(expanded === edu.id ? null : edu.id)} className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
                <div className="text-left">
                  <p className="font-medium text-white">{edu.degree || 'Degree'} {edu.field && `in ${edu.field}`}</p>
                  <p className="text-sm text-gray-400">{edu.institution || 'Institution'}</p>
                </div>
                {expanded === edu.id ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
              </button>

              {expanded === edu.id && (
                <div className="p-4 border-t border-white/10 space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <input type="text" value={edu.institution} onChange={(e) => updateEducation(edu.id, { institution: e.target.value })} placeholder="Institution Name" className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-500" />
                    <input type="text" value={edu.degree} onChange={(e) => updateEducation(edu.id, { degree: e.target.value })} placeholder="Degree (e.g., Bachelor's, Master's)" className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-500" />
                    <input type="text" value={edu.field} onChange={(e) => updateEducation(edu.id, { field: e.target.value })} placeholder="Field of Study" className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-500" />
                    <input type="text" value={edu.location} onChange={(e) => updateEducation(edu.id, { location: e.target.value })} placeholder="Location" className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-500" />
                    <div className="flex gap-2">
                      <input type="month" value={edu.startDate} onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })} className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white" />
                      <input type="month" value={edu.endDate} onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })} className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white" />
                    </div>
                    <input type="text" value={edu.gpa} onChange={(e) => updateEducation(edu.id, { gpa: e.target.value })} placeholder="GPA (optional)" className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-500" />
                  </div>
                  <button onClick={() => removeEducation(edu.id)} className="flex items-center gap-2 text-red-400 hover:text-red-300 text-sm">
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

export default EducationForm;
