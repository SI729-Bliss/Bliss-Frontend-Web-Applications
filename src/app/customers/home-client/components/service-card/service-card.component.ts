import { Component, OnInit } from '@angular/core';
import {RouterLink} from "@angular/router";
import {ChangeDetectionStrategy} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { NgClass } from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {Service} from "../../model/service.entity";
import { ServicesService } from '../../services/services.service';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [MatCardModule,  MatInputModule, MatFormFieldModule,CommonModule, MatButtonModule, MatIconModule, RouterLink, TranslateModule],
  templateUrl: './service-card.component.html',
  styleUrl: './service-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServiceCardComponent{

  services: Array<Service> = [];
  displayedColumns: string[] = ['name','description','basePrice','image','beautySalon','sales','rating'];
  dataSource: any;
  constructor(private serviceApiService: ServicesService){}

  applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  ngOnInit(): void {
        this.serviceApiService.getAll().subscribe((data: any) => {
            this.services = data;
            this.dataSource = new MatTableDataSource(this.services);
        });
    }
}
