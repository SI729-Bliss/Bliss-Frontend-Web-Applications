import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Booking } from '../model/booking.entity';
import { Service } from '../model/service.entity';
import { Company } from '../model/company.entity';
import { BaseService } from '../../../shared/services/base.service';
import {catchError, forkJoin, Observable, retry} from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BookingService extends BaseService<Booking> {

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/bookings';
  }



  getCompanyById(companyId: number): Observable<Company> {
    return this.http.get<Company>(`${this.basePath}/companies/${companyId}`).pipe(retry(2),
      catchError(this.handleError)
    );
  }

  getBookingById(bookingId: number): Observable<Booking> {
    return this.http.get<Booking>(`${this.basePath}${this.resourceEndpoint}/${bookingId}`).pipe(retry(2),
      catchError(this.handleError)
    );
  }



  getBookingsByCustomerId(customerId: number): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.basePath}${this.resourceEndpoint}/customer/${customerId}`).pipe(retry(2), catchError(this.handleError));
  }

  getBookingsWithDetails(customerId: number): Observable<any> {
    return forkJoin({
      bookings: this.getBookingsByCustomerId(customerId),
      companies: this.getCompanyById(1)
    });
  }
}
