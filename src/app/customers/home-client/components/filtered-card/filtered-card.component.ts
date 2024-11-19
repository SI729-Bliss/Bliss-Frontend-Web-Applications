import { Component, OnInit, Input } from '@angular/core';
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
  selector: 'app-filtered-card',
  standalone: true,
  imports: [MatCardModule,  MatInputModule, MatFormFieldModule,CommonModule, MatButtonModule, MatIconModule, RouterLink, TranslateModule],
  templateUrl: './filtered-card.component.html',
  styleUrl: './filtered-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilteredCardComponent implements OnInit {
  @Input() category: string = '';
    services: Array<Service> = [];
    displayedColumns: string[] = ['name', 'description', 'basePrice', 'image', 'category', 'beautySalon', 'sales', 'rating'];
    dataSource: any;

    constructor(private serviceApiService: ServicesService) {}

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    ngOnInit(): void {
      if (this.category) {
        this.serviceApiService.getServicesByCategoryId(this.category).subscribe((data: any) => {
          this.services = data;
          this.dataSource = new MatTableDataSource(this.services);
        });
      }
    }
}
