import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Cita } from '../model/bookingservice.entity';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  private apiUrl = 'http://localhost:8092/api/v1/reservations';
  private citasSubject = new BehaviorSubject<Cita[]>([]);
  citas$ = this.citasSubject.asObservable();

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const username = '1';
    const password = '1';
    const basicAuth = 'Basic ' + btoa(username + ':' + password);
    return new HttpHeaders({
      'Authorization': basicAuth
    });
  }

  getServices(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/services`, { headers: this.getAuthHeaders() }).pipe(
      tap(data => console.log('Services:', data))
    );
  }

  getCustomizations(serviceId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/service_customization?serviceId=${serviceId}`, { headers: this.getAuthHeaders() }).pipe(
      tap(data => console.log('Customizations:', data))
    );
  }

  addCita(cita: Cita): void {
    const currentCitas = this.citasSubject.value;
    this.citasSubject.next([...currentCitas, cita]);
    this.saveCitaToServer(cita).subscribe();
  }

  private saveCitaToServer(cita: Cita): Observable<Cita> {
    return this.http.post<Cita>(`${this.apiUrl}/booking_service`, cita, { headers: this.getAuthHeaders() }).pipe(
      tap(data => console.log('Cita saved:', data))
    );
  }

  getCitasFromServer(): void {
    this.http.get<Cita[]>(`${this.apiUrl}/booking_service`, { headers: this.getAuthHeaders() }).subscribe(citas => {
      this.citasSubject.next(citas);
    });
  }

  editCita(cita: Cita): Observable<Cita> {
    return this.http.put<Cita>(`${this.apiUrl}/booking_service/${cita.id}`, cita, { headers: this.getAuthHeaders() }).pipe(
      tap(updatedCita => {
        const currentCitas = this.citasSubject.value.map(c => c.id === updatedCita.id ? updatedCita : c);
        this.citasSubject.next(currentCitas);
      })
    );
  }

  deleteCita(citaId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/booking_service/${citaId}`, { headers: this.getAuthHeaders() }).pipe(
      tap(() => {
        const currentCitas = this.citasSubject.value.filter(c => c.id !== citaId);
        this.citasSubject.next(currentCitas);
      })
    );
  }
}
