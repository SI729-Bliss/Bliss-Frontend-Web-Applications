import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { CitaService } from "../../services/booking.service";
import { Cita } from "../../model/bookingservice.entity";

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  bookingForm!: FormGroup;

  constructor(private fb: FormBuilder, private citaService: CitaService) {}

  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      service: ['', Validators.required],
      availability: ['', Validators.required],
      message: [''],
      requirements: [''],
      date: ['', Validators.required],
      time: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.bookingForm.valid) {
      const cita: Cita = this.bookingForm.value;
      this.citaService.addCita(cita);
      alert('Appointment booked successfully!');
      this.bookingForm.reset();
    } else {
      alert('Please fill in all required fields.');
    }
  }
}
