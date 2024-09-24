import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from "../model/company.entity";
import {BaseService} from "../../../public/shared/services/base.service";

@Injectable({
  providedIn: 'root'
})
export class CompanyService extends BaseService<Company>{

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/companies';
  }
}
