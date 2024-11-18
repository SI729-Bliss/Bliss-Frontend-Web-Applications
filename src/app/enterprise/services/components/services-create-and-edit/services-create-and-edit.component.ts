import {Component, OnInit} from '@angular/core';

import { EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Entservice } from "../../model/entservice.entity";
import { FormsModule, NgForm } from "@angular/forms";
import { MatFormField } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import { MatIconModule } from '@angular/material/icon';

import {MatCardModule} from '@angular/material/card';
import {RouterLink} from "@angular/router";
import {EntsevicesService} from "../../services/entsevices.service";
import {firstValueFrom} from "rxjs";

import {MatMenuModule} from "@angular/material/menu";

@Component({
  selector: 'app-services-create-and-edit',
  standalone: true,
  imports: [MatFormField, MatInputModule, MatButtonModule, FormsModule, TranslateModule, MatCardModule, MatIconModule, RouterLink, MatMenuModule],
  templateUrl: './services-create-and-edit.component.html',
  styleUrl: './services-create-and-edit.component.css'
})

export class ServicesCreateAndEditComponent implements OnInit{

  // Attributes
  @Input() entservice: Entservice;
  @Input() editMode: boolean = false;
  @Input() totalservices: number = 0;
  tempEntservicesData: string[] = [];
  nameAddvice: boolean = false;

  //@Input() entservicesData: Entservice;

  @Output() entserviceAdded: EventEmitter<Entservice> = new EventEmitter<Entservice>();
  @Output() entserviceUpdated: EventEmitter<Entservice> = new EventEmitter<Entservice>();
  @Output() editCanceled: EventEmitter<any> = new EventEmitter();
  @ViewChild('entserviceFrom', {static: false}) entserviceForm!: NgForm;

  // Methods
  constructor(private entserviceService: EntsevicesService, private translate: TranslateService) {
    this.entservice = {} as Entservice;
  }

  // Private methods
  private resetEditState(): void {
    this.entservice = {} as Entservice;
    this.editMode = false;
    this.entserviceForm.resetForm();
  }

  // Load existing names
  async loadExistingNames(): Promise<void> {
    try {
      const response: any = await firstValueFrom(this.entserviceService.getAllServicesBySalonId());
      this.tempEntservicesData = response.map((names: any) => names.name);
    } catch (error) {
      console.log('Error loading names', error);
    }
    console.log('in function', this.tempEntservicesData);
  }

  // Check names
  private isNameUnique(name: string): boolean {
    return !this.tempEntservicesData.includes(name);
  }

  // Event Handlers

  onSubmit(): void {
    this.loadExistingNames();
    if (!this.isNameUnique(this.entservice.name) && !this.editMode) {
      this.nameAddvice = true;
      return
    }

    if (this.entserviceForm.form.valid) {
      let emitter: EventEmitter<Entservice> = this.editMode ? this.entserviceUpdated : this.entserviceAdded;
      emitter.emit(this.entservice);
      this.resetEditState();
    } else { console.error('Invalid data in form'); }

    this.nameAddvice = false;
    this.loadExistingNames();
  }


  onCancel(): void {
    this.editCanceled.emit();
    this.resetEditState();
    this.loadExistingNames();
  }

  setSalon(id: number): void {
    this.entserviceService.salonContextId = id;
  }

  ngOnInit() {
    //console.log('init'); this.loadExistingNames();
    //console.log('on init',this.tempEntservicesData);
  }

}
