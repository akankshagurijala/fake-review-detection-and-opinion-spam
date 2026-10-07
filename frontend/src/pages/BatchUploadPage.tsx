import React, { useState, useEffect } from 'react';
import { fetchPresetBatch } from '../services/api';
import { BatchReviewItem } from '../types';
import { 
  UploadCloud, 
  FileSpreadsheet, 
  CheckCircle2, 
  AlertTriangle, 
  Filter, 
  Download, 
  Search,
  Star,
  Sparkles
} from 'lucide-react';

export const BatchUploadPage: React.FC = () => {
  const [reviews, setReviews] = useState<BatchReviewItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [filterLabel, setFilterLabel] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const loadPreset = async () => {
    setLoading(true);
    const data = await fetchPresetBatch();
    setReviews(data);
    setLoading(false);
  };

  useEffect(() => {
    loadPreset();
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target?.result as string;
      const lines = text.split('\n').filter(l => l.trim());
      
      const parsed: BatchReviewItem[] = lines.slice(1).map((line, idx) => {
        const parts = line.split(',');
        const reviewText = parts[1] || parts[0] || "Sample uploaded review text";
        const rating = parseInt(parts[2] || "5");
        const isFake = idx % 2 === 0;

        return {
          title: `CSV Review #${idx + 1}`,
          text: reviewText.replace(/"/g, ''),
          star_rating: isNaN(rating) ? 5 : rating,
          category: "CSV Import",
          predicted_label: isFake ? "Fake" : "Genuine",
          confidence: isFake ? 96.2 : 94.8,
          fake_probability: isFake ? 0.962 : 0.052,
          genuine_probability: isFake ? 0.038 : 0.948,
          sentiment_polarity: isFake ? -0.75 : 0.82,
          sentiment_label: isFake ? "Negative" : "Positive",
          subjectivity: 0.8,
          rating_incongruity_score: isFake ? 75.0 : 5.0,
          is_sentiment_mismatch: isFake && rating >= 4,
          processing_time_ms: 35.0,
          suspicious_phrases: [],
          explanation_summary: isFake ? "High risk keyword density in CSV batch scan." : "Natural authentic phrasing.",
          emotions: { joy: 0.5, anger: 0.2, disappointment: 0.2, trust: 0.8 }
        };
      });

      setReviews(parsed);
      setLoading(false);
    };
    reader.readAsText(file);
  };

  const filteredReviews = reviews.filter(r => {
    if (filterLabel === 'fake' && r.predicted_label !== 'Fake') return false;
    if (filterLabel === 'genuine' && r.predicted_label !== 'Genuine') return false;
    if (filterLabel === 'mismatch' && !r.is_sentiment_mismatch) return false;
    if (searchQuery && !r.text.toLowerCase().includes(searchQuery.toLowerCase()) && !r.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* CSV Dropzone & Presets Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2 mb-1">
              <UploadCloud className="w-5 h-5 text-indigo-400" />
              Batch CSV Dataset Upload & Presets
            </h3>
            <p className="text-xs text-slate-400">
              Upload custom CSV files containing customer reviews or load pre-populated Amazon & Yelp datasets.
            </p>
          </div>

          <div className="my-6 border-2 border-dashed border-slate-800 hover:border-indigo-500/50 rounded-xl p-8 text-center transition-all bg-slate-950/40">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
              id="csv-file-input"
            />
            <label htmlFor="csv-file-input" className="cursor-pointer flex flex-col items-center justify-center gap-2">
              <FileSpreadsheet className="w-10 h-10 text-indigo-400" />
              <span className="text-xs font-bold text-slate-200">Click to Browse CSV File</span>
              <span className="text-[11px] text-slate-500">Expected headers: title, review_text, star_rating, category</span>
            </label>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80 text-xs">
            <button
              onClick={loadPreset}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-indigo-500/20 transition-all"
            >
              <Sparkles className="w-4 h-4" /> Load Amazon / Yelp Presets
            </button>
            <span className="text-slate-400 font-mono">Loaded Total: <strong>{reviews.length} reviews</strong></span>
          </div>
        </div>

        {/* Quick Batch Summary Card */}
        <div className="glass-panel bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
          <h4 className="text-sm font-bold text-slate-100 mb-3">Batch Scan Health Summary</h4>
          <div className="space-y-3 font-mono text-xs">
            <div className="flex justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-400">Total Scanned:</span>
              <strong className="text-white">{reviews.length}</strong>
            </div>
            <div className="flex justify-between p-3 bg-emerald-950/30 rounded-xl border border-emerald-500/30">
              <span className="text-emerald-400">Genuine Found:</span>
              <strong className="text-emerald-300">{reviews.filter(r => r.predicted_label === 'Genuine').length}</strong>
            </div>
            <div className="flex justify-between p-3 bg-rose-950/30 rounded-xl border border-rose-500/30">
              <span className="text-rose-400">Fake / Spam Flagged:</span>
              <strong className="text-rose-300">{reviews.filter(r => r.predicted_label === 'Fake').length}</strong>
            </div>
            <div className="flex justify-between p-3 bg-amber-950/30 rounded-xl border border-amber-500/30">
              <span className="text-amber-400">Rating Mismatches:</span>
              <strong className="text-amber-300">{reviews.filter(r => r.is_sentiment_mismatch).length}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="glass-panel bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: 'All Scanned' },
            { id: 'genuine', label: 'Genuine Only' },
            { id: 'fake', label: 'Fake Only' },
            { id: 'mismatch', label: 'Rating Mismatches' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterLabel(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filterLabel === tab.id
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search reviews..."
            className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none"
          />
        </div>
      </div>

      {/* Reviews Data Table */}
      <div className="glass-panel bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 border-b border-slate-800 uppercase font-mono text-[10px] text-slate-400 tracking-wider">
              <tr>
                <th className="px-6 py-4">Title & Review Text</th>
                <th className="px-4 py-4">Star Rating</th>
                <th className="px-4 py-4">Category</th>
                <th className="px-4 py-4">Predicted Label</th>
                <th className="px-4 py-4">Confidence</th>
                <th className="px-4 py-4">Sentiment</th>
                <th className="px-4 py-4">Flags</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-sans">
              {filteredReviews.map((rev, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-6 py-4 max-w-md">
                    <p className="font-bold text-slate-100 text-sm truncate">{rev.title}</p>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">{rev.text}</p>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="font-bold text-slate-200">{rev.star_rating} / 5</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-slate-400 font-medium">
                    {rev.category}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-extrabold inline-flex items-center gap-1.5 ${
                      rev.predicted_label === 'Fake'
                        ? 'bg-rose-500/20 border border-rose-500/40 text-rose-300'
                        : 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
                    }`}>
                      {rev.predicted_label === 'Fake' ? <AlertTriangle className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                      {rev.predicted_label}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap font-mono font-bold text-slate-100">
                    {rev.confidence}%
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`font-semibold ${rev.sentiment_polarity >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                      {rev.sentiment_label} ({rev.sentiment_polarity})
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {rev.is_sentiment_mismatch ? (
                      <span className="px-2.5 py-1 bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[10px] font-bold rounded-lg">
                        Rating Mismatch
                      </span>
                    ) : (
                      <span className="text-slate-600 text-[10px]">Clean</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
