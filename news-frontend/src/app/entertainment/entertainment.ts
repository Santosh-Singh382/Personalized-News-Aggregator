import { Component, OnInit } from '@angular/core';
import { News } from '../models/news.model';
import { NewsService } from '../services/news.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-entertainment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './entertainment.html',
  styleUrl: './entertainment.css'
})
export class Entertainment implements OnInit {

  entertainmentNews: News[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.loadEntertainmentNews();
  }

  loadEntertainmentNews(): void {
    this.newsService.getCategory('entertainment').subscribe({
      next: (data) => {
        this.entertainmentNews = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = '⚠️ Failed to load Entertainment news';
        this.isLoading = false;
      }
    });
  }
}
