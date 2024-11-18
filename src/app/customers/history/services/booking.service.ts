import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Booking } from '../model/booking.entity';
import { Service } from '../model/service.entity';
import { Company } from '../model/company.entity';
import { BaseService } from '../../../shared/services/base.service';
import { catchError, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BookingService extends BaseService<Booking> {

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/bookings';
  }

  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(`${environment.serverBasePath}/services`).pipe(
      catchError(this.handleError)
    );
  }

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(`${environment.serverBasePath}/companies`).pipe(
      catchError(this.handleError)
    );
  }

  getBookingById(bookingId: number): Observable<Booking> {
    return this.http.get<Booking>(`${environment.serverBasePath}/bookings/${bookingId}`).pipe(
      catchError(this.handleError)
    );
  }

  getServiceById(serviceId: number): Observable<Service> {
    return this.http.get<Service>(`${environment.serverBasePath}/services/${serviceId}`).pipe(
      catchError(this.handleError)
    );
  }

  getBookingsByCustomerId(customerId: number): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${environment.serverBasePath}/bookings/customer/${customerId}`);
  }
}
