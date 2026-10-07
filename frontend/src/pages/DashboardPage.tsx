import React, { useEffect, useState } from 'react';
import { DashboardCards } from '../components/DashboardCards';
import { Charts } from '../components/Charts';
import { WordCloud } from '../components/WordCloud';
import { fetchDashboardMetrics } from '../services/api';
import { DashboardMetrics } from '../types';
import { RefreshCw, ShieldAlert, Sparkles } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const loadData = async () => {
    setLoading(true);
    const data = await fetchDashboardMetrics();
    setMetrics(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading || !metrics) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="w-8 h-8 text-indigo-400 animate-spin" />
          <p className="text-sm font-medium text-slate-400">Loading Sentiment & Opinion Spam Analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner Alert */}
      <div className="p-4 bg-gradient-to-r from-indigo-950/80 via-slate-900 to-slate-950 border border-indigo-500/30 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-500/20 rounded-xl border border-indigo-500/40 text-indigo-300 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Sentiment-Aware Neural Spam Detection Engine</h3>
            <p className="text-xs text-slate-400 mt-0.5">Analyzing rating-sentiment consistency and contextual embeddings from BERT + BiLSTM model</p>
          </div>
        </div>
        <button
          onClick={loadData}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 rounded-xl flex items-center gap-2 transition-all shrink-0"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Refresh Analytics
        </button>
      </div>

      {/* Metric Cards Grid */}
      <DashboardCards metrics={metrics} />

      {/* Main Charts */}
      <Charts metrics={metrics} />

      {/* Word Cloud & Keyword Frequency */}
      <WordCloud />
    </div>
  );
};
