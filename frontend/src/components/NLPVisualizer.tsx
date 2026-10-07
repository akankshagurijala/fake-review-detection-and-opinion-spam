import React, { useState } from 'react';
import { PreprocessResult } from '../types';
import { ArrowRight, Check, Sparkles, Filter, Code, Type, Hash } from 'lucide-react';

interface NLPVisualizerProps {
  data: PreprocessResult;
}

export const NLPVisualizer: React.FC<NLPVisualizerProps> = ({ data }) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    { title: "1. Raw Text Input", icon: Type, description: "Original uncleaned review text received from e-commerce input source." },
    { title: "2. Lowercasing", icon: Code, description: "Converts all characters to lowercase for uniform vectorization." },
    { title: "3. URL & Special Char Clean", icon: Filter, description: "Strips out hyper-links, emojis, HTML tags, and punctuation symbols." },
    { title: "4. Tokenization", icon: Hash, description: "Splits cleaned text into discrete lexical token units." },
    { title: "5. Stop-word Removal", icon: Sparkles, description: "Filters out high-frequency non-informative English stop words." },
    { title: "6. Lemmatization & BERT Input", icon: Check, description: "Reduces tokens to root lemma forms ready for BERT embedding tokenization." }
  ];

  return (
    <div className="glass-panel bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-lg font-extrabold text-white tracking-tight flex items-center gap-2">
            NLP Preprocessing Pipeline Inspector
          </h3>
          <p className="text-xs text-slate-400">Step-by-step visual text cleaning & tokenization breakdown</p>
        </div>
        {/* Pipeline Summary Badges */}
        <div className="flex items-center gap-3 text-xs">
          <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 rounded-lg text-indigo-300 font-medium">
            Original: <strong>{data.stats.token_count_before} tokens</strong>
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-300 font-medium">
            Final: <strong>{data.stats.token_count_after} tokens</strong>
          </span>
          <span className="px-3 py-1 bg-rose-500/10 border border-rose-500/30 rounded-lg text-rose-300 font-medium">
            Removed: <strong>{data.stats.removed_stopwords_count} stopwords</strong>
          </span>
        </div>
      </div>

      {/* Step Selector Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isActive = activeStep === idx;
          return (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`p-3 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between h-24 ${
                isActive
                  ? 'bg-gradient-to-br from-indigo-600/90 to-indigo-700/80 border-indigo-400 text-white shadow-lg shadow-indigo-500/25 scale-[1.02]'
                  : 'bg-slate-800/40 border-slate-700/50 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span className="text-[11px] font-bold leading-tight">{step.title}</span>
            </button>
          );
        })}
      </div>

      {/* Step Visualizer Panel */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
            <h4 className="text-sm font-bold text-slate-100">{steps[activeStep].title}</h4>
          </div>
          <span className="text-xs text-slate-400 italic">{steps[activeStep].description}</span>
        </div>

        {/* Content Renderers depending on step */}
        <div className="min-h-[120px] font-mono text-sm leading-relaxed">
          {activeStep === 0 && (
            <p className="text-amber-200 bg-amber-950/20 p-4 rounded-lg border border-amber-500/20">
              "{data.raw_text}"
            </p>
          )}

          {activeStep === 1 && (
            <p className="text-blue-200 bg-blue-950/20 p-4 rounded-lg border border-blue-500/20">
              "{data.lowercased}"
            </p>
          )}

          {activeStep === 2 && (
            <p className="text-violet-200 bg-violet-950/20 p-4 rounded-lg border border-violet-500/20">
              "{data.cleaned_chars}"
            </p>
          )}

          {activeStep === 3 && (
            <div className="flex flex-wrap gap-2 p-3 bg-slate-900 rounded-lg border border-slate-800">
              {data.tokens.map((t, idx) => (
                <span key={idx} className="px-2.5 py-1 bg-slate-800 border border-slate-700 text-slate-200 rounded-md text-xs font-semibold">
                  [{t}]
                </span>
              ))}
            </div>
          )}

          {activeStep === 4 && (
            <div className="flex flex-wrap gap-2 p-3 bg-slate-900 rounded-lg border border-slate-800">
              {data.tokens.map((t, idx) => {
                const isFiltered = !data.tokens_no_stopwords.includes(t);
                return (
                  <span
                    key={idx}
                    className={`px-2.5 py-1 border rounded-md text-xs font-semibold ${
                      isFiltered
                        ? 'bg-rose-950/40 border-rose-500/40 text-rose-400 line-through opacity-60'
                        : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                    }`}
                  >
                    {t}
                  </span>
                );
              })}
            </div>
          )}

          {activeStep === 5 && (
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2 p-3 bg-emerald-950/20 rounded-lg border border-emerald-500/30">
                {data.lemmatized_tokens.map((t, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 rounded-md text-xs font-bold shadow-sm">
                    {t}
                  </span>
                ))}
              </div>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-lg border border-slate-800">
                <strong className="text-indigo-400">BERT Tokenizer Input:</strong> [CLS] {data.final_text} [SEP]
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
