import {Component, Input, OnInit} from '@angular/core';

import {MatCardModule} from '@angular/material/card';
import { EntsevicesService } from "../../services/entsevices.service";
import { Entservice } from "../../model/entservice.entity";

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './service-card.component.html',
  styleUrl: './service-card.component.css'
})
export class ServiceCardComponent{
  @Input() entservice: any;

  //entservicesData: Entservice;

  //services: Entservice[] = [];

  constructor() {
    this.entservice = {};
  }

  /**
   * ngOnInit(): void {
   *     this.entsevicesService.getAll()
   *       .subscribe((response: any) => {
   *         this.dataSource.data = response;
   *       });
   *   }
   */


}
