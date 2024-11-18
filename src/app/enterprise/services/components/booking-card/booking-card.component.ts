import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { Reservation } from '../../model/reservation.entity';
import { NgForOf, NgIf } from '@angular/common';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-citas-list',
  templateUrl: './booking-card.component.html',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    FormsModule
  ],
  styleUrls: ['./booking-card.component.css']
})
export class CitasListComponent implements OnInit {
  reservations: Reservation[] = [];
  selectedReservation: Reservation | null = null;

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.reservationService.getReservationsFromServer.subscribe(reservations => {
      this.reservations = reservations;
    });
  }

  editReservation(reservation: Reservation) {
    this.selectedReservation = { ...reservation };
  }

  deleteReservation(reservationId: number) {
    this.reservationService.deleteReservation(reservationId).subscribe(() => {
    });
  }

  onSubmit() {
    if (this.selectedReservation) {
      this.reservationService.editReservation(this.selectedReservation).subscribe(() => {
        this.selectedReservation = null;
      });
    }
  }
}
