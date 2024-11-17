import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../model/review.entity';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = 'https://my-json-server.typicode.com/Andorla0/dbjson';

  constructor(private http: HttpClient) {}

  getReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/reviews`);
  }
}
