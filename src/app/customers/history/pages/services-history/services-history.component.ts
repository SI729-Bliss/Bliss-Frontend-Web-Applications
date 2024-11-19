import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ReviewService } from '../../../review/services/review.services';
import { Review } from '../../../review/model/review.entity';
import { MatTableModule } from '@angular/material/table';
import { DatePipe, NgForOf } from '@angular/common';
import { ServicesGridComponent } from '../../components/services-grid/services-grid.component';
import { TranslateModule } from "@ngx-translate/core";
import { AuthenticationService } from '../../../../iam/services/authentication.service';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from "@angular/material/card";

@Component({
  selector: 'app-services-history',
  standalone: true,
  imports: [
    MatTableModule,
    NgForOf,
    ServicesGridComponent,
    DatePipe,
    TranslateModule,
    MatCardContent,
    MatCardTitle,
    MatCardActions,
    MatCardHeader,
    MatCard
  ],
  templateUrl: './services-history.component.html',
  styleUrls: ['./services-history.component.css']
})
export class ServicesHistoryComponent implements OnInit {
  reviews: Review[] = [];

  constructor(
    private reviewService: ReviewService,
    private authService: AuthenticationService,
    private cdr: ChangeDetectorRef
  ) {
    console.log('ServicesHistoryComponent instantiated');
  }

  ngOnInit(): void {
    const getCurrentUserId = this.authService.getCurrentUserId;
    this.loadReviewsByCustomerId(getCurrentUserId);

  }

  private loadReviewsByCustomerId(userId: number): void {
    console.log('loadReviewsByCustomerId called with userId:', userId);
    this.reviewService.getReviewsByCustomerId(userId).subscribe(reviews => {
      console.log('Reviews fetched:', reviews);
      this.reviews = reviews.map(review => {
          return review;
      })
      this.refreshReviews()
  })
  }
  refreshReviews(): void {
    const getCurrentUserId = this.authService.getCurrentUserId;
    this.loadReviewsByCustomerId(getCurrentUserId);
  }
  }
