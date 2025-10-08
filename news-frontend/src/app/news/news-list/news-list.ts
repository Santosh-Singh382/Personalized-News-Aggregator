import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsService } from '../../services/news.service';
import { News } from '../../models/news.model';
import { NewsItem } from '../news-item/news-item';
import { FactcheckSidebar } from '../factcheck-sidebar/factcheck-sidebar';
import { FormsModule } from '@angular/forms';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-news-list',
  standalone: true,
  imports: [CommonModule, NewsItem, FactcheckSidebar, FormsModule],
  templateUrl: './news-list.html',
  styleUrls: ['./news-list.css']
})
export class NewsList implements OnInit, OnDestroy {
  newsList: News[] = [];
  selectedNews?: News;
  searchQuery: string = '';
  loading: boolean = false;
  autoRefreshSub?: Subscription;

  // Optional: selected category
  selectedCategory: string = 'technology';

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.fetchLatestNews();

    // Auto-refresh every 5 min
    this.autoRefreshSub = interval(300000).subscribe(() => {
      this.fetchLatestNews();
    });
  }

  ngOnDestroy(): void {
    this.stopAutoRefresh();
  }

  // ✅ Fetch latest news (backend already sorts latest-first)
  fetchLatestNews() {
    this.loading = true;
    this.newsService.getLatestNews().subscribe({
      next: (res) => {
        this.newsList = res;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  // Fetch category-wise latest news
  fetchCategoryNews(category: string) {
    this.selectedCategory = category;
    this.loading = true;
    this.newsService.getCategoryLatest(category).subscribe({
      next: (res) => {
        this.newsList = res;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  // Live fetch from API (optional, fetch + enrich)
  fetchLiveNews() {
    this.loading = true;
    this.newsService.getLiveNews(this.selectedCategory).subscribe({
      next: (res) => {
        this.newsList = res;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  onSearch() {
    if (!this.searchQuery.trim()) {
      this.fetchLatestNews();
      return;
    }

    this.loading = true;
    this.newsService.searchNews(this.searchQuery).subscribe({
      next: (res) => {
        this.newsList = res;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  onFactCheckClicked(news: News) {
    this.selectedNews = news;
  }

  toggleAutoRefresh() {
    if (this.autoRefreshSub) {
      this.stopAutoRefresh();
    } else {
      this.autoRefreshSub = interval(300000).subscribe(() => this.fetchLatestNews());
    }
  }

  private stopAutoRefresh() {
    if (this.autoRefreshSub) {
      this.autoRefreshSub.unsubscribe();
      this.autoRefreshSub = undefined;
    }
  }
}
