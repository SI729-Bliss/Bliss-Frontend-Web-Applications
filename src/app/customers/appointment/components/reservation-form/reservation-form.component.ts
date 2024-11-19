import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { ReservationService } from '../../services/reservation.service';
import { CompanyService } from '../../services/company.service';
import { Service } from '../../model/service.entity';
import { Reservation } from '../../model/reservation.entity';
import {AuthenticationService} from "../../../../iam/services/authentication.service";

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
  basePrice: number = 0;
  serviceDetails: any[] = [];

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
      requirements: this.fb.array([]),
      totalAmount: [0]
    });
  }

  ngOnInit(): void {
    const serviceId = this.route.snapshot.queryParamMap.get('serviceId');

    if (serviceId) {
      this.serviceId = +serviceId;
      this.reservationService.getServiceById(this.serviceId).subscribe(service => {
        this.serviceName = service.name;
        this.basePrice = service.basePrice;

        const salonId = service.salonId;

        if (salonId) {
          this.companyId = +salonId;
          this.companyService.getCompanyById(this.companyId).subscribe(company => {
            this.companyName = company.name;
          });
        }

        this.reservationService.getServicesDetailById(this.serviceId).subscribe(details => {
          this.serviceDetails = details;
          this.addServiceDetailsToForm();
        });
      });
    }
  }

  addServiceDetailsToForm(): void {
      const requirements = this.bookingForm.get('requirements') as FormArray;
      this.serviceDetails.forEach(detail => {
        requirements.push(this.fb.control(false));
      });
    }

  updateTotalAmount(): void {
      const requirements = this.bookingForm.get('requirements')?.value || [];
      this.bookingForm.patchValue({
        totalAmount: requirements
          .map((checked: boolean, i: number) => checked ? this.serviceDetails[i].price : 0)
          .reduce((acc: number, price: number) => acc + price, this.basePrice)
      });
    }
  onSubmit(): void {
      const usuarioActual = this.authenticationService.getCurrentUserId;
      if (this.bookingForm.valid) {
        const reservation: Reservation = new Reservation();
        reservation.customerId = usuarioActual;
        reservation.serviceId = this.serviceId;
        reservation.companyId = this.companyId;
        reservation.bookingDate = this.bookingForm.value.bookingDate;
        reservation.bookingTime = this.bookingForm.value.bookingTime;
        reservation.bookingStatus = false;
        reservation.requirements = this.bookingForm.value.requirements
          .map((checked: boolean, i: number) => checked ? this.serviceDetails[i].detail : null)
          .filter((v: string | null) => v !== null) as string[];
        reservation.totalAmount = this.bookingForm.value.requirements
          .map((checked: boolean, i: number) => checked ? this.serviceDetails[i].price : 0)
          .reduce((acc: number, price: number) => acc + price, this.basePrice);

        this.reservationService.create(reservation).subscribe(response => {
          console.log('Reservation created:', response);
          this.router.navigate(['/payment'], { queryParams: { totalAmount: reservation.totalAmount, reservationId: response.id } });
        });
      }
    }
}
