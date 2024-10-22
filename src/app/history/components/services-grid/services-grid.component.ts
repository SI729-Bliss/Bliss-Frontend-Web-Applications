// services-grid.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationService } from '../../services/reservation.service';
import { ReviewService } from '../../../review/services/review.services';
import { Reservation } from '../../model/reservation.entity';
import { Service } from '../../model/service.entity';
import { BeautySalon } from '../../model/beautySalon.entity';
import { Review } from '../../../review/model/review.entity';
import { forkJoin } from 'rxjs';
import { MatGridList, MatGridTile } from "@angular/material/grid-list";
import { MatIcon } from "@angular/material/icon";
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardModule } from "@angular/material/card";
import { CurrencyPipe, DatePipe, NgForOf, NgIf } from "@angular/common";
import { MatButton } from "@angular/material/button";
import {TranslateModule} from "@ngx-translate/core";

interface ReservationWithDetails extends Reservation {
  service: Service;
  beautySalon: BeautySalon;
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
  reservations: ReservationWithDetails[] = [];
  services: Service[] = [];
  beautySalons: BeautySalon[] = [];

  constructor(
    private reservationService: ReservationService,
    private reviewService: ReviewService,
    private router: Router
  ) {}

  ngOnInit(): void {
    forkJoin({
      reservations: this.reservationService.getAll(),
      services: this.reservationService.getServices(),
      beautySalons: this.reservationService.getBeautySalons(),
      reviews: this.reviewService.getAll()
    }).subscribe(({ reservations, services, beautySalons, reviews }) => {
      this.services = services;
      this.beautySalons = beautySalons;
      this.reservations = reservations
        .filter(reservation => reservation.status === 'completed')
        .map((reservation: Reservation) => {
          const review = reviews.find(r => r.reservationId === reservation.id);
          return{
          ...reservation,
          service: this.getServiceById(reservation.serviceId),
          beautySalon: this.getBeautySalonById(reservation.beautySalonId),
          review
        } as ReservationWithDetails;
      });
    });
  }

  getServiceById(serviceId: number): Service {
    return this.services.find(service => service.id === serviceId) || new Service();
  }

  getBeautySalonById(beautySalonId: number): BeautySalon {
    return this.beautySalons.find(salon => salon.id === beautySalonId) || new BeautySalon();
  }

  goToReviewPage(reservationId: number): void {
    this.router.navigate(['/review-page', reservationId]);
  }

  deleteReview(reviewId: number): void {
    this.reviewService.delete(reviewId).subscribe(() => {
      this.reservations = this.reservations.map(reservation => {
        if (reservation.review?.id === reviewId) {
          return { ...reservation, review: undefined };
        }
        return reservation;
      });
    });
  }
}
