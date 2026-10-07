import os
from pydantic_settings import BaseSettings if os.path.exists("pydantic_settings") else object

class Settings:
    PROJECT_NAME: str = "Sentiment-Aware Detection of Fake Reviews & Opinion Spam"
    API_V1_STR: str = "/api"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "super-secret-key-change-in-production-fake-review-detector-2026")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7 # 7 days
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./fake_reviews.db")

settings = Settings()
