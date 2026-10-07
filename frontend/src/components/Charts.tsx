import React from 'react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  LineChart, 
  Line, 
  Legend 
} from 'recharts';
import { DashboardMetrics } from '../types';

interface ChartsProps {
  metrics: DashboardMetrics;
}

export const Charts: React.FC<ChartsProps> = ({ metrics }) => {
  const pieData = [
    { name: 'Genuine Reviews', value: metrics.genuine_reviews, color: '#10B981' },
    { name: 'Fake & Spam Reviews', value: metrics.fake_reviews, color: '#F43F5E' },
  ];

  const barData = [
    { name: 'Positive', count: metrics.sentiment_distribution.positive, fill: '#3B82F6' },
    { name: 'Neutral', count: metrics.sentiment_distribution.neutral, fill: '#94A3B8' },
    { name: 'Negative', count: metrics.sentiment_distribution.negative, fill: '#F43F5E' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* 1. Pie Chart: Genuine vs Fake */}
      <div className="glass-panel bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-100 mb-1">Authenticity Classification Ratio</h3>
          <p className="text-xs text-slate-400">Proportion of Genuine vs Fake Reviews</p>
        </div>
        <div className="h-64 my-2 relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', borderRadius: '12px', color: '#FFF' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-black text-white">{metrics.fake_vs_genuine.fake_percentage}%</span>
            <span className="text-[10px] uppercase font-bold text-rose-400 tracking-wider">Fake Spam</span>
          </div>
        </div>
        <div className="flex items-center justify-around pt-2 border-t border-slate-800/80 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
            <span className="text-slate-300 font-medium">Genuine ({metrics.fake_vs_genuine.genuine_percentage}%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500"></span>
            <span className="text-slate-300 font-medium">Fake ({metrics.fake_vs_genuine.fake_percentage}%)</span>
          </div>
        </div>
      </div>

      {/* 2. Bar Chart: Sentiment Breakdown */}
      <div className="glass-panel bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-100 mb-1">Sentiment Polarity Breakdown</h3>
          <p className="text-xs text-slate-400">Distribution of Positive, Neutral & Negative Reviews</p>
        </div>
        <div className="h-64 my-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
              <XAxis dataKey="name" stroke="#64748B" fontSize={12} tickLine={false} />
              <YAxis stroke="#64748B" fontSize={12} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', borderRadius: '12px', color: '#FFF' }} />
              <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                {barData.map((entry, index) => (
                  <Cell key={`bar-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="text-center pt-2 border-t border-slate-800/80 text-xs text-slate-400">
          Average Sentiment Score: <strong className="text-indigo-400">+{metrics.average_sentiment_score} Polarity</strong>
        </div>
      </div>

      {/* 3. Line Chart: Weekly Detection Trends */}
      <div className="glass-panel bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-100 mb-1">Weekly Detection Trends</h3>
          <p className="text-xs text-slate-400">Daily volume of Genuine vs Fake Reviews</p>
        </div>
        <div className="h-64 my-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={metrics.weekly_trends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
              <XAxis dataKey="day" stroke="#64748B" fontSize={12} tickLine={false} />
              <YAxis stroke="#64748B" fontSize={12} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', borderRadius: '12px', color: '#FFF' }} />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Line type="monotone" dataKey="genuine" stroke="#10B981" strokeWidth={3} dot={{ r: 4 }} name="Genuine" />
              <Line type="monotone" dataKey="fake" stroke="#F43F5E" strokeWidth={3} dot={{ r: 4 }} name="Fake Spam" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="text-center pt-2 border-t border-slate-800/80 text-xs text-slate-400">
          Spam velocity peaks on <strong className="text-rose-400">Weekends</strong>
        </div>
      </div>
    </div>
  );
};
