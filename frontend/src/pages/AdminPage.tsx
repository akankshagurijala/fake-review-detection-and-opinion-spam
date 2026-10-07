import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  ShieldAlert, 
  Users, 
  Trash2, 
  RefreshCw, 
  CheckCircle2, 
  Search, 
  AlertTriangle,
  Lock,
  UserCheck
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const { role } = useAuth();
  const [users, setUsers] = useState([
    { id: 1, email: 'admin@ecom-guard.ai', username: 'AdminGuard', role: 'admin', is_active: true },
    { id: 2, email: 'analyst@ecom-guard.ai', username: 'EcomAnalyst', role: 'user', is_active: true },
    { id: 3, email: 'compliance@ecom-guard.ai', username: 'ComplianceOfficer', role: 'user', is_active: true }
  ]);

  const [reviews, setReviews] = useState([
    { id: 101, text: "DO NOT BUY! Terrible quality trash...", rating: 1, label: "Fake", confidence: 97.4 },
    { id: 102, text: "AMAZING PRODUCT BEST ITEM EVER FAST SHIPPING...", rating: 5, label: "Fake", confidence: 98.6 },
    { id: 103, text: "I have been using these noise-canceling headphones daily...", rating: 5, label: "Genuine", confidence: 96.1 }
  ]);

  if (role !== 'admin') {
    return (
      <div className="glass-panel bg-slate-900/40 border border-slate-800 rounded-2xl p-12 text-center max-w-lg mx-auto my-12 space-y-4">
        <Lock className="w-12 h-12 text-amber-400 mx-auto" />
        <h3 className="text-lg font-bold text-white">Admin Access Restricted</h3>
        <p className="text-xs text-slate-400">
          You are currently viewing in standard <strong>User</strong> mode. Switch role to <strong>Admin</strong> using the sidebar button to access management tools.
        </p>
      </div>
    );
  }

  const handleDeleteReview = (id: number) => {
    setReviews(reviews.filter(r => r.id !== id));
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Admin Title Banner */}
      <div className="p-6 bg-gradient-to-r from-rose-950/40 via-slate-900 to-slate-950 border border-rose-500/30 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-rose-500/20 rounded-xl text-rose-400 border border-rose-500/30">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white">System Administration & Moderation Console</h3>
            <p className="text-xs text-slate-400 mt-0.5">Manage platform accounts, moderation logs, and retrain BERT neural weights</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Management Table */}
        <div className="glass-panel bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-400" /> User Accounts ({users.length})
            </h4>
            <span className="text-xs text-slate-400">Role-based Access Control</span>
          </div>

          <div className="divide-y divide-slate-800/80">
            {users.map(u => (
              <div key={u.id} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-slate-200">{u.username}</p>
                  <p className="text-[11px] text-slate-400">{u.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-md font-bold uppercase text-[10px] ${
                    u.role === 'admin' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                  }`}>
                    {u.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delete Reviews Moderation Table */}
        <div className="glass-panel bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <Trash2 className="w-4 h-4 text-rose-400" /> Flagged Reviews Moderation Queue
            </h4>
            <span className="text-xs text-slate-400">Delete / Purge Fake Reviews</span>
          </div>

          <div className="divide-y divide-slate-800/80">
            {reviews.map(r => (
              <div key={r.id} className="py-3 flex items-center justify-between text-xs gap-3">
                <div className="overflow-hidden">
                  <p className="font-bold text-slate-200 truncate">{r.text}</p>
                  <span className="text-[10px] text-rose-400 font-semibold">{r.label} ({r.confidence}%)</span>
                </div>
                <button
                  onClick={() => handleDeleteReview(r.id)}
                  className="p-2 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 rounded-lg transition-all"
                  title="Delete Review"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
