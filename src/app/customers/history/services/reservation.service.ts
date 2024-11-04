import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reservation } from '../model/reservation.entity';
import { Service } from '../model/service.entity';
import { BeautySalon } from '../model/beautySalon.entity';
import { BaseService } from '../../../shared/services/base.service';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService extends BaseService<Reservation> {

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/reservations';
  }

  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.basePath}/services`).pipe(
      catchError(this.handleError)
    );
  }

  getBeautySalons(): Observable<BeautySalon[]> {
    return this.http.get<BeautySalon[]>(`${this.basePath}/beauty_salons`).pipe(
      catchError(this.handleError)
    );

  }
  getReservationById(reservationId: number): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.basePath}/reservations/${reservationId}`).pipe(
      catchError(this.handleError)
    );
  }
  getServiceById(serviceId: number): Observable<Service> {
    return this.http.get<Service>(`${this.basePath}/services/${serviceId}`).pipe(
      catchError(this.handleError)
    );
  }
}
