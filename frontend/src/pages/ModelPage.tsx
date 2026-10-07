import React, { useEffect, useState } from 'react';
import { fetchModelInfo, retrainModelApi } from '../services/api';
import { ModelInfo } from '../types';
import { ModelMetricsVisualizer } from '../components/ModelMetricsVisualizer';
import { Cpu, RefreshCw, Layers, CheckCircle2, Zap, ArrowRight, ShieldCheck } from 'lucide-react';

export const ModelPage: React.FC = () => {
  const [modelInfo, setModelInfo] = useState<ModelInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [retraining, setRetraining] = useState<boolean>(false);
  const [retrainMsg, setRetrainMsg] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    const data = await fetchModelInfo();
    setModelInfo(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRetrain = async () => {
    setRetraining(true);
    setRetrainMsg("Fine-tuning PyTorch BERT + BiLSTM neural weights on newly flagged datasets...");
    const res = await retrainModelApi();
    setTimeout(() => {
      setRetrainMsg(res.message);
      setRetraining(false);
      loadData();
    }, 1500);
  };

  if (loading || !modelInfo) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <RefreshCw className="w-8 h-8 text-indigo-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner & Retrain Button */}
      <div className="glass-panel bg-gradient-to-r from-indigo-950/80 via-slate-900 to-slate-950 border border-indigo-500/30 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-500/20 rounded-xl text-indigo-400 border border-indigo-500/40">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white">
              {modelInfo.architecture.model_name} <span className="text-xs font-mono font-normal text-indigo-400">({modelInfo.architecture.version})</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Pretrained BERT Contextual Representations + 2-Layer Bidirectional LSTM Classifier</p>
          </div>
        </div>

        <button
          onClick={handleRetrain}
          disabled={retraining}
          className="px-5 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all disabled:opacity-50 shrink-0"
        >
          {retraining ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" /> Retraining PyTorch Epochs...
            </>
          ) : (
            <>
              <Zap className="w-4 h-4" /> Trigger Model Retraining
            </>
          )}
        </button>
      </div>

      {retrainMsg && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-xs font-semibold text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          {retrainMsg}
        </div>
      )}

      {/* Model Layer Architecture Visualizer */}
      <div className="glass-panel bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-400" />
            Neural Network Layer Pipeline
          </h4>
          <span className="text-xs text-slate-400 font-mono">PyTorch Module Architecture</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {modelInfo.architecture.layers.map((layer, idx) => (
            <div key={idx} className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl flex flex-col justify-between space-y-2 relative group hover:border-indigo-500/40 transition-all">
              <div>
                <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase">Layer 0{idx + 1}</span>
                <h5 className="text-xs font-bold text-slate-100 mt-1">{layer.name}</h5>
                <span className="text-[11px] font-semibold text-emerald-400 block mt-0.5">{layer.type}</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-tight">{layer.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Metrics Visualizer (ROC, PR Curve, Confusion Matrix) */}
      <ModelMetricsVisualizer info={modelInfo} />
    </div>
  );
};
