# Sentiment-Aware Detection of Fake Reviews and Opinion Spam in E-Commerce Platforms

A production-grade, full-stack AI web application for detecting fake customer reviews, opinion spam, incentivized ratings, and rating-sentiment incongruities using **BERT contextual embeddings** and **Bidirectional LSTM (BiLSTM)** neural network architectures.

---

## Key Features

1. **JWT User & Admin Authentication**:
   - Secure Login & Registration with Role-based Access Control (Admin / User).
2. **Interactive Opinion Spam Dashboard**:
   - Real-time Metrics (Total Reviews, Genuine Ratio, Fake Ratio, Accuracy, F1-Score, Avg Sentiment).
   - Interactive Charts (Pie chart for Genuine vs Fake, Bar chart for Sentiment distribution, Line chart for Weekly trends).
3. **Single Review Workspace**:
   - Live review tester with star rating, category, and account metadata inputs.
   - BERT + BiLSTM confidence probability breakdown.
   - Rating–Sentiment Incongruity flag detection.
   - Explainable AI (XAI) token attribution highlighting suspicious keywords.
4. **Batch CSV & Dataset Scanner**:
   - Bulk scan multi-review CSV files or run pre-populated Amazon & Yelp datasets.
   - Multi-criteria filtering (Fake, Genuine, Mismatch).
5. **NLP Preprocessing Inspector Lab**:
   - Step-by-step visual text transformation (Lowercasing -> Regex Clean -> Tokenization -> Stopword Removal -> Lemmatization -> BERT Tokens).
6. **BERT + BiLSTM Model Inspector & Retraining**:
   - Neural network layer architecture breakdown.
   - Model Evaluation Visualizer (ROC Curve, Precision-Recall Curve, Confusion Matrix).
   - One-click Model Retraining trigger.
7. **Admin Moderation Console**:
   - Account management and review deletion log.
8. **Export & Reports Center**:
   - Downloadable CSV audit logs and printable Executive PDF summary reports.

---

## Tech Stack

- **Frontend**: React (TypeScript), Vite, Tailwind CSS, Lucide Icons, Recharts.
- **Backend**: Python (FastAPI), SQLAlchemy, SQLite, JWT Authentication.
- **Machine Learning**: PyTorch, BERT Transformer Embeddings, BiLSTM Recurrent Neural Net, NLTK/spaCy text cleaning.
- **Deployment**: Docker & Docker Compose.

---

## Getting Started

### Option A: Running with Docker Compose
```bash
docker-compose up --build
```
Access the web frontend at `http://localhost:3000` and REST API documentation at `http://localhost:8000/docs`.

### Option B: Running Locally

#### 1. Backend Setup
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

#### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:3000` in your web browser.

---

## Default Login Credentials
- **Admin Role**: `admin@ecom-guard.ai` / `Admin123!`
- **User Role**: `analyst@ecom-guard.ai` / `User123!`
