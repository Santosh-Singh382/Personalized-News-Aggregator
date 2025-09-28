import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { News } from '../models/news.model';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-livenews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './livenews.html',
  styleUrls: ['./livenews.css']
})
export class Livenews implements OnInit {

  newsList: News[] = [];    // Will hold live news only
  loading = false;
  error = '';

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.loadLiveNews();
  }

  // Fetch live news only
  loadLiveNews(): void {
    this.loading = true;
    this.error = '';

    this.newsService.getLiveNews().subscribe({
      next: (data: News[]) => {
        this.newsList = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = '⚠ Failed to load live news';
        this.loading = false;
        console.error('LiveNews fetch error:', err);
      }
    });
  }

  // Format date for display
  formatDate(dateString?: string): string {
    if (!dateString) return '';
    return new Date(dateString).toLocaleString();
  }
}
