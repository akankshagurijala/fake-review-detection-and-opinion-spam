import re
import string
from typing import Dict, List, Any

# English Stopwords list
STOP_WORDS = {
    "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "aren't",
    "as", "at", "be", "because", "been", "before", "being", "below", "between", "both", "but", "by",
    "can't", "cannot", "could", "couldn't", "did", "didn't", "do", "does", "doesn't", "doing", "don't",
    "down", "during", "each", "few", "for", "from", "further", "had", "hadn't", "has", "hasn't", "have",
    "haven't", "having", "he", "he'd", "he'll", "he's", "her", "here", "here's", "hers", "herself",
    "him", "himself", "his", "how", "how's", "i", "i'd", "i'll", "i'm", "i've", "if", "in", "into",
    "is", "isn't", "it", "it's", "its", "itself", "let's", "me", "more", "most", "mustn't", "my",
    "myself", "no", "nor", "not", "of", "off", "on", "once", "only", "or", "other", "ought", "our",
    "ours", "ourselves", "out", "over", "own", "same", "shan't", "she", "she'd", "she'll", "she's",
    "should", "shouldn't", "so", "some", "such", "than", "that", "that's", "the", "their", "theirs",
    "them", "themselves", "then", "there", "there's", "these", "they", "they'd", "they'll", "they're",
    "they've", "this", "those", "through", "to", "too", "under", "until", "up", "very", "was", "wasn't",
    "we", "we'd", "we'll", "we're", "we've", "were", "weren me", "weren't", "what", "what's", "whatever",
    "when", "when's", "where", "where's", "which", "while", "who", "who's", "whom", "why", "why's",
    "with", "won't", "would", "wouldn't", "you", "you'd", "you'll", "you're", "you've", "your",
    "yours", "yourself", "yourselves"
}

def clean_text_pipeline(raw_text: str) -> Dict[str, Any]:
    """
    Step-by-step NLP Preprocessing pipeline.
    Returns dictionary with raw text and each transformation stage.
    """
    text = raw_text or ""
    
    # 1. Lowercasing
    lowercased = text.lower()
    
    # 2. URL Removal
    no_urls = re.sub(r'https?://\S+|www\.\S+', '', lowercased)
    
    # 3. Emoji & Non-ASCII / Special Character Removal
    # Retain standard alphanumerics and basic space
    cleaned_chars = re.sub(r'[^\w\s]', '', no_urls)
    cleaned_chars = re.sub(r'\d+', '', cleaned_chars)
    
    # 4. Tokenization
    raw_tokens = [t.strip() for t in cleaned_chars.split() if t.strip()]
    
    # 5. Stop-word Removal
    filtered_tokens = [t for t in raw_tokens if t not in STOP_WORDS]
    
    # 6. Simple Rule-based Lemmatization (stemming suffixes for quick execution)
    def lemmatize_token(tok: str) -> str:
        if tok.endswith("ing") and len(tok) > 5:
            return tok[:-3]
        if tok.endswith("ed") and len(tok) > 4:
            return tok[:-2]
        if tok.endswith("es") and len(tok) > 4:
            return tok[:-2]
        if tok.endswith("s") and len(tok) > 3 and not tok.endswith("ss"):
            return tok[:-1]
        return tok

    lemmatized_tokens = [lemmatize_token(t) for t in filtered_tokens]
    final_processed_text = " ".join(lemmatized_tokens)
    
    return {
        "raw_text": raw_text,
        "lowercased": lowercased,
        "no_urls": no_urls,
        "cleaned_chars": cleaned_chars,
        "tokens": raw_tokens,
        "tokens_no_stopwords": filtered_tokens,
        "lemmatized_tokens": lemmatized_tokens,
        "final_text": final_processed_text,
        "stats": {
            "char_count_before": len(raw_text),
            "char_count_after": len(final_processed_text),
            "token_count_before": len(raw_text.split()),
            "token_count_after": len(lemmatized_tokens),
            "removed_stopwords_count": len(raw_tokens) - len(filtered_tokens)
        }
    }
