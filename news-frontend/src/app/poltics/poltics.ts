import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';
import { News } from '../models/news.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-poltics',
  imports: [CommonModule],
  templateUrl: './poltics.html',
  styleUrls: ['./poltics.css']
})
export class Poltics implements OnInit {

  politicsNews: News[] = [];
  loading = false;
  error = '';

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.fetchPoliticsNews();
  }

  fetchPoliticsNews(): void {
    this.loading = true;
    this.newsService.getCategory('politics').subscribe({
      next: (data) => {
        this.politicsNews = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = '⚠ Failed to load political news';
        this.loading = false;
        console.error(err);
      }
    });
  }

  formatDate(dateString?: string): string {
    if (!dateString) return '';
    const d = new Date(dateString);
    return d.toLocaleString(); // show readable datetime
  }
}
