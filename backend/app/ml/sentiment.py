import re
from typing import Dict, Any

# Lexicons for high precision sentiment evaluation
POSITIVE_LEXICON = {
    "excellent", "amazing", "great", "awesome", "fantastic", "love", "loved", "perfect",
    "best", "outstanding", "superb", "brilliant", "wonderful", "top-notch", "impressed",
    "durable", "sturdy", "fast", "smooth", "flawless", "highly", "recommend", "satisfied",
    "quality", "beautiful", "good", "nice", "easy", "happy", "liked", "bargain", "valuable"
}

NEGATIVE_LEXICON = {
    "terrible", "horrible", "awful", "bad", "worst", "poor", "hate", "hated", "useless",
    "broken", "defective", "waste", "cheap", "scam", "disappointed", "disappointing",
    "fake", "refund", "returned", "return", "slow", "fragile", "broke", "garbage", "trash",
    "regret", "failure", "damaged", "wrong", "overpriced", "fraud", "unacceptable", "died"
}

INTENSIFIERS = {"very", "extremely", "super", "highly", "absolutely", "totally", "100%", "really", "so"}
NEGATIONS = {"not", "no", "never", "n't", "don't", "didn't", "doesn't", "won't", "can't", "hardly"}

def analyze_sentiment_and_incongruity(text: str, star_rating: int = 5) -> Dict[str, Any]:
    """
    Computes polarity (-1 to 1), subjectivity (0 to 1), emotion breakdowns,
    and checks for Rating-Sentiment Incongruity.
    """
    words = re.findall(r'\b\w+\b', (text or "").lower())
    if not words:
        return {
            "polarity": 0.0,
            "sentiment_label": "Neutral",
            "subjectivity": 0.5,
            "rating_incongruity_score": 0.0,
            "is_mismatch": False,
            "mismatch_reason": None,
            "emotions": {"joy": 0.2, "anger": 0.0, "disappointment": 0.0, "trust": 0.5}
        }
    
    pos_score = 0
    neg_score = 0
    subj_score = 0
    
    for i, word in enumerate(words):
        is_negated = False
        if i > 0 and words[i-1] in NEGATIONS:
            is_negated = True
        
        is_intensified = False
        if i > 0 and words[i-1] in INTENSIFIERS:
            is_intensified = True
            
        weight = 1.5 if is_intensified else 1.0
        
        if word in POSITIVE_LEXICON:
            subj_score += 1
            if is_negated:
                neg_score += weight
            else:
                pos_score += weight
        elif word in NEGATIVE_LEXICON:
            subj_score += 1
            if is_negated:
                pos_score += weight
            else:
                neg_score += weight

    total = pos_score + neg_score
    if total == 0:
        polarity = 0.0
    else:
        polarity = (pos_score - neg_score) / (pos_score + neg_score)
        
    # Standardize Polarity bounds
    polarity = max(-1.0, min(1.0, polarity))
    
    # Subjectivity: ratio of opinion words
    subjectivity = round(min(1.0, (subj_score * 2) / len(words)), 2)
    if subjectivity == 0:
        subjectivity = 0.35
        
    # Sentiment Label
    if polarity > 0.15:
        sentiment_label = "Positive"
    elif polarity < -0.15:
        sentiment_label = "Negative"
    else:
        sentiment_label = "Neutral"

    # Rating Incongruity Index Calculation
    # Star rating normalized: 1-star -> -1.0, 3-star -> 0.0, 5-star -> +1.0
    expected_polarity = (star_rating - 3) / 2.0  # Maps 1..5 to -1.0..+1.0
    
    incongruity_gap = abs(expected_polarity - polarity)
    incongruity_score = round(min(100.0, (incongruity_gap / 2.0) * 100), 1)
    
    is_mismatch = False
    mismatch_reason = None
    
    if star_rating >= 4 and polarity < -0.2:
        is_mismatch = True
        mismatch_reason = f"High Star Rating ({star_rating} Stars) conflicts with strongly Negative Text Sentiment ({round(polarity, 2)})."
    elif star_rating <= 2 and polarity > 0.3:
        is_mismatch = True
        mismatch_reason = f"Low Star Rating ({star_rating} Stars) conflicts with strongly Positive Text Sentiment (+{round(polarity, 2)})."
        
    # Emotion scores calculation
    joy = round(max(0.0, polarity if polarity > 0 else 0.1), 2)
    anger = round(max(0.0, -polarity if polarity < 0 and "hate" in words else 0.05), 2)
    disappointment = round(max(0.0, -polarity if polarity < 0 else 0.05), 2)
    trust = round(0.8 - (0.4 * (incongruity_score / 100.0)), 2)

    return {
        "polarity": round(polarity, 2),
        "sentiment_label": sentiment_label,
        "subjectivity": subjectivity,
        "rating_incongruity_score": incongruity_score,
        "is_mismatch": is_mismatch,
        "mismatch_reason": mismatch_reason,
        "emotions": {
            "joy": joy,
            "anger": anger,
            "disappointment": disappointment,
            "trust": trust
        }
    }
