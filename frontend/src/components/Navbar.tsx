import React from 'react';
import { Moon, Sun, Activity, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  title: string;
  subtitle: string;
}

export const Navbar: React.FC<NavbarProps> = ({ title, subtitle }) => {
  const { theme, toggleTheme } = useAuth();

  return (
    <header className="h-20 bg-[#0F172A]/70 backdrop-blur-md border-b border-slate-800/80 px-8 flex items-center justify-between sticky top-0 z-30">
      <div>
        <h2 className="text-xl font-extrabold text-slate-100 tracking-tight flex items-center gap-2">
          {title}
        </h2>
        <p className="text-xs text-slate-400 font-medium mt-0.5">{subtitle}</p>
      </div>

      <div className="flex items-center gap-4">
        {/* Model Status Badge */}
        <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
            BERT-BiLSTM Model Active <CheckCircle2 className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Live Metrics Ticker */}
        <div className="hidden lg:flex items-center gap-3 px-4 py-1.5 bg-slate-800/80 border border-slate-700/60 rounded-xl text-xs">
          <Activity className="w-4 h-4 text-indigo-400" />
          <span className="text-slate-300 font-medium">Accuracy: <strong className="text-emerald-400">95.8%</strong></span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300 font-medium">F1-Score: <strong className="text-indigo-400">95.4%</strong></span>
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 text-slate-300 transition-all"
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
        </button>
      </div>
    </header>
  );
};
