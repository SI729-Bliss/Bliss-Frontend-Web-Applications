// src/app/customers/profiles/components/customer-create-and-edit/customer-create-and-edit.component.ts
import { Component,OnInit,Input,Output,EventEmitter,ViewChild,ViewEncapsulation } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Customer } from '../../model/customer.entity';
import { CustomerService } from '../../services/customer.service';
import { Service } from '../../model/service.entity';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { MatIcon } from '@angular/material/icon';
import { AuthenticationService } from '../../../../iam/services/authentication.service';
import {Company} from "../../../../enterprise/profiles/model/company.entity";
import {CompanyService} from "../../../../enterprise/profiles/services/company.service";

import { DialogPaymentReservationComponent } from '../../../../customers/payment/components/dialog-payment-reservation/dialog-payment-reservation.component';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-customer-create-and-edit',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    TranslateModule,
    FormsModule,
    MatIcon
  ],
  templateUrl: './customer-create-and-edit.component.html',
  styleUrls: ['./customer-create-and-edit.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CustomerCreateAndEditComponent implements OnInit {

  customers: Customer[] = [];
  companies: Company[] = [];
  services: Service[] = [];

  // Para guardar el cliente original antes de editar
  originalCustomer: Customer | null = null;

  @Input() customer: Customer = {} as Customer;
  @Input() editMode: boolean = false;

  @Output() customerAdded = new EventEmitter<Customer>();
  @Output() customerUpdated = new EventEmitter<Customer>();
  @Output() editCanceled = new EventEmitter<void>();

  @ViewChild('customerForm', { static: false }) customerForm!: NgForm;

  constructor(private customerService: CustomerService,
    private authenticationService: AuthenticationService,
    private companyService: CompanyService,
    private dialog: MatDialog) {
    this.customer = {} as Customer;
  }
  openPaymentDialog(reservationId: number): void {
      this.dialog.open(DialogPaymentReservationComponent, {
        data: { reservationId }
      });
    }
  ngOnInit(): void {
    const currentCustomerId = this.authenticationService.getCurrentUserId;
    console.log('currentCustomerId:', currentCustomerId);
    this.loadCustomerById(currentCustomerId);
    this.loadServicesByCustomerId(currentCustomerId);
  }


  loadCustomerById(id: number): void {
    this.customerService.getCustomerById(id).subscribe((data: Customer) => {
        this.customer = data;
    });
  }



  loadServicesByCustomerId(customerId: number): void {
    this.customerService.getServicesByCustomerId(customerId).subscribe((data: Service[]) => {
      this.services = data;
    });
  }
  getRandomRating(): number {
    return Math.floor(Math.random() * 5) + 1; // Genera un número aleatorio entre 1 y 5
  }
  onSubmit(): void {
    if (this.customerForm && this.customerForm.form.valid) {
      this.customer.id = this.authenticationService.getCurrentUserId;
      this.customerService.addCustomer(this.customer).subscribe((newCustomer) => {
        this.customers.push(newCustomer);
        this.resetForm();
      });
    } else {
      console.error('Invalid data in form');
    }
  }

  onUpdate(): void {
    if (this.customerForm && this.customerForm.form.valid) {
      console.log('Updating customer with ID:', this.customer.id);

      this.customerService.updateCustomer(this.customer).subscribe(
        (updatedCustomer) => {
          const index = this.customers.findIndex(c => c.id === updatedCustomer.id);
          if (index !== -1) {
            this.customers[index] = updatedCustomer;
          }
          this.customerUpdated.emit(updatedCustomer);
          this.resetForm();
          console.log('Customer updated successfully:', updatedCustomer);
        },
        error => console.error('Error updating customer:', error)
      );
    } else {
      console.error('Invalid data in form');
    }
    this.editMode = false;
  }

  resetForm(): void {
    if (!this.customer) {
      this.customer = new Customer();
    }
    if (this.customerForm) {
      this.customerForm.resetForm();
    }
  }

  onCancel(): void {
    if (this.editMode && this.originalCustomer) {
      this.customer = { ...this.originalCustomer };
      this.originalCustomer = null;
    }
    this.editMode = false;
    this.editCanceled.emit();
  }

  toggleEdit(customer: Customer): void {
    this.originalCustomer = { ...customer };
    this.customer = { ...customer };
    this.editMode = true;
    console.log('Editing customer with ID:', this.customer.id);
    console.log('get current user id:', this.authenticationService.getCurrentUserId);

  }

  protected readonly Customer = Customer;
}
