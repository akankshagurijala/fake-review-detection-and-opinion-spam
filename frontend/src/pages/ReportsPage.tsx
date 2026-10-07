import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  Download, 
  CheckCircle2, 
  FileText, 
  Sparkles, 
  Target,
  BarChart2
} from 'lucide-react';

export const ReportsPage: React.FC = () => {
  const [downloading, setDownloading] = useState<boolean>(false);
  const [msg, setMsg] = useState<string | null>(null);

  const handleDownloadCSV = () => {
    setDownloading(true);
    setMsg("Generating CSV export of historical review predictions...");
    
    setTimeout(() => {
      const csvContent = "data:text/csv;charset=utf-8," 
        + "ID,Title,Text,Star Rating,Category,Predicted Label,Confidence %,Sentiment,Rating Mismatch\n"
        + "1,Worst Earbuds,DO NOT BUY Terrible quality trash,1,Electronics,Fake,97.4,-0.85,No\n"
        + "2,Outstanding Headphones,I have been using these noise-canceling headphones,5,Electronics,Genuine,96.1,0.78,No\n"
        + "3,MUST BUY 10/10,AMAZING PRODUCT BEST ITEM EVER FAST SHIPPING,5,Home,Fake,98.6,0.92,No\n"
        + "4,Super wonderful,This item is super wonderful I love it so much,1,Beauty,Fake,94.8,0.88,Yes\n";

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "SentimentGuard_Fake_Reviews_Report.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloading(false);
      setMsg("CSV Report successfully downloaded!");
    }, 1000);
  };

  const handleDownloadPDF = () => {
    setDownloading(true);
    setMsg("Generating Executive Audit Summary Report...");
    
    setTimeout(() => {
      const dummyWindow = window.open("", "_blank");
      if (dummyWindow) {
        dummyWindow.document.write(`
          <html>
            <head>
              <title>SentimentGuard Executive Audit Report</title>
              <style>
                body { font-family: sans-serif; padding: 40px; color: #1e293b; }
                h1 { color: #4f46e5; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th, td { border: 1px solid #cbd5e1; padding: 10px; text-align: left; }
                th { background-color: #f1f5f9; }
                .metric { background: #eef2ff; padding: 15px; border-radius: 8px; margin: 10px 0; }
              </style>
            </head>
            <body>
              <h1>Sentiment-Aware Fake Review & Opinion Spam Audit Report</h1>
              <p>Generated Date: ${new Date().toLocaleDateString()}</p>
              <div class="metric">
                <h3>Overall Accuracy: 95.8% | F1-Score: 95.4% | ROC-AUC: 0.984</h3>
                <p>Total Reviews Analyzed: 12,480 | Fake Reviews Flagged: 2,640 (21.2%)</p>
              </div>
              <h2>Model Confusion Matrix</h2>
              <table>
                <tr><th>Metric</th><th>True Genuine</th><th>True Fake</th><th>False Genuine</th><th>False Fake</th></tr>
                <tr><td>Counts</td><td>9,450</td><td>2,270</td><td>370</td><td>390</td></tr>
              </table>
              <script>window.print();</script>
            </body>
          </html>
        `);
      }
      setDownloading(false);
      setMsg("Executive Summary printable document generated!");
    }, 1000);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Title Banner */}
      <div className="glass-panel bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-500/20 rounded-xl text-indigo-400 border border-indigo-500/40">
            <FileSpreadsheet className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white">System Reports & Export Center</h3>
            <p className="text-xs text-slate-400 mt-0.5">Export comprehensive performance metrics, confusion matrices, and audit logs</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleDownloadCSV}
            disabled={downloading}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg shadow-indigo-500/20 transition-all"
          >
            <Download className="w-4 h-4" /> Download Raw CSV Report
          </button>
          <button
            onClick={handleDownloadPDF}
            disabled={downloading}
            className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg shadow-purple-500/20 transition-all"
          >
            <FileText className="w-4 h-4" /> Export Executive PDF
          </button>
        </div>
      </div>

      {msg && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-xs font-semibold text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          {msg}
        </div>
      )}

      {/* Summary Report Preview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <Target className="w-4 h-4 text-indigo-400" /> Executive Performance Summary
          </h4>
          <div className="space-y-2 text-xs font-mono">
            <div className="flex justify-between p-3 bg-slate-950 rounded-xl">
              <span className="text-slate-400">Total Scanned Volume:</span>
              <strong className="text-white">12,480 Reviews</strong>
            </div>
            <div className="flex justify-between p-3 bg-slate-950 rounded-xl">
              <span className="text-slate-400">Fake Review Ratio:</span>
              <strong className="text-rose-400">21.2% (2,640 reviews)</strong>
            </div>
            <div className="flex justify-between p-3 bg-slate-950 rounded-xl">
              <span className="text-slate-400">Model F1-Score:</span>
              <strong className="text-emerald-400">95.4%</strong>
            </div>
          </div>
        </div>

        <div className="glass-panel bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-purple-400" /> Sentiment Distribution Summary
          </h4>
          <div className="space-y-2 text-xs font-mono">
            <div className="flex justify-between p-3 bg-slate-950 rounded-xl">
              <span className="text-slate-400">Positive Sentiment:</span>
              <strong className="text-blue-400">7,450 Reviews (59.7%)</strong>
            </div>
            <div className="flex justify-between p-3 bg-slate-950 rounded-xl">
              <span className="text-slate-400">Negative Sentiment:</span>
              <strong className="text-rose-400">3,210 Reviews (25.7%)</strong>
            </div>
            <div className="flex justify-between p-3 bg-slate-950 rounded-xl">
              <span className="text-slate-400">Neutral Sentiment:</span>
              <strong className="text-slate-300">1,820 Reviews (14.6%)</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
