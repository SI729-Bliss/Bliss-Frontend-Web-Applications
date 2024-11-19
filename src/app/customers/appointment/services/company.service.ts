import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Company } from '../model/company.entity';
import { BaseService } from "../../../shared/services/base.service";
@Injectable({
  providedIn: 'root'
})
export class CompanyService extends BaseService<Company>{

  constructor(http: HttpClient) {
           super(http);
           this.resourceEndpoint = '/companies';
    }

  getCompanyById(id: number): Observable<Company> {
      return this.http.get<Company>(`${this.basePath}${this.resourceEndpoint}/${id}`);
    }

}
