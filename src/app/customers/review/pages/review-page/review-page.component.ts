// review-page.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from '../../services/review.services';
import { BookingService } from '../../../history/services/booking.service';
import { Review } from '../../model/review.entity';
import { Booking } from '../../../history/model/booking.entity';
import { Service } from '../../../history/model/service.entity';
import { ReviewCardComponent } from '../../components/review-card/review-card.component';

@Component({
  selector: 'app-review-page',
  standalone: true,
  imports: [ReviewCardComponent],
  templateUrl: './review-page.component.html',
  styleUrls: ['./review-page.component.css']
})
export class ReviewPageComponent implements OnInit {
  review: Review = new Review();
  booking: Booking = new Booking();
  service: Service = new Service();
  reservation: Booking = new Booking(); // Add this line
  userName: string = 'Juan Pérez';

  constructor(
    private reviewService: ReviewService,
    private bookingService: BookingService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const bookingId = +this.route.snapshot.paramMap.get('id')!;
    this.reviewService.getReviewsByReservationId(bookingId).subscribe(reviews => {
      if (reviews.length > 0) {
        this.review = reviews[0];
      } else {
        this.review.reservationId = bookingId;
        this.review.createdAt = new Date().toISOString();
        this.review.updatedAt = new Date().toISOString();
      }
    });

    this.bookingService.getBookingById(bookingId).subscribe(booking => {
      this.booking = booking;
      this.reservation = booking; // Add this line
      this.bookingService.getServiceById(booking.serviceId).subscribe(service => {
        this.service = service;
      });
    });
  }
}
