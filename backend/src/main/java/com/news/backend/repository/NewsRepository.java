package com.news.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.news.backend.model.News;
import java.util.List;

@Repository
public interface NewsRepository extends MongoRepository<News, String> {

    List<News> findByTitleContainingIgnoreCase(String keyword);

    List<News> findBySentiment(String sentiment);

    List<News> findByBiasLabel(String biasLabel);

    List<News> findByTopicCluster(String topic);

    List<News> findBySummaryContainingIgnoreCase(String keyword);

    List<News> findByCategoryIgnoreCase(String category);
}
