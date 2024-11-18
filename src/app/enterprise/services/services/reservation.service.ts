import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from "../../../shared/services/base.service";
import { Observable, BehaviorSubject } from 'rxjs';
import { Reservation } from '../model/reservation.entity';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReservationService extends BaseService<Reservation> {

  constructor(private http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/booking';
  }

  getServices(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/services`).pipe(
      tap(data => console.log('Services:', data))
    );
  }

  getCustomizations(serviceId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/service_customization?serviceId=${serviceId}`).pipe(
      tap(data => console.log('Customizations:', data))
    );
  }

  addReservation(reservation: Reservation): void {
    const currentReservations = this.reservationsSubject.value;
    this.reservationsSubject.next([...currentReservations, reservation]);
    this.saveReservationToServer(reservation).subscribe();
  }

  private saveReservationToServer(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(`${this.apiUrl}/booking_service`, reservation).pipe(
      tap(data => console.log('RESERVATION saved:', data))
    );
  }

  getReservationsFromServer(): void {
    this.http.get<Reservation[]>(`${this.apiUrl}/booking_service`).subscribe(reservations => {
      this.reservationsSubject.next(reservations);
    });
  }

  editReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.put<Reservation>(`${this.apiUrl}/booking_service/${reservation.id}`, reservation).pipe(
      tap(updatedReservation => {
        const currentReservations = this.reservationsSubject.value.map(c => c.id === updatedReservation.id ? updatedReservation : c);
        this.reservationsSubject.next(currentReservations);
      })
    );
  }

  deleteReservation(reservationId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/booking_service/${reservationId}`).pipe(
      tap(() => {
        const currentReservations = this.reservationsSubject.value.filter(c => c.id !== reservationId);
        this.reservationsSubject.next(currentReservations);
      })
    );
  }
}
