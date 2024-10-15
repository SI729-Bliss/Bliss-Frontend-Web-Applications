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
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: 'app-services-management',
  standalone: true,
  imports: [MatPaginator, MatSort, MatIconModule, ServicesCreateAndEditComponent, MatTableModule, NgClass, TranslateModule],
  templateUrl: './services-management.component.html',
  styleUrl: './services-management.component.css'
})
export class ServicesManagementComponent implements OnInit, AfterViewInit{

  // Attributes
  entservicesData: Entservice;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'name', 'categoryId', 'imageUrl', 'description', 'basePrice', 'beautySalonId', 'actions'];
  isEditMode: boolean;
  totalServices: number;

  @ViewChild(MatPaginator, { static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false}) sort!: MatSort;

  // Constructor
  constructor(private entserviceService: EntsevicesService) {
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

  private getAllEntservices(): void {
    this.entserviceService.getAll()
      .subscribe((response: any) => {
        this.dataSource.data = response;
        console.log("data for table", this.dataSource.data);

      });
  };

  private getTotalServices(): any {
    this.entserviceService.getAll()
      .subscribe((response: any) => {
        this.totalServices = response.length;
        console.log('Total services:', this.totalServices)
        return this.totalServices;
      });
  };

  private createEntservice(): void {
    this.entserviceService.create(this.entservicesData)
      .subscribe((response: any) => {
        this.dataSource.data.push({...response});
        // Actualiza el dataSource.data con los students actuales, para que Angular detecte el cambio y actualice la vista.
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
    this.isEditMode = true;
    this.entservicesData = element;
  }

  onDeleteItem(element: Entservice) {
    this.deleteEntservice(element.id);
  }

  onCancelEdit() {
    this.resetEditState();
    this.getAllEntservices();
  }

  onEntserviceAdded(element: Entservice) {
    this.entservicesData = element;
    this.createEntservice();
    this.resetEditState();
  }

  onEntserviceUpdated(element: Entservice) {
    this.entservicesData = element;
    this.updateEntservice();
    this.resetEditState();
  }

  // Additional functions



  // Lifecycle Hooks

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getAllEntservices();
    this.getTotalServices();
  }





}
