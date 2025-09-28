import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';
import { News } from '../models/news.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-technology',
  imports: [CommonModule],
  templateUrl: './technology.html',
  styleUrls: ['./technology.css']
})
export class Technology implements OnInit {

  technologyNews: News[] = [];
  loading = false;
  error = '';

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.fetchTechnologyNews();
  }

  fetchTechnologyNews(): void {
    this.loading = true;
    this.newsService.getCategory('technology').subscribe({
      next: (data) => {
        this.technologyNews = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = '⚠ Failed to load technology news';
        this.loading = false;
        console.error(err);
      }
    });
  }

  formatDate(dateString?: string): string {
    if (!dateString) return '';
    const d = new Date(dateString);
    return d.toLocaleString();
  }
}
