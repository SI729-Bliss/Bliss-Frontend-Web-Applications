import { Component } from '@angular/core';
import { Review } from "../../../../../../Bliss-Frontend-Web-Applications/src/app/review/model/review.entity"
import { ReviewService } from "../../../../../../Bliss-Frontend-Web-Applications/src/app/review/model/review.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-review-list',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './review-list.component.html',
  styleUrl: './review-list.component.css'
})
export class ReviewListComponent {
  reviews: Review[] = [];

  constructor(private reviewService: ReviewService) {
    this.refreshReviews();
  }

  refreshReviews() {
    this.reviews = this.reviewService.getReviews(); // Get all reviews
  }

  deleteReview(id: number) {
    this.reviewService.deleteReview(id);
    this.refreshReviews(); // Refresh the list
  }

  editReview(review: Review) {
    // Implement edit functionality by navigating to the edit page or modal
    alert("Edit functionality is not yet implemented!"); // Placeholder
  }
}
