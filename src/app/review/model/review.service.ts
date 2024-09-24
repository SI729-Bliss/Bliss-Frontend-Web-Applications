import { Injectable } from '@angular/core';
import { Review } from './review.entity';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private reviews: Review[] = [
    new Review(1, 5, "Excelente servicio!", "2023-11-23", 123, "2023-11-20", 1, ["imagen1.jpg", "imagen2.jpg"]),
    new Review(2, 4, "El color no fue exactamente lo que esperaba.", "2023-11-24", 456, "2023-11-21", 2, ["imagen3.jpg"])
  ];

  getReviews(): Review[] {
    return this.reviews;
  }

  addReview(review: Review): void {
    review.id = this.reviews.length + 1; // Simple ID generation
    this.reviews.push(review);
  }

  updateReview(updatedReview: Review): void {
    const index = this.reviews.findIndex(r => r.id === updatedReview.id);
    if (index !== -1) {
      this.reviews[index] = updatedReview;
    }
  }

  deleteReview(id: number): void {
    this.reviews = this.reviews.filter(r => r.id !== id);
  }
}
