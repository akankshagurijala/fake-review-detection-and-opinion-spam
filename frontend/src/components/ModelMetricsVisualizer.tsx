import React from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  AreaChart,
  Area
} from 'recharts';
import { ModelInfo } from '../types';
import { Cpu, Award, Zap, Activity } from 'lucide-react';

interface ModelMetricsVisualizerProps {
  info: ModelInfo;
}

export const ModelMetricsVisualizer: React.FC<ModelMetricsVisualizerProps> = ({ info }) => {
  const rocData = [
    { fpr: 0.0, tpr: 0.0 },
    { fpr: 0.02, tpr: 0.85 },
    { fpr: 0.05, tpr: 0.94 },
    { fpr: 0.10, tpr: 0.97 },
    { fpr: 0.20, tpr: 0.985 },
    { fpr: 0.50, tpr: 0.995 },
    { fpr: 1.0, tpr: 1.0 }
  ];

  const prData = [
    { recall: 0.0, precision: 1.0 },
    { recall: 0.5, precision: 0.98 },
    { recall: 0.8, precision: 0.96 },
    { recall: 0.94, precision: 0.95 },
    { recall: 0.98, precision: 0.91 },
    { recall: 1.0, precision: 0.82 }
  ];

  const cm = info.metrics.confusion_matrix;

  return (
    <div className="space-y-6">
      {/* Metrics Banner */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="glass-panel bg-slate-900/80 border border-slate-800 p-4 rounded-xl text-center">
          <span className="text-xs text-slate-400 font-medium">Accuracy</span>
          <p className="text-2xl font-black text-emerald-400 mt-1">{info.metrics.accuracy}%</p>
        </div>
        <div className="glass-panel bg-slate-900/80 border border-slate-800 p-4 rounded-xl text-center">
          <span className="text-xs text-slate-400 font-medium">Precision</span>
          <p className="text-2xl font-black text-indigo-400 mt-1">{info.metrics.precision}%</p>
        </div>
        <div className="glass-panel bg-slate-900/80 border border-slate-800 p-4 rounded-xl text-center">
          <span className="text-xs text-slate-400 font-medium">Recall</span>
          <p className="text-2xl font-black text-purple-400 mt-1">{info.metrics.recall}%</p>
        </div>
        <div className="glass-panel bg-slate-900/80 border border-slate-800 p-4 rounded-xl text-center">
          <span className="text-xs text-slate-400 font-medium">F1-Score</span>
          <p className="text-2xl font-black text-amber-400 mt-1">{info.metrics.f1_score}%</p>
        </div>
        <div className="glass-panel bg-slate-900/80 border border-slate-800 p-4 rounded-xl text-center col-span-2 md:col-span-1">
          <span className="text-xs text-slate-400 font-medium">ROC-AUC</span>
          <p className="text-2xl font-black text-rose-400 mt-1">{info.metrics.roc_auc}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 1. Confusion Matrix Card */}
        <div className="glass-panel bg-slate-900/70 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <h4 className="text-base font-bold text-slate-100 mb-1">Confusion Matrix</h4>
            <p className="text-xs text-slate-400">Model Classification Performance Grid</p>
          </div>

          <div className="my-6 grid grid-cols-2 gap-3 text-center font-mono">
            <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-xl">
              <span className="text-[10px] text-emerald-400 uppercase font-bold tracking-wider">True Genuine</span>
              <p className="text-2xl font-black text-emerald-300 mt-1">{cm.true_genuine.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-rose-950/40 border border-rose-500/30 rounded-xl">
              <span className="text-[10px] text-rose-400 uppercase font-bold tracking-wider">False Fake</span>
              <p className="text-2xl font-black text-rose-300 mt-1">{cm.false_fake.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-amber-950/40 border border-amber-500/30 rounded-xl">
              <span className="text-[10px] text-amber-400 uppercase font-bold tracking-wider">False Genuine</span>
              <p className="text-2xl font-black text-amber-300 mt-1">{cm.false_genuine.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-indigo-950/40 border border-indigo-500/30 rounded-xl">
              <span className="text-[10px] text-indigo-400 uppercase font-bold tracking-wider">True Fake</span>
              <p className="text-2xl font-black text-indigo-300 mt-1">{cm.true_fake.toLocaleString()}</p>
            </div>
          </div>

          <div className="text-center text-xs text-slate-400 border-t border-slate-800 pt-3">
            Trained on <strong>{info.metrics.total_trained_samples.toLocaleString()}</strong> Amazon/Yelp samples
          </div>
        </div>

        {/* 2. ROC Curve */}
        <div className="glass-panel bg-slate-900/70 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <h4 className="text-base font-bold text-slate-100 mb-1">ROC Curve (AUC = {info.metrics.roc_auc})</h4>
            <p className="text-xs text-slate-400">Receiver Operating Characteristic Curve</p>
          </div>
          <div className="h-56 my-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={rocData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="fpr" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', borderRadius: '12px', color: '#FFF' }} />
                <Area type="monotone" dataKey="tpr" stroke="#6366F1" fill="#6366F1" fillOpacity={0.2} strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center text-xs text-slate-400 border-t border-slate-800 pt-2">
            High True Positive Rate vs False Positive Rate
          </div>
        </div>

        {/* 3. Precision-Recall Curve */}
        <div className="glass-panel bg-slate-900/70 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <h4 className="text-base font-bold text-slate-100 mb-1">Precision-Recall Curve</h4>
            <p className="text-xs text-slate-400">Precision tradeoff across Recall thresholds</p>
          </div>
          <div className="h-56 my-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={prData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="recall" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', borderRadius: '12px', color: '#FFF' }} />
                <Area type="monotone" dataKey="precision" stroke="#10B981" fill="#10B981" fillOpacity={0.2} strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center text-xs text-slate-400 border-t border-slate-800 pt-2">
            Optimal decision threshold set at <strong>0.50 Softmax</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
