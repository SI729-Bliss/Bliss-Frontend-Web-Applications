import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Cita } from '../model/bookingservice.entity';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

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

  private citasSubject = new BehaviorSubject<Cita[]>([]);
  citas$ = this.citasSubject.asObservable();

  addCita(cita: Cita) {
    const currentCitas = this.citasSubject.value;
    this.citasSubject.next([...currentCitas, cita]);
  }
}
