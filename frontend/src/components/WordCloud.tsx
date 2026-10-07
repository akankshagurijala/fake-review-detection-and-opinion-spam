import React from 'react';
import { Tag, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const WordCloud: React.FC = () => {
  const fakeKeywords = [
    { word: "MUST BUY", weight: 98, color: "text-rose-400 bg-rose-950/60 border-rose-500/40" },
    { word: "BEST EVER", weight: 95, color: "text-rose-400 bg-rose-950/60 border-rose-500/40" },
    { word: "FAST SHIPPING", weight: 92, color: "text-rose-300 bg-rose-950/40 border-rose-500/30" },
    { word: "10/10", weight: 89, color: "text-rose-300 bg-rose-950/40 border-rose-500/30" },
    { word: "TERRIBLE SCAM", weight: 88, color: "text-rose-400 bg-rose-950/60 border-rose-500/40" },
    { word: "REFUND MONEY", weight: 85, color: "text-rose-300 bg-rose-950/40 border-rose-500/30" },
    { word: "FREE GIFT", weight: 82, color: "text-rose-300 bg-rose-950/40 border-rose-500/30" },
    { word: "BUY BRAND X", weight: 79, color: "text-rose-300 bg-rose-950/40 border-rose-500/30" },
    { word: "TRASH GARBAGE", weight: 76, color: "text-rose-400 bg-rose-950/60 border-rose-500/40" },
    { word: "FIVE STARS", weight: 74, color: "text-rose-300 bg-rose-950/40 border-rose-500/30" }
  ];

  const genuineKeywords = [
    { word: "durable build", weight: 96, color: "text-emerald-300 bg-emerald-950/60 border-emerald-500/40" },
    { word: "battery life", weight: 93, color: "text-emerald-300 bg-emerald-950/60 border-emerald-500/40" },
    { word: "comfortable fit", weight: 90, color: "text-emerald-300 bg-emerald-950/40 border-emerald-500/30" },
    { word: "work sessions", weight: 87, color: "text-emerald-300 bg-emerald-950/40 border-emerald-500/30" },
    { word: "value for money", weight: 85, color: "text-emerald-300 bg-emerald-950/40 border-emerald-500/30" },
    { word: "daily usage", weight: 82, color: "text-emerald-300 bg-emerald-950/40 border-emerald-500/30" },
    { word: "two weeks later", weight: 79, color: "text-emerald-300 bg-emerald-950/40 border-emerald-500/30" },
    { word: "attentive service", weight: 76, color: "text-emerald-300 bg-emerald-950/40 border-emerald-500/30" }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Fake Keywords Tag Cloud */}
      <div className="glass-panel bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <AlertTriangle className="w-5 h-5 text-rose-400" />
          <h4 className="text-sm font-bold text-slate-100">Top Frequent Fake Review Keywords</h4>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {fakeKeywords.map((item, idx) => (
            <span
              key={idx}
              className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all hover:scale-105 ${item.color}`}
            >
              {item.word} <strong className="ml-1 opacity-60">({item.weight})</strong>
            </span>
          ))}
        </div>
      </div>

      {/* Genuine Keywords Tag Cloud */}
      <div className="glass-panel bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <h4 className="text-sm font-bold text-slate-100">Authentic Contextual Keywords</h4>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {genuineKeywords.map((item, idx) => (
            <span
              key={idx}
              className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all hover:scale-105 ${item.color}`}
            >
              {item.word} <strong className="ml-1 opacity-60">({item.weight})</strong>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
