import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { ReservationService } from '../../services/reservation.service';
import { CompanyService } from '../../services/company.service';
import { Service } from '../../model/service.entity';
import { Reservation } from '../../model/reservation.entity';
import {AuthenticationService} from "../../../../iam/services/authentication.service";
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, MatIcon],
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css'
})
export class ReservationFormComponent implements OnInit {
  bookingForm: FormGroup;
  serviceName: string = '';
  companyName: string = '';
  serviceId: number = 0;
  companyId: number = 0;
  basePrice: number = 0;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private reservationService: ReservationService,
    private companyService: CompanyService,
    private authenticationService: AuthenticationService
  ) {
    this.bookingForm = this.fb.group({
      bookingDate: ['', Validators.required],
      bookingTime: ['', Validators.required],
      requirements: [''], // Add requirements field
      totalAmount: [0]
    });
  }

  ngOnInit(): void {
    const serviceId = this.route.snapshot.queryParamMap.get('serviceId');

    if (serviceId) {
      this.serviceId = +serviceId;
      this.reservationService.getServiceById(this.serviceId).subscribe(service => {
        this.serviceName = service.name;
        this.basePrice = service.basePrice; // Assign basePrice

        const salonId = service.salonId;

        if (salonId) {
          this.companyId = +salonId;
          this.companyService.getCompanyById(this.companyId).subscribe(company => {
            this.companyName = company.name;
          });
        }
      });
    }
  }

  onSubmit(): void {
    const usuarioActual = this.authenticationService.getCurrentUserId;
    if (this.bookingForm.valid) {
      const reservation: Reservation = new Reservation();
      reservation.customerId = usuarioActual; // Replace with actual customer ID
      reservation.serviceId = this.serviceId;
      reservation.companyId = this.companyId;
      reservation.bookingDate = this.bookingForm.value.bookingDate;
      reservation.bookingTime = this.bookingForm.value.bookingTime;
      reservation.bookingStatus = false;
      reservation.requirements = this.bookingForm.value.requirements.split(',').map((req: string) => req.trim());
      reservation.totalAmount = this.basePrice; // Use basePrice for totalAmount

      this.reservationService.create(reservation).subscribe(response => {
            console.log('Reservation created:', response);
            this.router.navigate(['/payment'], { queryParams: { totalAmount: reservation.totalAmount, reservationId: response.id } });
          });
    }
  }
}
