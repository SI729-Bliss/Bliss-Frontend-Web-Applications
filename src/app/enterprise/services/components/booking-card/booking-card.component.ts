import { Component, OnInit } from '@angular/core';
import { CitaService } from "../../services/booking.service";
import { Cita} from "../../model/bookingservice.entity";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-citas-list',
  templateUrl: './booking-card.component.html',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  styleUrls: ['./booking-card.component.css']
})
export class CitasListComponent implements OnInit {
  citas: Cita[] = [];

  constructor(private citaService: CitaService) {}

  ngOnInit() {

    this.citaService.citas$.subscribe(citas => {
      this.citas = citas;
    });
  }
}
