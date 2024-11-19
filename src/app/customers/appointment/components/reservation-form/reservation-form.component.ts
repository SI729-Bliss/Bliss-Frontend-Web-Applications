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
      const reservation: Reservation = {
        id: 0,
        customerId: 1, // Replace with actual customer ID
        serviceId: this.serviceId, //3
        companyId: this.companyId, //1
        bookingDate: this.bookingForm.value.bookingDate,
        bookingTime: this.bookingForm.value.bookingTime,
        bookingStatus: 'false',
        requirements: '',
        message: this.bookingForm.value.message,
        totalAmount: this.bookingForm.value.totalAmount
      };

      this.reservationService.create(reservation).subscribe(response => {
        console.log('Reservation created:', response);
        this.router.navigate(['/payment']);
      });
    }
  }
}
