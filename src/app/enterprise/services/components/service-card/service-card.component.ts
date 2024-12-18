import {Component, Input, OnInit} from '@angular/core';

import {MatCardModule} from '@angular/material/card';
import { EntsevicesService } from "../../services/entsevices.service";
import { Entservice } from "../../model/entservice.entity";
import {MatCell, MatCellDef} from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import {RouterLink} from '@angular/router';
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [MatCardModule, MatCell, MatCellDef, MatButtonModule, RouterLink, TranslateModule],
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
