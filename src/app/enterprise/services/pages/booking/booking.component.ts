import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CitaService } from '../../services/booking.service';
import { NgForOf, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import {Cita} from "../../model/bookingservice.entity";

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf,
    RouterLink
  ],
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  bookingForm: FormGroup;
  services: any[] = [
    {
      "id": 1,
      "name": "Corte de cabello",
      "language": "English",
      "categoryId": 1,
      "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4AnPmaudDLnAZE_QDVp2zmeLpGGzE750duw&s",
      "description": "Corte de cabello clásico.",
      "basePrice": 30,
      "beautySalon": "SOHO",
      "sales": 15,
      "rating": 4.5,
      "image": "https://xn--z-uas-qta.com/wp-content/uploads/2023/06/unas-corazones.webp",
      "beauty_salon_id": 1
    },
    {
      "id": 2,
      "name": "Coloración",
      "language": "English",
      "categoryId": 1,
      "imageUrl": "https://phantom-expansion.unidadeditorial.es/53eb2367c52a8d0ea7f61372f6d5b2c0/crop/26x0/960x1136/resize/828/f/jpg/assets/multimedia/imagenes/2023/09/15/16947630246686.png",
      "description": "Expert hair styling services to give you a fresh, modern look.",
      "basePrice": 50,
      "beautySalon": "SOHO",
      "sales": 15,
      "rating": 4.5,
      "image": "https://xn--z-uas-qta.com/wp-content/uploads/2023/06/unas-corazones.webp",
      "beauty_salon_id": 1
    },
    {
      "id": 3,
      "name": "Manicure & Pedicure",
      "language": "English",
      "description": "Complete manicure and pedicure services for flawless hands and feet.",
      "basePrice": 50,
      "categoryId": 1,
      "beautySalon": "SOHO",
      "sales": 15,
      "rating": 4.5,
      "image": "https://xn--z-uas-qta.com/wp-content/uploads/2023/06/unas-corazones.webp",
      "beauty_salon_id": 1
    },
    {
      "id": 4,
      "name": "Coloración",
      "language": "English",
      "description": "Aplicación de color en el cabello.",
      "basePrice": 50,
      "categoryId": 1,
      "beautySalon": "SOHO",
      "sales": 15,
      "rating": 4.5,
      "image": "https://xn--z-uas-qta.com/wp-content/uploads/2023/06/unas-corazones.webp",
      "beauty_salon_id": 2
    },
    {
      "id": 5,
      "name": "Corte de cabello",
      "language": "English",
      "categoryId": 1,
      "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4AnPmaudDLnAZE_QDVp2zmeLpGGzE750duw&s",
      "description": "Corte de cabello clásico.",
      "basePrice": 30,
      "beautySalon": "SOHO",
      "sales": 15,
      "rating": 4.5,
      "image": "https://xn--z-uas-qta.com/wp-content/uploads/2023/06/unas-corazones.webp",
      "beauty_salon_id": 1
    },
    {
      "id": 6,
      "name": "Coloración",
      "language": "English",
      "categoryId": 1,
      "imageUrl": "https://phantom-expansion.unidadeditorial.es/53eb2367c52a8d0ea7f61372f6d5b2c0/crop/26x0/960x1136/resize/828/f/jpg/assets/multimedia/imagenes/2023/09/15/16947630246686.png",
      "description": "Expert hair styling services to give you a fresh, modern look.",
      "basePrice": 50,
      "beautySalon": "SOHO",
      "sales": 15,
      "rating": 4.5,
      "image": "https://xn--z-uas-qta.com/wp-content/uploads/2023/06/unas-corazones.webp",
      "beauty_salon_id": 1
    },
    {
      "id": 7,
      "name": "Manicure & Pedicure",
      "language": "English",
      "description": "Complete manicure and pedicure services for flawless hands and feet.",
      "basePrice": 50,
      "categoryId": 1,
      "beautySalon": "SOHO",
      "sales": 15,
      "rating": 4.5,
      "image": "https://xn--z-uas-qta.com/wp-content/uploads/2023/06/unas-corazones.webp",
      "beauty_salon_id": 1
    },
    {
      "id": 8,
      "name": "Coloración",
      "language": "English",
      "description": "Aplicación de color en el cabello.",
      "basePrice": 50,
      "categoryId": 1,
      "beautySalon": "SOHO",
      "sales": 15,
      "rating": 4.5,
      "image": "https://xn--z-uas-qta.com/wp-content/uploads/2023/06/unas-corazones.webp",
      "beauty_salon_id": 2
    }
  ];
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
    this.bookingForm.get('service')?.valueChanges.subscribe({
      next: (serviceId) => {
        this.citaService.getCustomizations(serviceId).subscribe({
          next: (data) => {
            this.customizations = data[0]?.customizations || [];
            console.log('Customizations loaded:', this.customizations);
          },
          error: (error) => {
            console.error('Error loading customizations:', error);
          }
        });
      },
      error: (error) => {
        console.error('Error in valueChanges subscription:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.bookingForm.valid) {
      const formValues = this.bookingForm.value;
      const newCita: Cita = {
        id: 0,
        booking_date: new Date().toISOString().split('T')[0],
        booking_status: 'pending',
        booking_time: formValues.time,
        customer_id: 1,
        total_amount: 100,
        company_id: 1,
        service_id: formValues.service
      };
      this.citaService.addCita(newCita);
      this.successMessage = 'Appointment booked successfully!';
      console.log('Cita added:', newCita);
    } else {
      console.log('Form is invalid');
    }
  }
}
