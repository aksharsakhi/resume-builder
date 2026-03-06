import type { ResumeData, ResumeSettings } from '../types';
import ProfessionalTemplate from './templates/ProfessionalTemplate';
import ModernTemplate from './templates/ModernTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import ExecutiveTemplate from './templates/ExecutiveTemplate';
import ElegantTemplate from './templates/ElegantTemplate';
import { Printer } from 'lucide-react';

interface Props {
  resume: ResumeData;
  settings: ResumeSettings;
}

const ResumePreview = ({ resume, settings }: Props) => {
  const handlePrint = () => {
    window.print();
  };

  const renderTemplate = () => {
    switch (settings.template) {
      case 'modern':
        return <ModernTemplate resume={resume} settings={settings} />;
      case 'creative':
        return <CreativeTemplate resume={resume} settings={settings} />;
      case 'minimal':
        return <MinimalTemplate resume={resume} settings={settings} />;
      case 'executive':
        return <ExecutiveTemplate resume={resume} settings={settings} />;
      case 'elegant':
        return <ElegantTemplate resume={resume} settings={settings} />;
      default:
        return <ProfessionalTemplate resume={resume} settings={settings} />;
    }
  };

  return (
    <div>
      <div className="flex justify-end mb-4 no-print">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors shadow font-medium"
        >
          <Printer size={18} />
          Print / Save PDF
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-xl max-w-4xl mx-auto print:shadow-none print:rounded-none">
        {renderTemplate()}
      </div>
    </div>
  );
};

export default ResumePreview;
