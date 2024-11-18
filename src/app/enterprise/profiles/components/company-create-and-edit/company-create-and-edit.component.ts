import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {Company} from '../../model/company.entity';
import {CompanyService} from '../../services/company.service';
import {Stylist} from '../../model/stylist.entity';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {TranslateModule} from "@ngx-translate/core";
import {MatIcon} from "@angular/material/icon";
import {AuthenticationService} from "../../../../iam/services/authentication.service";


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
    NgOptimizedImage,
    MatIcon,
  ],
  templateUrl: './company-create-and-edit.component.html',
  styleUrls: ['./company-create-and-edit.component.css']
})
export class CompanyCreateAndEditComponent implements OnInit {
  companies: Company[] = [];
  stylists: Stylist[] = [];

  // Para guardar el cliente original antes de editar
  originalCustomer: Company | null = null;

  @Input() company: Company = {} as Company;
  @Input() editMode: boolean = false;

  @Output() customerAdded = new EventEmitter<Company>();
  @Output() customerUpdated = new EventEmitter<Company>();
  @Output() editCanceled = new EventEmitter<void>();

  @ViewChild('customerForm', { static: false }) customerForm!: NgForm;


  constructor(private companyService: CompanyService, private authenticationService: AuthenticationService) {
    this.company = {} as Company;
  }

  ngOnInit(): void {
    this.companyService.getServices().subscribe((data: Stylist[]) => {
      this.stylists = data;
    });
    const currentCompanyId = this.authenticationService.getCurrentUserId;
    this.loadCompanyById(currentCompanyId);
    this.loadServices();
  }

  loadCustomers(): void {
    this.companyService.getCompanies().subscribe((data: Company[]) => {
      this.companies = data;
    });
  }

  loadCompanyById(id: number): void {
    this.companyService.getCompanyById(id).subscribe((data: Company) => {
      this.company = data;
    });
  }

  loadServices(): void {
    this.companyService.getServices().subscribe((data: Stylist[]) => {
      this.stylists = data;
    });
  }



  onSubmit(): void {
    if (this.customerForm && this.customerForm.form.valid) {
      // Obtener el ID del usuario actual
      // Asignar el ID del usuario actual al perfil
      this.company.id = this.authenticationService.getCurrentUserId;

      this.companyService.addCustomer(this.company).subscribe((newCompany) => {
        this.companies.push(newCompany);
        this.resetForm();
      });
    } else {
      console.error('Invalid data in form');
    }
  }


  onUpdate(): void {

    if (this.customerForm && this.customerForm.form.valid) {
      console.log('Updating customer with ID:', this.company.id);

      this.companyService.updateCustomer(this.company).subscribe(
        (updatedCustomer) => {
          const index = this.companies.findIndex(c => c.id === updatedCustomer.id);
          if (index !== -1) {
            this.companies[index] = updatedCustomer;
          }
          // Emitir evento para notificar a otros componentes
          this.customerUpdated.emit(updatedCustomer);
          this.resetForm();
          console.log('Company updated successfully:', updatedCustomer);
        },
        error => console.error(`Error updating company with ID ${this.company.id}:`, error)
      );
    } else {
      console.error('Invalid data in form');
    }
    this.editMode = false;
  }

  resetForm(): void {
    if(!this.company) {
      this.company = new Company;
    }
    if (this.customerForm) {
      this.customerForm.resetForm();
    }
  }

  onCancel(): void {
    if (this.editMode && this.originalCustomer) {
      this.company = { ...this.originalCustomer }; // Restaurar el cliente original
      this.originalCustomer = null;
    }
    this.editMode = false;
    this.editCanceled.emit();
  }


  toggleEdit(company: Company): void {
    this.originalCustomer = { ...company }; // Clonación con el ID intacto
    this.company = { ...company };  // Clonación con el ID intacto
    this.editMode = true;
    console.log('Editing company with ID:', this.company.id); // Verifica el ID aquí
    console.log("get current company id: ", this.authenticationService.getCurrentUserId);
  }
  // Para que la clase hija pueda acceder a la clase padre
  protected readonly Customer = Company;
}
