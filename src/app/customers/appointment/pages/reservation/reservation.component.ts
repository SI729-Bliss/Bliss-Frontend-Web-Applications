import { Component } from '@angular/core';


import {ReservationFormComponent} from '../../components/reservation-form/reservation-form.component';
@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [ReservationFormComponent],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})
export class ReservationComponent {

}
