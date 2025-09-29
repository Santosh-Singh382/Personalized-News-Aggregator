package com.news.backend.controller;

import com.news.backend.model.News;
import com.news.backend.service.NewsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/news")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class NewsController {

    private final NewsService newsService;
    public NewsController(NewsService newsService) {
        this.newsService = newsService;
    }

    // Live news (fetch + enrich + save + return)
    @GetMapping("/live")
    public List<News> getLiveNews(@RequestParam(defaultValue = "technology") String query) {
        return newsService.fetchLiveNewsFromAPI(query);
    }

    // Search
    @GetMapping("/search")
    public List<News> searchNews(@RequestParam String keyword) {
        return newsService.searchNews(keyword);
    }

    //Filters
    @GetMapping("/sentiment/{sentiment}")
    public List<News> filterBySentiment(@PathVariable String sentiment) {
        return newsService.filterBySentiment(sentiment);
    }

    @GetMapping("/bias/{bias}")
    public List<News> filterByBias(@PathVariable String bias) {
        return newsService.filterByBias(bias);
    }

    @GetMapping("/topic/{topic}")
    public List<News> filterByTopic(@PathVariable String topic) {
        return newsService.filterByTopic(topic);
    }

    //Flexible filter
    @GetMapping("/filter")
    public List<News> filterNews(@RequestParam(required = false) String sentiment,
                                 @RequestParam(required = false) String bias,
                                 @RequestParam(required = false) String topic) {
        if (sentiment != null) return newsService.filterBySentiment(sentiment);
        if (bias != null) return newsService.filterByBias(bias);
        if (topic != null) return newsService.filterByTopic(topic);
        return newsService.getAllNews();
    }

    //Category-wise News
    @GetMapping("/category/{category}")
    public List<News> getNewsByCategory(@PathVariable String category) {
        return newsService.getNewsByCategory(category);
    }
}
