import { Component, OnInit } from '@angular/core';
import { CitaService } from '../../services/booking.service';
import { Cita } from '../../model/bookingservice.entity';
import { NgForOf, NgIf } from '@angular/common';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-citas-list',
  templateUrl: './booking-card.component.html',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    FormsModule
  ],
  styleUrls: ['./booking-card.component.css']
})
export class CitasListComponent implements OnInit {
  citas: Cita[] = [];
  selectedCita: Cita | null = null;

  constructor(private citaService: CitaService) {}

  ngOnInit() {
    this.citaService.getCitasFromServer();
    this.citaService.citas$.subscribe(citas => {
      this.citas = citas;
    });
  }

  editCita(cita: Cita) {
    this.selectedCita = { ...cita };
  }

  deleteCita(citaId: number) {
    this.citaService.deleteCita(citaId).subscribe(() => {
    });
  }

  onSubmit() {
    if (this.selectedCita) {
      this.citaService.editCita(this.selectedCita).subscribe(() => {
        this.selectedCita = null;
      });
    }
  }
}
