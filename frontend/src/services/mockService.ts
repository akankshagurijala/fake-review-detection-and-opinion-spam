import { DashboardMetrics, PredictionResult, BatchReviewItem, ModelInfo, PreprocessResult } from '../types';

export const MOCK_DASHBOARD_METRICS: DashboardMetrics = {
  total_reviews: 12480,
  genuine_reviews: 9840,
  fake_reviews: 2640,
  mismatch_reviews: 890,
  accuracy: 95.8,
  precision: 94.6,
  recall: 96.2,
  f1_score: 95.4,
  roc_auc: 0.984,
  average_sentiment_score: 0.42,
  sentiment_distribution: {
    positive: 7450,
    negative: 3210,
    neutral: 1820
  },
  fake_vs_genuine: {
    fake_percentage: 21.2,
    genuine_percentage: 78.8
  },
  weekly_trends: [
    { day: "Mon", genuine: 1240, fake: 210, mismatch: 65 },
    { day: "Tue", genuine: 1450, fake: 280, mismatch: 82 },
    { day: "Wed", genuine: 1680, fake: 390, mismatch: 110 },
    { day: "Thu", genuine: 1390, fake: 260, mismatch: 74 },
    { day: "Fri", genuine: 1890, fake: 440, mismatch: 145 },
    { day: "Sat", genuine: 2100, fake: 580, mismatch: 190 },
    { day: "Sun", genuine: 1950, fake: 340, mismatch: 95 }
  ]
};

export const MOCK_MODEL_INFO: ModelInfo = {
  architecture: {
    model_name: "BERT-BiLSTM Neural Classifier",
    version: "v1.4.2-prod",
    layers: [
      {
        name: "Input Sequence Layer",
        type: "BERT Tokenizer",
        params: { vocab_size: 30522, max_seq_len: 128 },
        description: "Encodes raw text into contextual WordPiece token IDs."
      },
      {
        name: "Pretrained Transformer Embeddings",
        type: "BERT-base-uncased",
        params: { hidden_size: 768, num_hidden_layers: 12, attention_heads: 12 },
        description: "Generates 768-dim contextual embeddings for semantic understanding."
      },
      {
        name: "BiLSTM Recurrent Layer",
        type: "Bidirectional LSTM",
        params: { input_dim: 768, hidden_dim: 128, num_layers: 2, bidirectional: true },
        description: "Captures forward & backward sequential dependencies across review text."
      },
      {
        name: "Regularization",
        type: "Dropout (p=0.3)",
        params: { rate: 0.3 },
        description: "Prevents neuron co-adaptation and overfitting."
      },
      {
        name: "Dense Layer & Classifier",
        type: "Fully Connected + Softmax",
        params: { in_features: 256, out_features: 2 },
        description: "Produces normalized confidence probabilities for Genuine vs Fake classes."
      }
    ]
  },
  metrics: {
    accuracy: 95.8,
    precision: 94.6,
    recall: 96.2,
    f1_score: 95.4,
    roc_auc: 0.984,
    confusion_matrix: {
      true_genuine: 9450,
      false_fake: 390,
      false_genuine: 370,
      true_fake: 2270
    },
    total_trained_samples: 50000
  }
};

