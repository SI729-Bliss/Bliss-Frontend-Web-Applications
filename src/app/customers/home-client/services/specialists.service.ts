import { Injectable } from '@angular/core';
import { BaseService } from "../../../shared/services/base.service";
import { HttpClient } from "@angular/common/http";
import { Specialist } from "../model/specialist.entity";
@Injectable({
  providedIn: 'root'
})
export class SpecialistsService extends BaseService<Specialist> {

  constructor(http: HttpClient) {
     super(http);
     this.resourceEndpoint = '/specialists';
   }
}
