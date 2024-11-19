import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Cita } from '../model/bookingservice.entity';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  private apiUrl = 'http://localhost:8092/api/v1/bookings';
  private citasSubject = new BehaviorSubject<Cita[]>([]);
  citas$ = this.citasSubject.asObservable();

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

  addCita(cita: Cita): void {
    const currentCitas = this.citasSubject.value;
    this.citasSubject.next([...currentCitas, cita]);
    this.saveCitaToServer(cita).subscribe();
  }

  private saveCitaToServer(cita: Cita): Observable<Cita> {
    return this.http.post<Cita>(`${this.apiUrl}/bookings`, cita).pipe(
      tap(data => console.log('Cita saved:', data))
    );
  }

  getCitasFromServer(): void {
    this.http.get<Cita[]>(`${this.apiUrl}/booking_service`).subscribe(citas => {
      this.citasSubject.next(citas);
    });
  }

  editCita(cita: Cita): Observable<Cita> {
    return this.http.put<Cita>(`${this.apiUrl}/booking_service/${cita.id}`, cita).pipe(
      tap(updatedCita => {
        const currentCitas = this.citasSubject.value.map(c => c.id === updatedCita.id ? updatedCita : c);
        this.citasSubject.next(currentCitas);
      })
    );
  }

  deleteCita(citaId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/booking_service/${citaId}`).pipe(
      tap(() => {
        const currentCitas = this.citasSubject.value.filter(c => c.id !== citaId);
        this.citasSubject.next(currentCitas);
      })
    );
  }
}
