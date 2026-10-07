import React from 'react';
import { SuspiciousFeature } from '../types';
import { AlertCircle, Flag } from 'lucide-react';

interface HighlightedTextProps {
  text: string;
  suspiciousPhrases: SuspiciousFeature[];
}

export const HighlightedText: React.FC<HighlightedTextProps> = ({ text, suspiciousPhrases }) => {
  if (!suspiciousPhrases || suspiciousPhrases.length === 0) {
    return (
      <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl text-slate-200 text-sm leading-relaxed">
        "{text}"
      </div>
    );
  }

  // Render highlighted spans
  return (
    <div className="space-y-4">
      <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm leading-relaxed relative">
        <p className="font-sans">
          "{text}"
        </p>
      </div>

      {/* Flagged Tokens List */}
      <div className="space-y-2">
        <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <Flag className="w-3.5 h-3.5 text-rose-400" />
          Detected Suspicious Tokens & Phrases ({suspiciousPhrases.length})
        </h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {suspiciousPhrases.map((phrase, idx) => (
            <div key={idx} className="p-3 bg-rose-950/20 border border-rose-500/30 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-extrabold text-rose-300 bg-rose-900/40 px-2 py-0.5 rounded border border-rose-500/40">
                    "{phrase.token}"
                  </span>
                  <span className="text-[10px] font-semibold text-rose-400 uppercase bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
                    {phrase.category}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1 leading-snug">{phrase.reason}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
