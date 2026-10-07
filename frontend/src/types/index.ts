export type UserRole = 'admin' | 'user';

export interface User {
  id: number;
  email: string;
  username: string;
  role: UserRole;
}

export interface SuspiciousFeature {
  token: string;
  start: number;
  end: number;
  weight: number;
  category: string;
  reason: string;
}

export interface Emotions {
  joy: number;
  anger: number;
  disappointment: number;
  trust: number;
}

export interface PreprocessStats {
  char_count_before: number;
  char_count_after: number;
  token_count_before: number;
  token_count_after: number;
  removed_stopwords_count: number;
}

export interface PreprocessResult {
  raw_text: string;
  lowercased: string;
  no_urls: string;
  cleaned_chars: string;
  tokens: string[];
  tokens_no_stopwords: string[];
  lemmatized_tokens: string[];
  final_text: string;
  stats: PreprocessStats;
}

export interface PredictionResult {
  id?: number;
  predicted_label: 'Genuine' | 'Fake';
  confidence: number;
  fake_probability: number;
  genuine_probability: number;
  sentiment_polarity: number;
  sentiment_label: 'Positive' | 'Negative' | 'Neutral';
  subjectivity: number;
  rating_incongruity_score: number;
  is_sentiment_mismatch: boolean;
  processing_time_ms: number;
  suspicious_phrases: SuspiciousFeature[];
  explanation_summary: string;
  emotions: Emotions;
  nlp_preprocessing?: PreprocessResult;
}

export interface BatchReviewItem extends PredictionResult {
  title: string;
  text: string;
  star_rating: number;
  category: string;
}

export interface DashboardMetrics {
  total_reviews: number;
  genuine_reviews: number;
  fake_reviews: number;
  mismatch_reviews: number;
  accuracy: number;
  precision: number;
  recall: number;
  f1_score: number;
  roc_auc: number;
  average_sentiment_score: number;
  sentiment_distribution: {
    positive: number;
    negative: number;
    neutral: number;
  };
  fake_vs_genuine: {
    fake_percentage: number;
    genuine_percentage: number;
  };
  weekly_trends: {
    day: string;
    genuine: number;
    fake: number;
    mismatch: number;
  }[];
}

export interface ArchitectureLayer {
  name: string;
  type: string;
  params: Record<string, any>;
  description: string;
}

export interface ModelInfo {
  architecture: {
    model_name: string;
    version: string;
    layers: ArchitectureLayer[];
  };
  metrics: {
    accuracy: number;
    precision: number;
    recall: number;
    f1_score: number;
    roc_auc: number;
    confusion_matrix: {
      true_genuine: number;
      false_fake: number;
      false_genuine: number;
      true_fake: number;
    };
    total_trained_samples: number;
  };
}
