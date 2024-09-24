import { Component } from '@angular/core';

import { EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Entservice } from "../../model/entservice.entity";
import { FormsModule, NgForm } from "@angular/forms";
import { MatFormField } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import {TranslateModule} from "@ngx-translate/core";
import { MatIconModule } from '@angular/material/icon';

import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-services-create-and-edit',
  standalone: true,
  imports: [MatFormField, MatInputModule, MatButtonModule, FormsModule, TranslateModule, MatCardModule, MatIconModule],
  templateUrl: './services-create-and-edit.component.html',
  styleUrl: './services-create-and-edit.component.css'
})

export class ServicesCreateAndEditComponent {

  // Attributes
  @Input() entservice: Entservice;
  @Input() editMode: boolean = false;
  @Output() entserviceAdded: EventEmitter<Entservice> = new EventEmitter<Entservice>();
  @Output() entserviceUpdated: EventEmitter<Entservice> = new EventEmitter<Entservice>();
  @Output() editCanceled: EventEmitter<any> = new EventEmitter();
  @ViewChild('entserviceFrom', {static: false}) entserviceForm!: NgForm;

  // Methods
  constructor() {
    this.entservice = {} as Entservice;
  }

  // Private methods
  private resetEditState(): void {
    this.entservice = {} as Entservice;
    this.editMode = false;
    this.entserviceForm.resetForm();
  }

  // Event Handlers

  onSubmit(): void {
    if (this.entserviceForm.form.valid) {
      let emitter: EventEmitter<Entservice> = this.editMode ? this.entserviceUpdated : this.entserviceAdded;
      emitter.emit(this.entservice);
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
