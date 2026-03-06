import type { Certification } from '../types';
import { Plus, Trash2 } from 'lucide-react';

interface Props {
  data: Certification[];
  onChange: (data: Certification[]) => void;
}

const CertificationsForm = ({ data, onChange }: Props) => {
  const addCertification = () => {
    const newCert: Certification = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      date: '',
      link: '',
    };
    onChange([...data, newCert]);
  };

  const updateCertification = (id: string, updates: Partial<Certification>) => {
    onChange(data.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const removeCertification = (id: string) => {
    onChange(data.filter(c => c.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Certifications</h2>
        <button onClick={addCertification} className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" /> Add Certification
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-12 bg-white/5 rounded-xl border border-dashed border-white/20">
          <p className="text-gray-400">No certifications added yet</p>
          <button onClick={addCertification} className="mt-4 text-purple-400 hover:text-purple-300 text-sm">Add your certifications</button>
        </div>
      ) : (
        <div className="grid gap-3">
          {data.map((cert) => (
            <div key={cert.id} className="bg-white/5 rounded-xl border border-white/10 p-4">
              <div className="grid md:grid-cols-2 gap-3">
                <input type="text" value={cert.name} onChange={(e) => updateCertification(cert.id, { name: e.target.value })} placeholder="Certification Name" className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-500" />
                <input type="text" value={cert.issuer} onChange={(e) => updateCertification(cert.id, { issuer: e.target.value })} placeholder="Issuing Organization" className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-500" />
                <input type="month" value={cert.date} onChange={(e) => updateCertification(cert.id, { date: e.target.value })} className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white" />
                <input type="url" value={cert.link} onChange={(e) => updateCertification(cert.id, { link: e.target.value })} placeholder="Credential URL (optional)" className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-500" />
              </div>
              <button onClick={() => removeCertification(cert.id)} className="flex items-center gap-2 text-red-400 hover:text-red-300 text-sm mt-3">
                <Trash2 className="w-4 h-4" /> Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CertificationsForm;
