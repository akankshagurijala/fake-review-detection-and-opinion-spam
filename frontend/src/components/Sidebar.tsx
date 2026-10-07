import React from 'react';
import { 
  LayoutDashboard, 
  SearchCheck, 
  UploadCloud, 
  FileCode2, 
  Cpu, 
  ShieldAlert, 
  FileSpreadsheet,
  BrainCircuit,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { user, role, toggleRole } = useAuth();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'single', label: 'Single Review Analyzer', icon: SearchCheck },
    { id: 'batch', label: 'Batch CSV & Datasets', icon: UploadCloud },
    { id: 'preprocess', label: 'NLP Preprocessor', icon: FileCode2 },
    { id: 'model', label: 'BERT + BiLSTM Model', icon: Cpu },
    ...(role === 'admin' ? [{ id: 'admin', label: 'Admin Management', icon: ShieldAlert }] : []),
    { id: 'reports', label: 'Reports & Export', icon: FileSpreadsheet },
  ];

  return (
    <aside className="w-64 bg-[#0F172A]/90 border-r border-slate-800/80 flex flex-col justify-between p-4 min-h-screen">
      <div>
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-3 py-4 mb-6 border-b border-slate-800">
          <div className="p-2.5 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-xl shadow-lg shadow-indigo-500/25">
            <BrainCircuit className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-extrabold text-sm tracking-tight text-slate-100 leading-tight">
              Sentiment Aware Detector
            </h1>
            <p className="text-[11px] font-medium text-indigo-400">
              BERT + BiLSTM Detector
            </p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600/90 to-indigo-700/80 text-white shadow-lg shadow-indigo-500/20 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Role Switcher & User Profile */}
      <div className="pt-4 border-t border-slate-800/80 space-y-3">
        <button
          onClick={toggleRole}
          className="w-full flex items-center justify-between px-3 py-2 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 rounded-xl text-xs font-semibold text-slate-300 transition-all"
        >
          <div className="flex items-center gap-2">
            {role === 'admin' ? (
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            ) : (
              <UserCheck className="w-4 h-4 text-indigo-400" />
            )}
            <span>Role: <strong className="capitalize text-white">{role}</strong></span>
          </div>
          <span className="text-[10px] text-indigo-400 underline font-bold">Switch</span>
        </button>

        <div className="flex items-center gap-3 px-2 py-1">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white text-xs">
            {user?.username.slice(0, 2).toUpperCase() || 'US'}
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-semibold text-slate-200 truncate">{user?.username || 'Analyst'}</p>
            <p className="text-[10px] text-slate-400 truncate">{user?.email || 'admin@ecom-guard.ai'}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
