import { Component, OnInit } from '@angular/core';

import { EntsevicesService } from "../../services/entsevices.service";
import { Entservice } from "../../model/entservice.entity";
import { ServiceCardComponent } from "../../components/service-card/service-card.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-home-enterprise',
  standalone: true,
  imports: [ServiceCardComponent, NgForOf],
  templateUrl: './home-enterprise.component.html',
  styleUrl: './home-enterprise.component.css'
})
export class HomeEnterpriseComponent implements OnInit{

  entserviceData: any;
  entservices: any[];
  allEntservices: any[];

  constructor(private entservicesService: EntsevicesService) {

    this.entserviceData = {};
    this.entservices = [];
    this.allEntservices = [];
  }

  private getAllEntservices(): void {
    this.entservicesService.getAll().subscribe((response: any) => {
      console.log(response);
      this.entservices = response;
      console.log("Entservices:", this.entservices);
    })
  }

  ngOnInit(): void {
    this.getAllEntservices();
  }

}
