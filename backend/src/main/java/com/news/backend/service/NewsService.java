package com.news.backend.service;

import com.news.backend.model.News;
import com.news.backend.repository.NewsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.Instant;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class NewsService {

    private final NewsRepository newsRepository;
    private final WebClient.Builder webClientBuilder;

    @Value("${newsapi.key}")
    private String newsApiKey;

    @Value("${ml.api.baseurl}") // e.g. http://127.0.0.1:5001
    private String mlApiBaseUrl;

    //Categories list (auto-update ke liye)
    private final List<String> categories = List.of(
            "india", "world", "technology", "sports",
            "business", "health", "science", "entertainment"
    );

    //Har 5 min me purana delete + fresh fetch
    @Scheduled(fixedRateString = "${news.update.interval:300000}") // default 5 min
    public void autoUpdateNews() {
        System.out.println("♻ Refreshing news... deleting old and fetching fresh");

        //Purana saara news delete
        newsRepository.deleteAll();

        //Har category ke liye fresh news fetch
        for (String category : categories) {
            fetchLiveNewsFromAPI(category);
        }
    }

    //Get all stored news
    public List<News> getAllNews() {
        return newsRepository.findAll();
    }

    //Search in Mongo
    public List<News> searchNews(String keyword) {
        return newsRepository.findByTitleContainingIgnoreCase(keyword);
    }

    //Filters
    public List<News> filterBySentiment(String sentiment) {
        return newsRepository.findBySentiment(sentiment);
    }

    public List<News> filterByBias(String bias) {
        return newsRepository.findByBiasLabel(bias);
    }

    public List<News> filterByTopic(String topic) {
        return newsRepository.findByTopicCluster(topic);
    }

    //Fetch news from NewsAPI, enrich with ML, save into MongoDB
    public List<News> fetchLiveNewsFromAPI(String query) {
        WebClient client = webClientBuilder.build();

        Map response = client.get()
                .uri(uriBuilder -> uriBuilder
                        .scheme("https")
                        .host("newsapi.org")
                        .path("/v2/everything")
                        .queryParam("q", query)
                        .queryParam("language", "en")
                        .queryParam("sortBy", "publishedAt")
                        .queryParam("apiKey", newsApiKey)
                        .build())
                .retrieve()
                .bodyToMono(Map.class)
                .block();

        List<Map<String, Object>> articles = (List<Map<String, Object>>) response.get("articles");

        if (articles != null) {
            for (Map<String, Object> article : articles) {
                try {
                    News news = new News();
                    news.setAuthor((String) article.get("author"));
                    news.setTitle((String) article.get("title"));
                    news.setDescription((String) article.get("description"));
                    news.setUrl((String) article.get("url"));
                    news.setUrlToImage((String) article.get("urlToImage"));

                    //Parse publishedAt safely
                    try {
                        String publishedAtStr = (String) article.get("publishedAt");
                        if (publishedAtStr != null) {
                            Instant publishedAt = Instant.from(
                                    DateTimeFormatter.ISO_DATE_TIME.parse(publishedAtStr)
                            );
                            news.setPublishedAt(publishedAt);
                        }
                    } catch (Exception e) {
                        news.setPublishedAt(null);
                    }

                    news.setContent((String) article.get("content"));

                    //Set category from query
                    news.setCategory(query);

                    //Call ML API for enrichment
                    try {
                        Map<String, Object> analysis = client.post()
                                .uri(mlApiBaseUrl + "/analyze")
                                .bodyValue(Map.of(
                                        "title", news.getTitle(),
                                        "description", news.getDescription(),
                                        "content", news.getContent()
                                ))
                                .retrieve()
                                .bodyToMono(Map.class)
                                .block();

                        if (analysis != null) {
                            news.setSentiment((String) analysis.get("sentiment"));
                            news.setBiasLabel((String) analysis.get("biasLabel"));
                            news.setTopicCluster((String) analysis.get("topicCluster"));
                            news.setFactCheck((String) analysis.get("factCheck"));
                        }
                    } catch (Exception mlErr) {
                        System.err.println("⚠️ ML API failed: " + mlErr.getMessage());
                    }

                    //Save without duplicate check (kyunki purana delete kar chuke ho)
                    if (news.getTitle() != null) {
                        newsRepository.save(news);
                    }

                } catch (Exception err) {
                    System.err.println("⚠️ Failed to process article: " + err.getMessage());
                }
            }
        }

        return newsRepository.findAll(); // return enriched news from DB
    }

    //Category-wise filter
    public List<News> getNewsByCategory(String category) {
        return newsRepository.findByCategoryIgnoreCase(category);
    }
}
