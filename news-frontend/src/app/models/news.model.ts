// src/app/models/news.model.ts
export interface News {
  id?: string | number;
  author?: string;
  title: string;
  description?: string;
  url: string;
  urlToImage?: string;
  publishedAt?: string;   // ISO date string
  content?: string;
  summary?: string;
  sentiment?: 'Positive' | 'Negative' | 'Neutral' | string;
  biasLabel?: string;
  topicCluster?: string;
  factCheck?: string; // "Verified" | "Not Verified"
}
