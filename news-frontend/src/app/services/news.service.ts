import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { News } from '../models/news.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // --------- Latest News ---------
  getLatestNews(): Observable<News[]> {
    return this.http.get<News[]>(`${this.apiUrl}/latest`);
  }

  // Category-wise latest
  getCategoryLatest(category: string): Observable<News[]> {
    return this.http.get<News[]>(`${this.apiUrl}/category/latest/${category}`);
  }

  // Live fetch from API (fetch + enrich)
  getLiveNews(category: string = 'technology'): Observable<News[]> {
    return this.http.get<News[]>(`${this.apiUrl}/live?query=${category}`);
  }

  // Search
  searchNews(keyword: string): Observable<News[]> {
    return this.http.get<News[]>(`${this.apiUrl}/search?keyword=${keyword}`);
  }

  // Filters
  filterBySentiment(sentiment: string): Observable<News[]> {
    return this.http.get<News[]>(`${this.apiUrl}/sentiment/${sentiment}`);
  }

  filterByBias(biasLabel: string): Observable<News[]> {
    return this.http.get<News[]>(`${this.apiUrl}/bias/${biasLabel}`);
  }

  filterByTopic(topic: string): Observable<News[]> {
    return this.http.get<News[]>(`${this.apiUrl}/topic/${topic}`);
  }
}
