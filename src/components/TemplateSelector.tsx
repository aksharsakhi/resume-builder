import type { TemplateId } from '../types';
import { Check } from 'lucide-react';

interface Props {
  currentTemplate: TemplateId;
  onSelect: (template: TemplateId) => void;
}

const templates: { id: TemplateId; name: string; description: string; preview: string }[] = [
  { id: 'professional', name: 'Professional', description: 'Clean & corporate', preview: 'bg-gradient-to-br from-blue-600 to-blue-800' },
  { id: 'modern', name: 'Modern', description: 'Bold & contemporary', preview: 'bg-gradient-to-br from-purple-600 to-pink-600' },
  { id: 'creative', name: 'Creative', description: 'Stand out from crowd', preview: 'bg-gradient-to-br from-orange-500 to-red-500' },
  { id: 'minimal', name: 'Minimal', description: 'Simple & elegant', preview: 'bg-gradient-to-br from-gray-600 to-gray-800' },
  { id: 'executive', name: 'Executive', description: 'Senior level', preview: 'bg-gradient-to-br from-slate-700 to-slate-900' },
  { id: 'elegant', name: 'Elegant', description: 'Sophisticated', preview: 'bg-gradient-to-br from-teal-600 to-emerald-600' },
];

const TemplateSelector = ({ currentTemplate, onSelect }: Props) => {
  return (
    <div>
      <h3 className="text-lg font-bold text-white mb-4">Choose Template</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelect(template.id)}
            className={`relative rounded-xl overflow-hidden transition-all hover:scale-105 ${
              currentTemplate === template.id ? 'ring-2 ring-white ring-offset-2 ring-offset-transparent' : ''
            }`}
          >
            <div className={`aspect-[3/4] ${template.preview} flex items-center justify-center`}>
              <div className="bg-white/90 rounded-lg p-2 w-3/4 space-y-1">
                <div className="h-1.5 bg-gray-300 rounded w-1/2" />
                <div className="h-1 bg-gray-200 rounded w-3/4" />
                <div className="h-1 bg-gray-200 rounded w-2/3" />
                <div className="h-1 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
            {currentTemplate === template.id && (
              <div className="absolute top-2 right-2 bg-white rounded-full p-0.5">
                <Check className="w-3 h-3 text-green-600" />
              </div>
            )}
            <div className="p-2 bg-black/40 backdrop-blur">
              <p className="text-xs font-medium text-white">{template.name}</p>
              <p className="text-[10px] text-gray-300">{template.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
