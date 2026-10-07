from app.core.security import get_password_hash
from app.models.database import SessionLocal, engine, Base, User, ReviewPrediction, ModelMetrics
from app.ml.bert_bilstm import predict_review

SAMPLE_AMAZON_YELP_REVIEWS = [
    {
        "review_title": "Worst Wireless Earbuds - Total Scam!",
        "review_text": "DO NOT BUY! Terrible quality, sound broke on the second day. Battery drains in 10 minutes. Trash garbage product refund my money immediately!!!!!",
        "star_rating": 1,
        "category": "Electronics",
        "expected_label": "Fake"
    },
    {
        "review_title": "Outstanding Sound Quality and Battery Life",
        "review_text": "I have been using these noise-canceling headphones daily for two weeks. Crisp highs, deep bass, and comfortable fit during long work sessions. Battery lasts around 30 hours as advertised.",
        "star_rating": 5,
        "category": "Electronics",
        "expected_label": "Genuine"
    },
    {
        "review_title": "AMAZING PRODUCT MUST BUY BEST ITEM EVER 10/10",
        "review_text": "AMAZING PRODUCT BEST ITEM EVER FAST SHIPPING HIGHLY RECOMMEND MUST BUY FREE GIFT 10/10 FIVE STARS!!!!!",
        "star_rating": 5,
        "category": "Home & Kitchen",
        "expected_label": "Fake"
    },
    {
        "review_title": "Great dinner at Bistro Lumiere",
        "review_text": "We ordered the truffle risotto and salmon fillet. Service was attentive despite a busy Friday night. Wine pairing recommendations were spot on. Will visit again.",
        "star_rating": 5,
        "category": "Restaurants (Yelp)",
        "expected_label": "Genuine"
    },
    {
        "review_title": "Horrible experience hated everything!",
        "review_text": "This item is super wonderful, I love it so much, best purchase of my life, totally fantastic quality! I am super happy with this!",
        "star_rating": 1,
        "category": "Beauty & Personal Care",
        "expected_label": "Fake"
    },
    {
        "review_title": "Decent jacket but runs slightly small",
        "review_text": "Fabric feels durable and stitching is neat. Sleeves are a bit snug if wearing a thick sweater underneath. Consider sizing up if between sizes.",
        "star_rating": 4,
        "category": "Fashion",
        "expected_label": "Genuine"
    },
    {
        "review_title": "Fake scam do not buy brand X is better!",
        "review_text": "This brand sells absolute fake junk. Go buy brand XYZ instead, it's way cheaper and better quality. Scam product refund immediately!",
        "star_rating": 1,
        "category": "Electronics",
        "expected_label": "Fake"
    },
    {
        "review_title": "Solid performance for the price tag",
        "review_text": "Setup was straightforward following the included manual. Works seamlessly with my home Wi-Fi network. Good value for budget conscious buyers.",
        "star_rating": 4,
        "category": "Home & Kitchen",
        "expected_label": "Genuine"
    }
]

def init_db_seed():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    
    # 1. Create Default Users if not exist
    admin_user = db.query(User).filter(User.email == "admin@ecom-guard.ai").first()
    if not admin_user:
        admin_user = User(
            email="admin@ecom-guard.ai",
            username="AdminGuard",
            hashed_password=get_password_hash("Admin123!"),
            role="admin",
            is_active=True
        )
        db.add(admin_user)
        
    demo_user = db.query(User).filter(User.email == "analyst@ecom-guard.ai").first()
    if not demo_user:
        demo_user = User(
            email="analyst@ecom-guard.ai",
            username="EcomAnalyst",
            hashed_password=get_password_hash("User123!"),
            role="user",
            is_active=True
        )
        db.add(demo_user)
        
    db.commit()

    # 2. Seed Initial Model Metrics if empty
    metrics = db.query(ModelMetrics).first()
    if not metrics:
        metrics = ModelMetrics(
            model_version="BERT-BiLSTM-v1.4",
            accuracy=95.2,
            precision=94.1,
            recall=95.8,
            f1_score=94.9,
            roc_auc=0.982,
            confusion_matrix={
                "true_genuine": 4820,
                "false_fake": 210,
                "false_genuine": 180,
                "true_fake": 4790
            },
            total_trained_samples=50000
        )
        db.add(metrics)
        db.commit()

    # 3. Seed Sample Review Predictions if empty
    review_count = db.query(ReviewPrediction).count()
    if review_count == 0:
        for sample in SAMPLE_AMAZON_YELP_REVIEWS:
            pred = predict_review(
                review_text=sample["review_text"],
                star_rating=sample["star_rating"],
                category=sample["category"]
            )
            rec = ReviewPrediction(
                user_id=demo_user.id if demo_user else None,
                review_title=sample["review_title"],
                review_text=sample["review_text"],
                star_rating=sample["star_rating"],
                category=sample["category"],
                predicted_label=pred["predicted_label"],
                confidence=pred["confidence"],
                fake_probability=pred["fake_probability"],
                genuine_probability=pred["genuine_probability"],
                sentiment_polarity=pred["sentiment_polarity"],
                sentiment_label=pred["sentiment_label"],
                subjectivity=pred["subjectivity"],
                rating_incongruity_score=pred["rating_incongruity_score"],
                is_sentiment_mismatch=pred["is_sentiment_mismatch"],
                processing_time_ms=pred["processing_time_ms"],
                suspicious_phrases=pred["suspicious_phrases"],
                explanation_summary=pred["explanation_summary"]
            )
            db.add(rec)
        db.commit()

    db.close()
