import React from 'react';
import { 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Target, 
  Heart, 
  AlertCircle 
} from 'lucide-react';
import { DashboardMetrics } from '../types';

interface DashboardCardsProps {
  metrics: DashboardMetrics;
}

export const DashboardCards: React.FC<DashboardCardsProps> = ({ metrics }) => {
  const cards = [
    {
      title: "Total Reviews Analyzed",
      value: metrics.total_reviews.toLocaleString(),
      subtitle: "+12% this week",
      icon: FileText,
      color: "from-indigo-500/20 to-blue-500/10",
      borderColor: "border-indigo-500/30",
      textColor: "text-indigo-400"
    },
    {
      title: "Genuine Reviews",
      value: metrics.genuine_reviews.toLocaleString(),
      subtitle: `${metrics.fake_vs_genuine.genuine_percentage}% of total`,
      icon: CheckCircle2,
      color: "from-emerald-500/20 to-teal-500/10",
      borderColor: "border-emerald-500/30",
      textColor: "text-emerald-400"
    },
    {
      title: "Fake & Spam Reviews",
      value: metrics.fake_reviews.toLocaleString(),
      subtitle: `${metrics.fake_vs_genuine.fake_percentage}% of total`,
      icon: AlertTriangle,
      color: "from-rose-500/20 to-red-500/10",
      borderColor: "border-rose-500/30",
      textColor: "text-rose-400"
    },
    {
      title: "Model Accuracy",
      value: `${metrics.accuracy}%`,
      subtitle: `F1-Score: ${metrics.f1_score}%`,
      icon: Target,
      color: "from-violet-500/20 to-purple-500/10",
      borderColor: "border-violet-500/30",
      textColor: "text-violet-400"
    },
    {
      title: "Avg Sentiment Polarity",
      value: metrics.average_sentiment_score > 0 ? `+${metrics.average_sentiment_score}` : `${metrics.average_sentiment_score}`,
      subtitle: "Positive Polarity",
      icon: Heart,
      color: "from-amber-500/20 to-orange-500/10",
      borderColor: "border-amber-500/30",
      textColor: "text-amber-400"
    },
    {
      title: "Rating-Sentiment Mismatches",
      value: metrics.mismatch_reviews.toLocaleString(),
      subtitle: "Suspicious Incongruities",
      icon: AlertCircle,
      color: "from-fuchsia-500/20 to-pink-500/10",
      borderColor: "border-fuchsia-500/30",
      textColor: "text-fuchsia-400"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div 
            key={idx}
            className={`glass-panel bg-gradient-to-br ${card.color} border ${card.borderColor} rounded-2xl p-5 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-300 tracking-wide uppercase">{card.title}</span>
              <div className={`p-2 rounded-xl bg-slate-900/60 ${card.textColor}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl font-black text-white tracking-tight mb-1">{card.value}</div>
            <p className="text-[11px] font-medium text-slate-400">{card.subtitle}</p>
          </div>
        );
      })}
    </div>
  );
};
