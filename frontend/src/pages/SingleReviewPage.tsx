import React, { useState } from 'react';
import { predictReview } from '../services/api';
import { PredictionResult } from '../types';
import { HighlightedText } from '../components/HighlightedText';
import { NLPVisualizer } from '../components/NLPVisualizer';
import { 
  Star, 
  Send, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  BrainCircuit, 
  FileCode2,
  ThumbsUp,
  ThumbsDown,
  Info
} from 'lucide-react';

export const SingleReviewPage: React.FC = () => {
  const [reviewText, setReviewText] = useState<string>(
    "DO NOT BUY! Terrible quality, sound broke on the second day. Battery drains in 10 minutes. Trash garbage product refund my money immediately!!!!!"
  );
  const [starRating, setStarRating] = useState<number>(1);
  const [category, setCategory] = useState<string>("Electronics");
  const [accountAge, setAccountAge] = useState<number>(14);
  const [isVerified, setIsVerified] = useState<boolean>(false);

  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim()) return;

    setLoading(true);
    const pred = await predictReview(reviewText, starRating, category, accountAge, isVerified);
    setResult(pred);
    setLoading(false);
  };

  const samplePresets = [
    {
      label: "Fake: Bot Spam",
      rating: 5,
      verified: false,
      text: "AMAZING PRODUCT BEST ITEM EVER FAST SHIPPING HIGHLY RECOMMEND MUST BUY FREE GIFT 10/10 FIVE STARS!!!!!"
    },
    {
      label: "Fake: Rating Mismatch",
      rating: 1,
      verified: false,
      text: "This item is super wonderful, I love it so much, best purchase of my life, totally fantastic quality! I am super happy with this!"
    },
    {
      label: "Genuine Review",
      rating: 5,
      verified: true,
      text: "I have been using these noise-canceling headphones daily for two weeks. Crisp highs, deep bass, and comfortable fit during long work sessions. Battery lasts around 30 hours as advertised."
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Top Presets Quick Load */}
      <div className="flex flex-wrap items-center gap-3 p-4 bg-slate-900/60 border border-slate-800 rounded-2xl">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          Test Presets:
        </span>
        {samplePresets.map((preset, idx) => (
          <button
            key={idx}
            onClick={() => {
              setReviewText(preset.text);
              setStarRating(preset.rating);
              setIsVerified(preset.verified);
            }}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700/70 rounded-xl text-xs font-semibold text-slate-200 transition-all"
          >
            {preset.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form Input Workspace */}
        <div className="lg:col-span-6 space-y-6">
          <form onSubmit={handleAnalyze} className="glass-panel bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-5">
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-indigo-400" />
              Review Text Analysis Workspace
            </h3>

            {/* Review Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wide">
                Customer Review Text
              </label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                rows={5}
                placeholder="Paste or type customer review text..."
                className="w-full bg-slate-950/80 border border-slate-800 focus:border-indigo-500 rounded-xl p-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-sans leading-relaxed"
              />
            </div>

            {/* Star Rating & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wide">
                  Assigned Star Rating
                </label>
                <div className="flex items-center gap-1.5 p-2.5 bg-slate-950/80 border border-slate-800 rounded-xl justify-around">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setStarRating(star)}
                      className="p-1 transition-transform hover:scale-125"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= starRating ? 'text-amber-400 fill-amber-400' : 'text-slate-700'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wide">
                  Product Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-sm text-slate-200 focus:outline-none"
                >
                  <option value="Electronics">Electronics & Tech</option>
                  <option value="Home & Kitchen">Home & Kitchen</option>
                  <option value="Beauty & Personal Care">Beauty & Personal Care</option>
                  <option value="Fashion">Fashion & Clothing</option>
                  <option value="Restaurants (Yelp)">Restaurants (Yelp)</option>
                </select>
              </div>
            </div>

            {/* Account Metadata Settings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800/80">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400">Account Age (Days)</label>
                <input
                  type="number"
                  value={accountAge}
                  onChange={(e) => setAccountAge(Number(e.target.value))}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200"
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-950/80 border border-slate-800 rounded-xl mt-4">
                <span className="text-xs font-semibold text-slate-300">Verified Purchase</span>
                <input
                  type="checkbox"
                  checked={isVerified}
                  onChange={(e) => setIsVerified(e.target.checked)}
                  className="w-4 h-4 accent-indigo-500 rounded cursor-pointer"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !reviewText.trim()}
              className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Clock className="w-4 h-4 animate-spin" /> Analyzing with BERT + BiLSTM...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" /> Execute Neural Fake Review Analysis
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Deep Learning Prediction Output */}
        <div className="lg:col-span-6 space-y-6">
          {!result && !loading && (
            <div className="glass-panel bg-slate-900/40 border border-slate-800/80 rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[420px]">
              <BrainCircuit className="w-12 h-12 text-slate-600 mb-3 animate-pulse" />
              <h4 className="text-base font-bold text-slate-300">Ready for Detection</h4>
              <p className="text-xs text-slate-500 max-w-sm mt-1">
                Enter review text and click execute to view contextual BERT embeddings, rating-sentiment incongruity scores, and probability breakdown.
              </p>
            </div>
          )}

          {result && (
            <div className="space-y-6">
              {/* Classification Outcome Card */}
              <div className={`glass-panel rounded-2xl p-6 border shadow-2xl relative overflow-hidden ${
                result.predicted_label === 'Fake'
                  ? 'bg-gradient-to-br from-rose-950/60 via-slate-900 to-slate-950 border-rose-500/40 glow-rose'
                  : 'bg-gradient-to-br from-emerald-950/60 via-slate-900 to-slate-950 border-emerald-500/40 glow-emerald'
              }`}>
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                  <div className="flex items-center gap-3">
                    {result.predicted_label === 'Fake' ? (
                      <div className="p-3 bg-rose-500/20 rounded-xl text-rose-400 border border-rose-500/30">
                        <AlertTriangle className="w-7 h-7" />
                      </div>
                    ) : (
                      <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-400 border border-emerald-500/30">
                        <CheckCircle2 className="w-7 h-7" />
                      </div>
                    )}
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Prediction Outcome</span>
                      <h3 className={`text-2xl font-black ${result.predicted_label === 'Fake' ? 'text-rose-400' : 'text-emerald-400'}`}>
                        {result.predicted_label === 'Fake' ? 'Fake / Opinion Spam' : 'Genuine Customer Review'}
                      </h3>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-slate-400 font-medium">Confidence Score</span>
                    <p className="text-2xl font-black text-white">{result.confidence}%</p>
                  </div>
                </div>

                {/* Rating Mismatch Alert Banner */}
                {result.is_sentiment_mismatch && (
                  <div className="mt-4 p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-bold text-rose-300">Rating-Sentiment Incongruity Flagged!</h5>
                      <p className="text-xs text-rose-200/80 mt-0.5">{result.explanation_summary}</p>
                    </div>
                  </div>
                )}

                {/* Probabilities Meter Bar */}
                <div className="mt-5 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                    <span>Genuine Probability ({Math.round(result.genuine_probability * 100)}%)</span>
                    <span>Fake Probability ({Math.round(result.fake_probability * 100)}%)</span>
                  </div>
                  <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden flex border border-slate-800">
                    <div className="bg-emerald-500 transition-all duration-500" style={{ width: `${result.genuine_probability * 100}%` }} />
                    <div className="bg-rose-500 transition-all duration-500" style={{ width: `${result.fake_probability * 100}%` }} />
                  </div>
                </div>

                {/* Execution Stats Footer */}
                <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>Sentiment Polarity: <strong className={result.sentiment_polarity >= 0 ? "text-emerald-400" : "text-rose-400"}>{result.sentiment_polarity} ({result.sentiment_label})</strong></span>
                  <span>Processing Time: <strong className="text-indigo-400">{result.processing_time_ms} ms</strong></span>
                </div>
              </div>

              {/* Suspicious Phrases & Explainability */}
              <div className="glass-panel bg-slate-900/70 border border-slate-800 rounded-2xl p-6">
                <h4 className="text-sm font-bold text-slate-100 mb-3 flex items-center gap-2">
                  <Info className="w-4 h-4 text-indigo-400" />
                  Explainable AI (XAI) Token Attribution
                </h4>
                <HighlightedText text={reviewText} suspiciousPhrases={result.suspicious_phrases} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Full Preprocessing Visualizer Output */}
      {result && result.nlp_preprocessing && (
        <NLPVisualizer data={result.nlp_preprocessing} />
      )}
    </div>
  );
};
