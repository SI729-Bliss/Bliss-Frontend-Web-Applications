import { Component, OnInit } from '@angular/core';
import { EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from "@angular/forms";
import { MatFormField } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { TranslateModule } from "@ngx-translate/core";
import { Customer } from '../../model/customer.entity';
import { MatIcon } from "@angular/material/icon";
import { CustomerService } from '../../services/customer.service';
import { Service } from '../../model/service.entity';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-create-and-edit',
  standalone: true,
  imports: [CommonModule, MatFormField, MatInputModule, MatButtonModule, FormsModule, TranslateModule, MatIcon],
  templateUrl: './customer-create-and-edit.component.html',
  styleUrls: ['./customer-create-and-edit.component.css']
})
export class CustomerCreateAndEditComponent implements OnInit {
  customers: Customer[] = [];
  services: Service[] = [];

  @Input() customer: Customer;
  @Input() editMode: boolean = false;
  @Output() studentAdded: EventEmitter<Customer> = new EventEmitter<Customer>();
  @Output() studentUpdated: EventEmitter<Customer> = new EventEmitter<Customer>();
  @Output() editCanceled: EventEmitter<any> = new EventEmitter();
  @ViewChild('studentForm', { static: false }) studentForm!: NgForm;

  constructor(private customerService: CustomerService) {
    this.customer = {} as Customer;
  }

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe((data: Customer[]) => {
      this.customers = data;
    });

    this.customerService.getServices().subscribe((data: Service[]) => {
      this.services = data;
    });
  }

  private resetEditState(): void {
    this.customer = {} as Customer;
    this.editMode = false;
    this.studentForm.resetForm();
  }

  onSubmit(): void {
    if (this.studentForm.form.valid) {
      let emitter: EventEmitter<Customer> = this.editMode ? this.studentUpdated : this.studentAdded;
      emitter.emit(this.customer);
      this.resetEditState();
    } else {
      console.error('Invalid data in form');
    }
  }

  onCancel(): void {
    this.editCanceled.emit();
    this.resetEditState();
  }
}
