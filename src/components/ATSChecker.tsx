import type { ResumeData, ATSScore } from '../types';
import { calculateATSScore } from '../atsChecker';
import { useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Lightbulb, RefreshCw } from 'lucide-react';

interface Props {
  resume: ResumeData;
}

const ATSChecker = ({ resume }: Props) => {
  const [jobDescription, setJobDescription] = useState('');
  const [score, setScore] = useState<ATSScore | null>(null);
  const [checking, setChecking] = useState(false);

  const runCheck = () => {
    setChecking(true);
    setTimeout(() => {
      const result = calculateATSScore(resume, jobDescription);
      setScore(result);
      setChecking(false);
    }, 500);
  };

  const getScoreColor = (total: number) => {
    if (total >= 80) return 'text-green-400';
    if (total >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreGradient = (total: number) => {
    if (total >= 80) return 'from-green-500 to-emerald-500';
    if (total >= 60) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">ATS Score Checker</h2>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Paste Job Description</label>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the job description here to check how well your resume matches..."
          rows={6}
          className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 resize-none"
        />
      </div>

      <button
        onClick={runCheck}
        disabled={checking}
        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-medium transition-all disabled:opacity-50"
      >
        {checking ? <RefreshCw className="w-5 h-5 animate-spin" /> : <CheckCircle className="w-5 h-5" />}
        {checking ? 'Analyzing...' : 'Check ATS Score'}
      </button>

      {score && (
        <div className="space-y-6 mt-6">
          {/* Overall Score */}
          <div className="bg-white/5 rounded-2xl p-6 text-center">
            <div className={`text-6xl font-bold ${getScoreColor(score.total)} mb-2`}>{score.total}%</div>
            <p className="text-gray-400">ATS Compatibility Score</p>
            <div className="mt-4 h-3 bg-white/10 rounded-full overflow-hidden max-w-md mx-auto">
              <div
                className={`h-full bg-gradient-to-r ${getScoreGradient(score.total)} transition-all duration-1000`}
                style={{ width: `${score.total}%` }}
              />
            </div>
          </div>

          {/* Section Scores */}
          <div className="grid md:grid-cols-2 gap-4">
            {score.sections.map((section, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-medium">{section.name}</span>
                  <span className={`${section.score >= 70 ? 'text-green-400' : section.score >= 40 ? 'text-yellow-400' : 'text-red-400'}`}>
                    {section.score}/{section.maxScore}
                  </span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${section.score >= 70 ? 'bg-green-500' : section.score >= 40 ? 'bg-yellow-500' : 'bg-red-500'} transition-all`}
                    style={{ width: `${(section.score / section.maxScore) * 100}%` }}
                  />
                </div>
                {section.suggestions.length > 0 && (
                  <div className="mt-3 space-y-1">
                    {section.suggestions.map((s, j) => (
                      <p key={j} className="text-xs text-gray-400 flex items-start gap-1">
                        <Lightbulb className="w-3 h-3 text-yellow-400 mt-0.5 flex-shrink-0" />
                        {s}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Keywords */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-xl p-4">
              <h3 className="text-white font-medium mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Keywords Found ({score.keywords.found.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {score.keywords.found.map((kw, i) => (
                  <span key={i} className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-xs">{kw}</span>
                ))}
                {score.keywords.found.length === 0 && <span className="text-gray-500 text-sm">No keywords matched</span>}
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4">
              <h3 className="text-white font-medium mb-3 flex items-center gap-2">
                <XCircle className="w-4 h-4 text-red-400" />
                Missing Keywords ({score.keywords.missing.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {score.keywords.missing.slice(0, 15).map((kw, i) => (
                  <span key={i} className="px-2 py-1 bg-red-500/20 text-red-300 rounded text-xs">{kw}</span>
                ))}
                {score.keywords.missing.length === 0 && <span className="text-gray-500 text-sm">All keywords matched!</span>}
              </div>
            </div>
          </div>

          {/* Issues */}
          {score.issues.length > 0 && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
              <h3 className="text-red-400 font-medium mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Issues to Fix
              </h3>
              <ul className="space-y-1">
                {score.issues.map((issue, i) => (
                  <li key={i} className="text-sm text-gray-300">• {issue}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ATSChecker;
