import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { News } from '../../models/news.model';

@Component({
  selector: 'app-news-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news-item.html',
  styleUrls: ['./news-item.css']
})
export class NewsItem {
  @Input() news!: News;  // Use strict typing
  @Output() factCheckClicked = new EventEmitter<News>();

  onFactCheck() {
    this.factCheckClicked.emit(this.news);
  }
}
