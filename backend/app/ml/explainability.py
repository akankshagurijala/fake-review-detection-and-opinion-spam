import re
from typing import List, Dict, Any

SPAM_KEYWORDS = {
    "must buy", "best product ever", "10/10", "highly recommend", "fast shipping",
    "dont buy", "scam product", "fake item", "buy elsewhere", "money back",
    "received for free", "incentivized", "five stars", "1 star", "worst item",
    "amazingly great", "seller refund", "terrible scam", "trash garbage"
}

HIGH_RISK_TOKENS = {
    "scam", "fake", "terrible", "worst", "garbage", "trash", "broken", "refund",
    "overpriced", "10/10", "bargain", "free", "discounted", "must", "hated", "useless"
}

def extract_suspicious_features(text: str, star_rating: int, is_mismatch: bool) -> List[Dict[str, Any]]:
    """
    Highlights suspicious tokens/phrases with weight score & flag category.
    """
    text_lower = (text or "").lower()
    highlights = []
    
    # 1. Punctuation abuse checking (e.g. '!!!', '???')
    exclamation_matches = re.finditer(r'!{2,}', text)
    for match in exclamation_matches:
        highlights.append({
            "token": match.group(0),
            "start": match.start(),
            "end": match.end(),
            "weight": 0.85,
            "category": "Punctuation Abuse",
            "reason": "Excessive exclamation marks indicate potential bot template or emotionally manipulative spam."
        })
        
    # 2. ALL CAPS words checking
    caps_matches = re.finditer(r'\b[A-Z]{3,}\b', text)
    for match in caps_matches:
        highlights.append({
            "token": match.group(0),
            "start": match.start(),
            "end": match.end(),
            "weight": 0.75,
            "category": "Hyperbolic Intensity",
            "reason": "Excessive uppercase lettering used in incentive/spam copy."
        })
        
    # 3. Known spam phrases
    for phrase in SPAM_KEYWORDS:
        if phrase in text_lower:
            start_idx = text_lower.find(phrase)
            highlights.append({
                "token": text[start_idx:start_idx+len(phrase)],
                "start": start_idx,
                "end": start_idx + len(phrase),
                "weight": 0.92,
                "category": "Spam Template Keyword",
                "reason": f"Phrase '{phrase}' matches known incentive or copy-paste opinion spam lexicon."
            })
            
    # 4. Individual high-risk words
    words = re.finditer(r'\b[a-zA-Z0-9_-]+\b', text)
    for w in words:
        word_str = w.group(0).lower()
        if word_str in HIGH_RISK_TOKENS:
            # Avoid duplicate ranges
            if not any(h["start"] <= w.start() and h["end"] >= w.end() for h in highlights):
                highlights.append({
                    "token": w.group(0),
                    "start": w.start(),
                    "end": w.end(),
                    "weight": 0.68,
                    "category": "Sentiment Anomaly Keyword",
                    "reason": f"High risk polarity token '{w.group(0)}' detected."
                })
                
    # Sort highlights by position
    highlights.sort(key=lambda x: x["start"])
    return highlights
