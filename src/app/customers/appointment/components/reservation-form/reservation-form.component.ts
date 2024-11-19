import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ReservationService } from '../../services/reservation.service';
import { CompanyService } from '../../services/company.service';
import { Service } from '../../model/service.entity';
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

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    private companyService: CompanyService
  ) {
    this.bookingForm = this.fb.group({
      message: [''],
      bookingDate: ['', Validators.required],
      bookingTime: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const serviceId = this.route.snapshot.queryParamMap.get('serviceId');

    console.log('Service ID:', serviceId);

    if (serviceId) {
      this.reservationService.getServiceById(+serviceId).subscribe(service => {
        this.serviceName = service.name;
        console.log('Service Name:', this.serviceName);

        const salonId = service.salonId;
        console.log('Salon ID:', salonId);

        if (salonId) {
          this.companyService.getCompanyById(+salonId).subscribe(company => {
            this.companyName = company.name;
            console.log('Company Name:', this.companyName);
          });
        }
      });
    }
  }
}
