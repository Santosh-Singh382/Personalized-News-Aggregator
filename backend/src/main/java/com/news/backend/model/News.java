package com.news.backend.model;

import java.time.Instant;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Data
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
}
