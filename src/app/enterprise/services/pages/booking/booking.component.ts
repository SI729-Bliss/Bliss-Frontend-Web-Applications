import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CitaService } from '../../services/booking.service';
import {NgForOf, NgIf} from '@angular/common';
import { Cita } from '../../model/bookingservice.entity';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf
  ],
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  bookingForm: FormGroup;
  services: any[] = [];
  customizations: string[] = [];
  successMessage: string | null = null;

  constructor(private fb: FormBuilder, private citaService: CitaService) {
    this.bookingForm = this.fb.group({
      fullName: [''],
      email: [''],
      service: [''],
      availability: [''],
      message: [''],
      requirements: [''],
      switch1: [{ value: false, disabled: false }],
      switch2: [{ value: false, disabled: false }],
      switch3: [{ value: false, disabled: true }],
      switch4: [{ value: false, disabled: true }],
      date: [''],
      time: ['']
    });
  }

  ngOnInit(): void {
    this.citaService.getServices().subscribe(
      data => {
        this.services = data;
        console.log('Services loaded:', this.services);
      },
      error => {
        console.error('Error loading services:', error);
      }
    );

    this.bookingForm.get('service')?.valueChanges.subscribe(serviceId => {
      this.citaService.getCustomizations(serviceId).subscribe(
        data => {
          this.customizations = data[0]?.customizations || [];
          console.log('Customizations loaded:', this.customizations);
        },
        error => {
          console.error('Error loading customizations:', error);
        }
      );
    });
  }

  onSubmit(): void {
    if (this.bookingForm.valid) {
      const newCita: Cita = this.bookingForm.value;
      this.citaService.addCita(newCita);
      this.successMessage = 'Appointment booked successfully!';
      console.log('Cita added:', newCita);
    } else {
      console.log('Form is invalid');
    }
  }
}
