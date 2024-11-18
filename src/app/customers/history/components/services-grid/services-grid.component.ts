import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { ReviewService } from '../../../review/services/review.services';
import { Booking } from '../../model/booking.entity';
import { Service } from '../../model/service.entity';
import { Company } from '../../model/company.entity';
import { Review } from '../../../review/model/review.entity';
import { forkJoin } from 'rxjs';
import { MatGridList, MatGridTile } from "@angular/material/grid-list";
import { MatIcon } from "@angular/material/icon";
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardModule } from "@angular/material/card";
import { CurrencyPipe, DatePipe, NgForOf, NgIf } from "@angular/common";
import { MatButton } from "@angular/material/button";
import { TranslateModule } from "@ngx-translate/core";
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

interface BookingWithDetails extends Booking {
  service: Service;
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
  services: Service[] = [];
  companies: Company[] = [];
  cols: number = 1;

  constructor(
    private bookingService: BookingService,
    private reviewService: ReviewService,
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
    forkJoin({
      bookings: this.bookingService.getBookingsByCustomerId(1), // Assuming customer ID is 1
      services: this.bookingService.getServices(),
      companies: this.bookingService.getCompanies(),
      reviews: this.reviewService.getReviewsByCustomerId(1) // Assuming customer ID is 1
    }).subscribe(({ bookings, services, companies, reviews }) => {
      this.services = services;
      this.companies = companies;
      this.bookings = bookings
        .filter(booking => booking.bookingStatus) // Ensure this filter is applied
        .map((booking: Booking) => {
          const review = reviews.find(r => r.reservationId === booking.id);
          return {
            ...booking,
            service: this.getServiceById(booking.serviceId),
            company: this.getCompanyById(booking.companyId),
            review
          } as BookingWithDetails;
        });
    });
  }

  getServiceById(serviceId: number): Service {
    return this.services.find(service => service.id === serviceId) || new Service();
  }

  getCompanyById(companyId: number): Company {
    return this.companies.find(company => company.id === companyId) || new Company();
  }

  goToReviewPage(bookingId: number): void {
    this.router.navigate(['/review-page', bookingId]);
  }

  deleteReview(reviewId: number): void {
    this.reviewService.deleteReview(reviewId).subscribe(() => {
      this.bookings = this.bookings.map(booking => {
        if (booking.review?.id === reviewId) {
          return { ...booking, review: undefined };
        }
        return booking;
      });
    });
  }
}
