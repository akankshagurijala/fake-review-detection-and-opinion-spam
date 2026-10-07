import datetime
from sqlalchemy import create_engine, Column, Integer, String, Float, Boolean, DateTime, Text, ForeignKey, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from app.core.config import settings

engine = create_engine(
    settings.DATABASE_URL, connect_args={"check_same_thread": False} if "sqlite" in settings.DATABASE_URL else {}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, default="user") # 'admin' or 'user'
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    reviews = relationship("ReviewPrediction", back_populates="user")

class ReviewPrediction(Base):
    __tablename__ = "review_predictions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    review_title = Column(String, nullable=True)
    review_text = Column(Text, nullable=False)
    star_rating = Column(Integer, nullable=False, default=5)
    category = Column(String, default="General")
    
    # NLP & Deep Learning Outputs
    predicted_label = Column(String, nullable=False) # 'Genuine' or 'Fake'
    confidence = Column(Float, nullable=False) # 0 to 100
    fake_probability = Column(Float, nullable=False)
    genuine_probability = Column(Float, nullable=False)
    
    # Sentiment & Incongruity
    sentiment_polarity = Column(Float, nullable=False) # -1.0 to 1.0
    sentiment_label = Column(String, nullable=False) # Positive, Negative, Neutral
    subjectivity = Column(Float, default=0.5)
    rating_incongruity_score = Column(Float, default=0.0)
    is_sentiment_mismatch = Column(Boolean, default=False)
    
    # Features & Explanation
    processing_time_ms = Column(Float, default=45.0)
    suspicious_phrases = Column(JSON, default=list) # List of flagged tokens/words
    explanation_summary = Column(Text, nullable=True)
    
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    user = relationship("User", back_populates="reviews")

class ModelMetrics(Base):
    __tablename__ = "model_metrics"

    id = Column(Integer, primary_key=True, index=True)
    model_version = Column(String, default="BERT-BiLSTM-v1.4")
    accuracy = Column(Float, default=94.8)
    precision = Column(Float, default=93.6)
    recall = Column(Float, default=95.2)
    f1_score = Column(Float, default=94.4)
    roc_auc = Column(Float, default=0.978)
    confusion_matrix = Column(JSON, default=dict)
    total_trained_samples = Column(Integer, default=50000)
    last_trained_at = Column(DateTime, default=datetime.datetime.utcnow)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
