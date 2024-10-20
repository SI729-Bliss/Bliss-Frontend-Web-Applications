import { Component } from '@angular/core';

import { AfterViewInit, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatIconModule } from "@angular/material/icon";
import { EntsevicesService } from "../../services/entsevices.service";
import { Entservice } from "../../model/entservice.entity";
import { ServicesCreateAndEditComponent } from "../../components/services-create-and-edit/services-create-and-edit.component";
import { NgClass } from "@angular/common";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-services-management',
  standalone: true,
  imports: [MatPaginator, MatSort, MatIconModule, ServicesCreateAndEditComponent, MatTableModule,
    NgClass, TranslateModule, MatMenuModule, MatButtonModule],
  templateUrl: './services-management.component.html',
  styleUrl: './services-management.component.css'
})
export class ServicesManagementComponent implements OnInit, AfterViewInit{

  // Attributes
  entservicesData: Entservice;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['table-number', 'name', 'categoryId', 'imageUrl', 'description', 'basePrice', 'actions'];
  isEditMode: boolean;
  totalServices: number;

  @ViewChild(MatPaginator, { static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false}) sort!: MatSort;

  @ViewChild(ServicesCreateAndEditComponent) createEditComponent!: ServicesCreateAndEditComponent;

  // Constructor
  constructor(private entserviceService: EntsevicesService, private translate: TranslateService) {
    this.isEditMode = false;
    this.entservicesData = {} as Entservice;
    this.dataSource = new MatTableDataSource<any>();
    this.totalServices = 0;
  }

  // Private Methods
  private resetEditState(): void {
    this.isEditMode = false;
    this.entservicesData = {} as Entservice;
  }

  // CRUD Actions

  /*
  private getAllEntservices(): void {
    this.entserviceService.getAll()
      .subscribe((response: any) => {
        this.dataSource.data = response;
        console.log("data for table", this.dataSource.data);
      });
  };
  */

  //Get services by salon id
  private getServicesBySalon(): void {
    this.entserviceService.getAllServicesBySalonId()
      .subscribe((response: any) => {
        this.dataSource.data = response;
        console.log("data for salon", this.dataSource.data);
      })
  }

  private getTotalServices(): any {
    this.entserviceService.getAllServicesBySalonId()
      .subscribe((response: any) => {
        this.totalServices = response.length;
        console.log('Total services:', this.totalServices)
        return this.totalServices;
      });
  };

  // Additional functions

  private createEntservice(): void {
    // Set salon id
    this.entservicesData.beauty_salon_id = this.entserviceService.getSalonContextId();
    this.entserviceService.create(this.entservicesData)
      .subscribe((response: any) => {
        this.dataSource.data.push({...response});
        // Actualiza el dataSource.data con los service actuales, para que Angular detecte el cambio y actualice la vista.
        this.dataSource.data = this.dataSource.data
          .map((service: Entservice) => {
            return service;
          });
      });
  };

  private updateEntservice(): void {
    let entserviceToUpdate: Entservice = this.entservicesData;
    this.entserviceService.update(this.entservicesData.id, entserviceToUpdate)
      .subscribe((response: any) => {
        this.dataSource.data = this.dataSource.data
          .map((service: Entservice) => {
            if (service.id === response.id) {
              return response;
            }
            return service;
          });
      });
  };

  private deleteEntservice(serviceId: number): void {
    this.entserviceService.delete(serviceId)
      .subscribe(() => {
        this.dataSource.data = this.dataSource.data
          .filter((tservice: Entservice) => {
            return tservice.id !== serviceId ? tservice : false;
          });
      });
  };

  // UI Event Handlers

  onEditItem(element: Entservice) {
    this.translate.get('bc-4.addEdit').subscribe((translatedMessage: string) =>
    { window.alert(translatedMessage); })
    this.isEditMode = true;
    this.entservicesData = element;
  }

  onDeleteItem(element: Entservice) {
    this.getTotalServices();
    if (this.totalServices === 1){
      this.translate.get('bc-4.addIfOne').subscribe((translatedMessage: string) =>
      window.alert(translatedMessage));
    } else {
      this.translate.get('bc-4.addCancel').subscribe((translatedMessage: string) =>
      {const result = window.confirm(translatedMessage);
        if (result){
          this.deleteEntservice(element.id);
          this.getTotalServices();
          this.createEditComponent.loadExistingNames();
        }
      })
    }
  }

  onCancelEdit() {
    this.resetEditState();
    this.getServicesBySalon();
  }

  onEntserviceAdded(element: Entservice) {
    this.entservicesData = element;
    this.createEntservice();
    this.resetEditState();
    // Update amount after create a service
    this.getTotalServices();
    this.createEditComponent.loadExistingNames();
  }

  onEntserviceUpdated(element: Entservice) {
    this.entservicesData = element;
    this.updateEntservice();
    this.resetEditState();
  }

  // Lifecycle Hooks

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    // Get total amount of services
    this.getTotalServices();
    this.getServicesBySalon()
  }


}
