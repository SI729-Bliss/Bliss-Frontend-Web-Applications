// review-page.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from '../../services/review.services';
import { ReservationService } from '../../../history/services/reservation.service';
import { Review } from '../../model/review.entity';
import { Reservation } from '../../../history/model/reservation.entity';
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
  reservation: Reservation = new Reservation();
  service: Service = new Service();
  userName: string = 'Juan Pérez';

  constructor(
    private reviewService: ReviewService,
    private reservationService: ReservationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const reservationId = +this.route.snapshot.paramMap.get('id')!;
    this.reviewService.getReviewByReservationId(reservationId).subscribe(reviews => {
      if (reviews.length > 0) {
        this.review = reviews[0];
      } else {
        this.review.reservationId = reservationId;
        this.review.customerId = 1; // Assuming user ID is 1
      }
    });

    this.reservationService.getReservationById(reservationId).subscribe(reservation => {
      this.reservation = reservation;
      this.reservationService.getServiceById(reservation.serviceId).subscribe(service => {
        this.service = service;
      });
    });
  }
}
