// review.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../model/review.entity';
import { BaseService } from '../../../shared/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewService extends BaseService<Review> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/feedback';
  }

  getReviewByReservationId(reservationId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.basePath}${this.resourceEndpoint}?reservationId=${reservationId}`);
  }
}
