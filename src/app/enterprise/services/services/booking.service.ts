import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cita} from "../model/bookingservice.entity";

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  private citasSubject = new BehaviorSubject<Cita[]>([]);
  citas$ = this.citasSubject.asObservable();

  addCita(cita: Cita) {
    const currentCitas = this.citasSubject.value;
    this.citasSubject.next([...currentCitas, cita]);
  }
}

