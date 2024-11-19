import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Reservation } from '../model/reservation.entity';
import { BaseService } from "../../../shared/services/base.service";
import { Service } from '../model/service.entity';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ReservationService extends BaseService<Reservation>{

  constructor(http: HttpClient) {
           super(http);
           this.resourceEndpoint = '/bookings';
    }


  getServiceById(serviceId: number): Observable<Service> {
      return this.http.get<Service>(`${this.basePath}/services/${serviceId}`).pipe(
        tap((data: Service) => console.log('Service:', data)),
        catchError(error => {
          console.error('Error fetching service details:', error);
          return of(new Service());
        })
      );
    }
  getServicesDetailById(serviceId: number): Observable<any> {
      return this.http.get<any>(`${this.basePath}/services/details/findByService?serviceId=${serviceId}`).pipe(
        tap((data: any) => console.log('Services:', data)),
        catchError(error => {
          console.error('Error fetching service details:', error);
          return of([]);
        })
      );
    }
  getReservationById(reservationId: number): Observable<Reservation> {
      return this.http.get<Reservation>(`${this.basePath}/${reservationId}`).pipe(
        tap((data: Reservation) => console.log('Reservation:', data)),
        catchError(error => {
          console.error('Error fetching reservation details:', error);
          return of(new Reservation());
        })
      );
    }
}