export const SAMPLE_PRESET_BATCH: BatchReviewItem[] = [
  {
    title: "Worst Earbuds - Total Scam!",
    text: "DO NOT BUY! Terrible quality, sound broke on the second day. Battery drains in 10 minutes. Trash garbage product refund my money immediately!!!!!",
    star_rating: 1,
    category: "Electronics",
    predicted_label: "Fake",
    confidence: 97.4,
    fake_probability: 0.974,
    genuine_probability: 0.026,
    sentiment_polarity: -0.85,
    sentiment_label: "Negative",
    subjectivity: 0.9,
    rating_incongruity_score: 12.0,
    is_sentiment_mismatch: false,
    processing_time_ms: 38.2,
    suspicious_phrases: [
      { token: "DO NOT BUY", start: 0, end: 10, weight: 0.88, category: "Spam Pattern", reason: "Aggressive directive phrasing." },
      { token: "!!!!!", start: 137, end: 142, weight: 0.95, category: "Punctuation Abuse", reason: "Excessive exclamation marks." }
    ],
    explanation_summary: "High density of spam template keywords ('garbage', 'refund', 'scam') and excessive exclamations.",
    emotions: { joy: 0.0, anger: 0.92, disappointment: 0.95, trust: 0.05 }
  },
  {
    title: "Outstanding Sound Quality and Comfort",
    text: "I have been using these noise-canceling headphones daily for two weeks. Crisp highs, deep bass, and comfortable fit during long work sessions. Battery lasts around 30 hours as advertised.",
    star_rating: 5,
    category: "Electronics",
    predicted_label: "Genuine",
    confidence: 96.1,
    fake_probability: 0.039,
    genuine_probability: 0.961,
    sentiment_polarity: 0.78,
    sentiment_label: "Positive",
    subjectivity: 0.65,
    rating_incongruity_score: 4.2,
    is_sentiment_mismatch: false,
    processing_time_ms: 41.0,
    suspicious_phrases: [],
    explanation_summary: "Natural linguistic flow, verified purchase profile traits, and consistent high rating-sentiment alignment.",
    emotions: { joy: 0.85, anger: 0.02, disappointment: 0.01, trust: 0.92 }
  },
  {
    title: "AMAZING PRODUCT MUST BUY BEST ITEM EVER 10/10",
    text: "AMAZING PRODUCT BEST ITEM EVER FAST SHIPPING HIGHLY RECOMMEND MUST BUY FREE GIFT 10/10 FIVE STARS!!!!!",
    star_rating: 5,
    category: "Home & Kitchen",
    predicted_label: "Fake",
    confidence: 98.6,
    fake_probability: 0.986,
    genuine_probability: 0.014,
    sentiment_polarity: 0.92,
    sentiment_label: "Positive",
    subjectivity: 0.95,
    rating_incongruity_score: 8.0,
    is_sentiment_mismatch: false,
    processing_time_ms: 32.5,
    suspicious_phrases: [
      { token: "MUST BUY", start: 58, end: 66, weight: 0.92, category: "Incentivized Spam", reason: "Repeated spam phrase." },
      { token: "10/10", start: 78, end: 83, weight: 0.84, category: "Template Copy", reason: "Commercial copy-paste pattern." }
    ],
    explanation_summary: "Extreme ALL CAPS density, repetitive promotional filler phrases, and unverified account pattern.",
    emotions: { joy: 0.90, anger: 0.0, disappointment: 0.0, trust: 0.12 }
  },
  {
    title: "Super fantastic product I love it!",
    text: "This item is super wonderful, I love it so much, best purchase of my life, totally fantastic quality! I am super happy with this!",
    star_rating: 1,
    category: "Beauty & Personal Care",
    predicted_label: "Fake",
    confidence: 94.8,
    fake_probability: 0.948,
    genuine_probability: 0.052,
    sentiment_polarity: 0.88,
    sentiment_label: "Positive",
    subjectivity: 0.85,
    rating_incongruity_score: 88.0,
    is_sentiment_mismatch: true,
    processing_time_ms: 44.1,
    suspicious_phrases: [
      { token: "super wonderful", start: 13, end: 28, weight: 0.91, category: "Rating Mismatch", reason: "Hyper-positive text contradicts 1-star rating." }
    ],
    explanation_summary: "Severe Rating-Sentiment Incongruity: 1-Star rating contradicts overwhelmingly positive text sentiment (+0.88).",
    emotions: { joy: 0.88, anger: 0.0, disappointment: 0.0, trust: 0.08 }
  }
];

export function runLocalNLPPreprocess(rawText: string): PreprocessResult {
  const text = rawText || "";
  const lowercased = text.toLowerCase();
  const no_urls = lowercased.replace(/https?:\/\/\S+|www\.\S+/g, '');
  const cleaned_chars = no_urls.replace(/[^\w\s]/g, '').replace(/\d+/g, '');
  const tokens = cleaned_chars.split(/\s+/).filter(Boolean);
  
  const stopWords = new Set([
    "a","about","above","after","again","all","am","an","and","any","are","as","at","be","because","been",
    "before","being","below","between","both","but","by","could","did","do","does","doing","down","during",
    "each","few","for","from","further","had","has","have","having","he","her","here","hers","herself","him",
    "himself","his","how","i","if","in","into","is","it","its","itself","me","more","most","my","myself","no",
    "nor","not","of","off","on","once","only","or","other","our","ours","ourselves","out","over","own","same",
    "she","should","so","some","such","than","that","the","their","theirs","them","themselves","then","there",
    "these","they","this","those","through","to","too","under","until","up","very","was","we","were","what",
    "when","where","which","while","who","whom","why","with","you","your","yours","yourself"
  ]);

  const tokens_no_stopwords = tokens.filter(t => !stopWords.has(t));
  const lemmatized_tokens = tokens_no_stopwords.map(t => {
    if (t.endsWith("ing") && t.length > 5) return t.slice(0, -3);
    if (t.endsWith("ed") && t.length > 4) return t.slice(0, -2);
    if (t.endsWith("s") && t.length > 3 && !t.endsWith("ss")) return t.slice(0, -1);
    return t;
  });
  
  const final_text = lemmatized_tokens.join(" ");
  
  return {
    raw_text: text,
    lowercased,
    no_urls,
    cleaned_chars,
    tokens,
    tokens_no_stopwords,
    lemmatized_tokens,
    final_text,
    stats: {
      char_count_before: text.length,
      char_count_after: final_text.length,
      token_count_before: tokens.length,
      token_count_after: lemmatized_tokens.length,
      removed_stopwords_count: tokens.length - tokens_no_stopwords.length
    }
  };
}
