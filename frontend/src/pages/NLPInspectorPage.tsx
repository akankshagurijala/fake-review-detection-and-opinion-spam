import React, { useState } from 'react';
import { runLocalNLPPreprocess } from '../services/mockService';
import { NLPVisualizer } from '../components/NLPVisualizer';
import { FileCode2, Sparkles, Wand2 } from 'lucide-react';

export const NLPInspectorPage: React.FC = () => {
  const [sampleText, setSampleText] = useState<string>(
    "Check out https://scam-store.com! MUST BUY AMAZING QUALITY!!! I love this product so much 10/10 fast shipping!!!"
  );

  const preprocessData = runLocalNLPPreprocess(sampleText);

  return (
    <div className="space-y-8 pb-12">
      {/* Workspace Input Card */}
      <div className="glass-panel bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <FileCode2 className="w-5 h-5 text-indigo-400" />
            Interactive Text Cleaning & Preprocessing Testing Lab
          </h3>
          <span className="text-xs text-slate-400">Lowercasing • Regex Clean • Tokenization • Lemmatization</span>
        </div>

        <textarea
          value={sampleText}
          onChange={(e) => setSampleText(e.target.value)}
          rows={4}
          placeholder="Enter text to see live NLP preprocessing steps..."
          className="w-full bg-slate-950/80 border border-slate-800 focus:border-indigo-500 rounded-xl p-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-mono leading-relaxed"
        />
      </div>

      {/* Pipeline Visualizer */}
      <NLPVisualizer data={preprocessData} />
    </div>
  );
};
