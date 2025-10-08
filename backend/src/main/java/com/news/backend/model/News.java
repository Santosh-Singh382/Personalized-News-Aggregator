package com.news.backend.model;

import java.time.Instant;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "news")
public class News {

    @Id
    private String id;

    private String author;
    private String title;
    private String description;
    private String url;
    private String urlToImage;

    private Instant publishedAt;
    private String content;
    private String category;

    // optional AI fields
    private String summary;
    private String sentiment;
    private String biasLabel;
    private String topicCluster;
    private String factCheck;

    // Getters & Setters

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }

    public String getAuthor() {
        return author;
    }
    public void setAuthor(String author) {
        this.author = author;
    }

    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    public String getUrl() {
        return url;
    }
    public void setUrl(String url) {
        this.url = url;
    }

    public String getUrlToImage() {
        return urlToImage;
    }
    public void setUrlToImage(String urlToImage) {
        this.urlToImage = urlToImage;
    }

    public Instant getPublishedAt() {
        return publishedAt;
    }
    public void setPublishedAt(Instant publishedAt) {
        this.publishedAt = publishedAt;
    }

    public String getContent() {
        return content;
    }
    public void setContent(String content) {
        this.content = content;
    }

    public String getCategory() {
        return category;
    }
    public void setCategory(String category) {
        this.category = category;
    }

    public String getSummary() {
        return summary;
    }
    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getSentiment() {
        return sentiment;
    }
    public void setSentiment(String sentiment) {
        this.sentiment = sentiment;
    }

    public String getBiasLabel() {
        return biasLabel;
    }
    public void setBiasLabel(String biasLabel) {
        this.biasLabel = biasLabel;
    }

    public String getTopicCluster() {
        return topicCluster;
    }
    public void setTopicCluster(String topicCluster) {
        this.topicCluster = topicCluster;
    }

    public String getFactCheck() {
        return factCheck;
    }
    public void setFactCheck(String factCheck) {
        this.factCheck = factCheck;
    }
}
