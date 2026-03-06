import type { Skill } from '../types';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';

interface Props {
  data: Skill[];
  onChange: (data: Skill[]) => void;
}

const categories = ['Technical', 'Languages', 'Frameworks', 'Tools', 'Soft Skills', 'Other'];

const SkillsForm = ({ data, onChange }: Props) => {
  const [newSkill, setNewSkill] = useState('');
  const [category, setCategory] = useState('Technical');
  const [level, setLevel] = useState<Skill['level']>('intermediate');

  const addSkill = () => {
    if (!newSkill.trim()) return;
    const skill: Skill = {
      id: Date.now().toString(),
      name: newSkill.trim(),
      level,
      category,
    };
    onChange([...data, skill]);
    setNewSkill('');
  };

  const removeSkill = (id: string) => {
    onChange(data.filter(s => s.id !== id));
  };

  const groupedSkills = data.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const levelColors = {
    beginner: 'bg-gray-500/20 text-gray-300',
    intermediate: 'bg-blue-500/20 text-blue-300',
    advanced: 'bg-green-500/20 text-green-300',
    expert: 'bg-purple-500/20 text-purple-300',
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white">Skills</h2>

      {/* Add Skill */}
      <div className="bg-white/5 rounded-xl p-4 space-y-4">
        <div className="grid md:grid-cols-4 gap-3">
          <input type="text" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addSkill()} placeholder="Skill name" className="md:col-span-2 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-500" />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white">
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={level} onChange={(e) => setLevel(e.target.value as Skill['level'])} className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white">
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="expert">Expert</option>
          </select>
        </div>
        <button onClick={addSkill} className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" /> Add Skill
        </button>
      </div>

      {/* Skills by Category */}
      {Object.keys(groupedSkills).length === 0 ? (
        <p className="text-gray-400 text-center py-8">No skills added yet</p>
      ) : (
        <div className="space-y-4">
          {Object.entries(groupedSkills).map(([cat, skills]) => (
            <div key={cat}>
              <h3 className="text-sm font-medium text-gray-400 mb-2">{cat}</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                  <span key={skill.id} className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm ${levelColors[skill.level]}`}>
                    {skill.name}
                    <button onClick={() => removeSkill(skill.id)} className="hover:text-white">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillsForm;
