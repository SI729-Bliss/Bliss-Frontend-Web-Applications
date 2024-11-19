import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { ReservationService } from '../../services/reservation.service';
import { CompanyService } from '../../services/company.service';
import { Service } from '../../model/service.entity';
import { Reservation } from '../../model/reservation.entity';
@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css'
})
export class ReservationFormComponent implements OnInit {
  bookingForm: FormGroup;
  serviceName: string = '';
  companyName: string = '';
  serviceId: number = 0;
  companyId: number = 0;
  predefinedTotalAmount: number = 60;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private reservationService: ReservationService,
    private companyService: CompanyService
  ) {
    this.bookingForm = this.fb.group({
      message: [''],
      bookingDate: ['', Validators.required],
      bookingTime: ['', Validators.required],
      totalAmount: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    const serviceId = this.route.snapshot.queryParamMap.get('serviceId');

    if (serviceId) {
      this.serviceId = +serviceId;
      this.reservationService.getServiceById(this.serviceId).subscribe(service => {
        this.serviceName = service.name;

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
    if (this.bookingForm.valid) {
      const reservation: Reservation = new Reservation();
      reservation.customerId = 2; // Replace with actual customer ID
      reservation.serviceId = this.serviceId;
      reservation.companyId = this.companyId;
      reservation.bookingDate = this.bookingForm.value.bookingDate;
      reservation.bookingTime = this.bookingForm.value.bookingTime;
      reservation.bookingStatus = 'false';
      reservation.requirements = '';
      reservation.totalAmount = this.bookingForm.value.totalAmount;

      this.reservationService.create(reservation).subscribe(response => {
        console.log('Reservation created:', response);
        this.router.navigate(['/payment']);
      });
    }
  }
}
