import type { ResumeData, ResumeSettings } from '../types';
import { downloadPdf, downloadWord } from '../utils/export';
import { FileDown, FileText, RefreshCw, Upload } from 'lucide-react';
import { useState, useRef } from 'react';

interface Props {
  resume: ResumeData;
  settings: ResumeSettings;
}

const ExportButtons = ({ resume, settings }: Props) => {
  const [exporting, setExporting] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePdfExport = async () => {
    setExporting('pdf');
    try {
      await downloadPdf(resume, settings);
    } finally {
      setExporting(null);
    }
  };

  const handleWordExport = async () => {
    setExporting('word');
    try {
      await downloadWord(resume, settings);
    } finally {
      setExporting(null);
    }
  };

  const handleExportJson = () => {
    const dataStr = JSON.stringify(resume, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume-data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        localStorage.setItem('resume-builder-data', JSON.stringify(data));
        window.location.reload();
      } catch {
        alert('Invalid JSON file');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex items-center gap-2">
      <input type="file" ref={fileInputRef} onChange={handleImportJson} accept=".json" className="hidden" />
      
      <button
        onClick={() => fileInputRef.current?.click()}
        className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm transition-colors"
      >
        <Upload className="w-4 h-4" />
        Import
      </button>

      <button
        onClick={handleExportJson}
        className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm transition-colors"
      >
        <FileText className="w-4 h-4" />
        JSON
      </button>

      <button
        onClick={handleWordExport}
        disabled={exporting !== null}
        className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
      >
        {exporting === 'word' ? <RefreshCw className="w-4 h-4 animate-spin" /> : <FileDown className="w-4 h-4" />}
        <span className="hidden sm:inline">Word</span>
      </button>

      <button
        onClick={handlePdfExport}
        disabled={exporting !== null}
        className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg text-sm font-medium transition-all disabled:opacity-50"
      >
        {exporting === 'pdf' ? <RefreshCw className="w-4 h-4 animate-spin" /> : <FileDown className="w-4 h-4" />}
        <span className="hidden sm:inline">PDF</span>
      </button>
    </div>
  );
};

export default ExportButtons;
