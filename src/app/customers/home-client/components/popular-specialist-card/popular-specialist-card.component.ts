import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { NgClass } from "@angular/common";

import {Specialist} from "../../model/specialist.entity";
import { SpecialistsService } from '../../services/specialists.service';
@Component({
  selector: 'app-popular-specialist-card',
  standalone: true,
  imports: [MatCardModule,  MatInputModule, MatFormFieldModule,CommonModule],
  templateUrl: './popular-specialist-card.component.html',
  styleUrl: './popular-specialist-card.component.css'
})
export class PopularSpecialistCardComponent implements OnInit{
  specialists: Array<Specialist> = [];
  displayedColumns: string[] = ['lastName','certificationNumber','phone','img'];
  dataSource: any;
  constructor(private specialistApiService: SpecialistsService){}
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit(): void {
    this.specialistApiService.getAll().subscribe((data: any) => {
      this.specialists = data;
      this.dataSource = new MatTableDataSource(this.specialists);
    });
  }
}
