from fastapi import FastAPI
from pydantic import BaseModel
from textblob import TextBlob
import random
import logging

# Setup FastAPI app
app = FastAPI()

# Enable logging
logging.basicConfig(level=logging.INFO)

# Request model
class NewsRequest(BaseModel):
    title: str
    description: str | None = None
    content: str | None = None

# Root route for health check
@app.get("/")
def root():
    return {"message": "ML Service Running 🚀"}

# Analyze news
@app.post("/analyze")
def analyze_news(news: NewsRequest):
    text = f"{news.title} {news.description or ''} {news.content or ''}"
    logging.info(f"Analyzing news: {text[:80]}...")  # log only first 80 chars

    # Sentiment Analysis
    sentiment_score = TextBlob(text).sentiment.polarity
    if sentiment_score > 0.1:
        sentiment = "Positive"
    elif sentiment_score < -0.1:
        sentiment = "Negative"
    else:
        sentiment = "Neutral"

    # Bias (mock random)
    bias = random.choice(["Left", "Right", "Neutral"])

    # Topic detection (rule-based)
    text_lower = text.lower()
    if "election" in text_lower or "government" in text_lower:
        topic = "Politics"
    elif "football" in text_lower or "cricket" in text_lower:
        topic = "Sports"
    elif "ai" in text_lower or "tech" in text_lower:
        topic = "Technology"
    else:
        topic = "General"

    # Fact-check (mock random)
    fact_check = random.choice(["Verified", "Not Verified"])

    result = {
        "sentiment": sentiment,
        "biasLabel": bias,
        "topicCluster": topic,
        "factCheck": fact_check
    }

    logging.info(f"Analysis result: {result}")
    return result
