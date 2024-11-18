import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { ReviewService } from '../../../review/services/review.services';
import { AuthenticationService } from '../../../../iam/services/authentication.service';
import { Booking } from '../../model/booking.entity';
import { Company } from '../../model/company.entity';
import { forkJoin } from 'rxjs';
import { MatGridList, MatGridTile } from "@angular/material/grid-list";
import { MatIcon } from "@angular/material/icon";
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardModule } from "@angular/material/card";
import { CurrencyPipe, DatePipe, NgForOf, NgIf } from "@angular/common";
import { MatButton } from "@angular/material/button";
import { TranslateModule } from "@ngx-translate/core";
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import {Review} from "../../../review/model/review.entity";

interface BookingWithDetails extends Booking {
  company: Company;
  review?: Review;
}

@Component({
  selector: 'app-services-grid',
  standalone: true,
  imports: [
    MatGridTile,
    MatIcon,
    MatCardHeader,
    MatGridList,
    MatCardContent,
    MatCard,
    MatCardActions,
    MatCardTitle,
    MatCardSubtitle,
    MatCardModule,
    CurrencyPipe,
    MatButton,
    NgForOf,
    DatePipe,
    NgIf,
    TranslateModule
  ],
  templateUrl: './services-grid.component.html',
  styleUrls: ['./services-grid.component.css']
})
export class ServicesGridComponent implements OnInit {
  bookings: BookingWithDetails[] = [];
  cols: number = 1;

  constructor(
    private bookingService: BookingService,
    private reviewService: ReviewService,
    private authService: AuthenticationService,
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.breakpointObserver.observe([
      '(max-width: 599px)',  // Handset
      '(min-width: 600px) and (max-width: 959px)',  // Tablet
      '(min-width: 960px)'  // Web
    ]).subscribe((state: BreakpointState) => {
      if (state.breakpoints['(max-width: 599px)']) {
        this.cols = 1;
      } else if (state.breakpoints['(min-width: 600px) and (max-width: 959px)']) {
        this.cols = 2;
      } else if (state.breakpoints['(min-width: 960px)']) {
        this.cols = 3;
      }
    });

    this.authService.currentUserId.subscribe(userId => {
      if (userId) {
        this.getBookingsWithDetailsByCustomerId(userId);
      }
    });
  }

  private getBookingsWithDetailsByCustomerId(customerId: number): void {
    this.bookingService.getBookingsByCustomerId(customerId).subscribe(bookings => {
      const filteredBookings = bookings.filter(booking => booking.bookingStatus);
      const companyRequests = filteredBookings.map(booking => this.bookingService.getCompanyById(booking.companyId));
      const reviewRequests = filteredBookings.map(booking => this.reviewService.getReviewsByReservationId(booking.id));

      forkJoin([forkJoin(companyRequests), forkJoin(reviewRequests)]).subscribe(([companies, reviews]) => {
        this.bookings = filteredBookings.map((booking, index) => ({
          ...booking,
          company: companies[index],
          review: reviews[index][0] // Assuming each booking has one review
        }));
      });
    });
  }

  goToReviewPage(bookingId: number): void {
    this.router.navigate(['/review-page', bookingId]);
  }

  updateReview(bookingId: number): void {
    this.router.navigate(['/review-page', bookingId]);
  }

  deleteReview(reviewId?: number): void {
    if (reviewId) {
      this.reviewService.deleteReview(reviewId).subscribe(() => {
        this.reviews = this.reviews.filter(booking => booking.review?.id !== reviewId);
      });
    } else {
      console.error('Review ID is undefined');
    }
  }
}
