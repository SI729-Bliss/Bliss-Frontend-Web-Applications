import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../model/review.entity';
import { BaseService } from '../../../shared/services/base.service';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ReviewService extends BaseService<Review> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/reviews';
  }

  getReviewById(id: number): Observable<Review> {
    return this.http.get<Review>(`${this.basePath}${this.resourceEndpoint}/${id}`);
  }

  getReviewsByCustomerId(customerId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.basePath}${this.resourceEndpoint}/user/${customerId}`);
  }

  getReviewsByReservationId(reservationId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.basePath}${this.resourceEndpoint}/reservation/${reservationId}`);
  }

  getReviewsByCompanyId(companyId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.basePath}${this.resourceEndpoint}/company/${companyId}`);
  }

  createReview(review: Review): Observable<Review> {
    return this.http.post<Review>(`${this.basePath}${this.resourceEndpoint}`, review);
  }

  updateReview(id: number, review: Review): Observable<Review> {
    return this.http.put<Review>(`${this.basePath}${this.resourceEndpoint}/${id}`, review);
  }

  deleteReview(id: number): Observable<void> {
    return this.http.delete<void>(`${this.basePath}${this.resourceEndpoint}/${id}`);
  }
}
