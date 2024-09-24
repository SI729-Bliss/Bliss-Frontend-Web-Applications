import { Component, OnInit } from '@angular/core';
import { EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from "@angular/forms";
import { MatFormField } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { TranslateModule } from "@ngx-translate/core";
import { MatIcon } from "@angular/material/icon";

import { CommonModule } from '@angular/common';
import { Company } from "../../model/company.entity";
import { CompanyService } from "../../services/company.service";
import {Service} from "../../../../customers/profiles/model/service.entity";

@Component({
  selector: 'app-company-create-and-edit',
  standalone: true,
  imports: [CommonModule, MatFormField, MatInputModule, MatButtonModule, FormsModule, TranslateModule, MatIcon],
  templateUrl: './company-create-and-edit.component.html',
  styleUrls: ['./company-create-and-edit.component.css']
})
export class CompanyCreateAndEditComponent {
  companies: Company[] = [];
  services: Service[] = [];

  @Input() company: Company;
  @Input() editMode: boolean = false;
  @Output() companyAdded: EventEmitter<Company> = new EventEmitter<Company>();
  @Output() companyUpdated: EventEmitter<Company> = new EventEmitter<Company>();
  @Output() editCanceled: EventEmitter<any> = new EventEmitter();
  @ViewChild('companyForm', { static: false }) companyForm!: NgForm;

  constructor(private companyService: CompanyService) {
    this.company = {} as Company;
  }

  private resetEditState(): void {

    this.company = {} as Company;
    this.editMode = false;
    if (this.companyForm) {
      this.companyForm.resetForm();
    }
  }

  onSubmit(): void {
    if (this.companyForm.form.valid) {

      let emitter: EventEmitter<Company> = this.editMode ? this.companyUpdated : this.companyAdded;
      emitter.emit(this.company);
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
