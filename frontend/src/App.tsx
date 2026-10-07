import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';

import { DashboardPage } from './pages/DashboardPage';
import { SingleReviewPage } from './pages/SingleReviewPage';
import { BatchUploadPage } from './pages/BatchUploadPage';
import { NLPInspectorPage } from './pages/NLPInspectorPage';
import { ModelPage } from './pages/ModelPage';
import { AdminPage } from './pages/AdminPage';
import { ReportsPage } from './pages/ReportsPage';

export const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  const tabTitles: Record<string, { title: string; subtitle: string }> = {
    dashboard: {
      title: "Opinion Spam & Sentiment Dashboard",
      subtitle: "Real-time analytics on platform review authenticity and sentiment consistency"
    },
    single: {
      title: "Single Review Analyzer",
      subtitle: "Neural fake review detection with BERT + BiLSTM and rating-sentiment mismatch check"
    },
    batch: {
      title: "Batch CSV & Dataset Scanner",
      subtitle: "Bulk scan e-commerce customer reviews or load Amazon/Yelp preset datasets"
    },
    preprocess: {
      title: "NLP Preprocessing Inspector Lab",
      subtitle: "Step-by-step visual text transformation from raw string to BERT token IDs"
    },
    model: {
      title: "BERT + BiLSTM Deep Learning Model",
      subtitle: "Neural network layer architecture, confusion matrix, ROC curves & retraining"
    },
    admin: {
      title: "Admin Moderation Console",
      subtitle: "Role-based access management, review deletion, and model fine-tuning"
    },
    reports: {
      title: "Reports & Analytics Export Center",
      subtitle: "Download CSV audit logs and printable executive PDF summary reports"
    }
  };

  const currentHeader = tabTitles[activeTab] || tabTitles.dashboard;

  return (
    <div className="flex min-h-screen bg-[#0B0F19] text-slate-100 font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar title={currentHeader.title} subtitle={currentHeader.subtitle} />
        
        <main className="flex-1 p-8 overflow-y-auto max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && <DashboardPage />}
          {activeTab === 'single' && <SingleReviewPage />}
          {activeTab === 'batch' && <BatchUploadPage />}
          {activeTab === 'preprocess' && <NLPInspectorPage />}
          {activeTab === 'model' && <ModelPage />}
          {activeTab === 'admin' && <AdminPage />}
          {activeTab === 'reports' && <ReportsPage />}
        </main>
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
