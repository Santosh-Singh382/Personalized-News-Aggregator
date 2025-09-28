import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { News } from '../models/news.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private apiUrl = environment.apiUrl ;

  constructor(private http: HttpClient) { }

  getLiveNews(): Observable<News[]> {
    return this.http.get<News[]>(`${this.apiUrl}/live`);
  }

  searchNews(keyword: string): Observable<News[]> {
    return this.http.get<News[]>(`${this.apiUrl}/search?keyword=${keyword}`);
  }

  filterBySentiment(sentiment: string): Observable<News[]> {
    return this.http.get<News[]>(`${this.apiUrl}/sentiment/${sentiment}`);
  }

  filterByBias(biasLabel: string): Observable<News[]> {
    return this.http.get<News[]>(`${this.apiUrl}/bias/${biasLabel}`);
  }

  filterByTopic(topic: string): Observable<News[]> {
    return this.http.get<News[]>(`${this.apiUrl}/topic/${topic}`);
  }

  getCategory(category: string): Observable<News[]> {
    return this.http.get<News[]>(`${this.apiUrl}/category/${category}`);
  }
}