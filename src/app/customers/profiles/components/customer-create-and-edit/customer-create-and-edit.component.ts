import {Component, OnInit, Input, Output, EventEmitter, ViewChild, ViewEncapsulation} from '@angular/core';
import { FormsModule, NgForm } from "@angular/forms";
import { Customer } from '../../model/customer.entity';
import { CustomerService } from '../../services/customer.service';
import { Service } from '../../model/service.entity';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { TranslateModule } from "@ngx-translate/core";
import {MatIcon} from "@angular/material/icon";


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
    MatIcon,
  ],
  templateUrl: './customer-create-and-edit.component.html',
  styleUrls: ['./customer-create-and-edit.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class CustomerCreateAndEditComponent implements OnInit {
  customers: Customer[] = [];
  services: Service[] = [];

  // Para guardar el cliente original antes de editar
  originalCustomer: Customer | null = null;

  @Input() customer: Customer = {} as Customer;
  @Input() editMode: boolean = false;

  @Output() customerAdded = new EventEmitter<Customer>();
  @Output() customerUpdated = new EventEmitter<Customer>();
  @Output() editCanceled = new EventEmitter<void>();

  @ViewChild('customerForm', { static: false }) customerForm!: NgForm;

  constructor(private customerService: CustomerService) {
    this.customer = {} as Customer;
  }

  ngOnInit(): void {
    this.customerService.getServices().subscribe((data: Service[]) => {
      this.services = data;
    });
    this.loadCustomerById('1');
    this.loadServices();
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe((data: Customer[]) => {
      this.customers = data;
    });
  }

  loadCustomerById(id: string): void {
    this.customerService.getCustomerById(id).subscribe((data: Customer) => {
      this.customer = data;
    });
  }

  loadServices(): void {
    this.customerService.getServices().subscribe((data: Service[]) => {
      this.services = data;
    });
  }

  onSubmit(): void {
    if (this.customerForm && this.customerForm.form.valid) {
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
          // Emitir evento para notificar a otros componentes
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
    if(!this.customer) {
      this.customer = new Customer;
    }
    if (this.customerForm) {
      this.customerForm.resetForm();
    }
  }

  onCancel(): void {
    if (this.editMode && this.originalCustomer) {
      this.customer = { ...this.originalCustomer }; // Restaurar el cliente original
      this.originalCustomer = null;
    }
    this.editMode = false;
    this.editCanceled.emit();
  }

  toggleEdit(customer: Customer): void {
    this.originalCustomer = { ...customer }; // Clonación con el ID intacto
    this.customer = { ...customer };  // Clonación con el ID intacto
    this.editMode = true;
    console.log('Editing customer with ID:', this.customer.id); // Verifica el ID aquí
  }

  // Para que la clase hija pueda acceder a la clase padre
  protected readonly Customer = Customer;
}
