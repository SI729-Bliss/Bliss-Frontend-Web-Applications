import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from "../../../shared/services/base.service";
import { HttpClient } from "@angular/common/http";
import { Service } from "../model/service.entity";

@Injectable({
  providedIn: 'root'
})
export class ServicesService  extends BaseService<Service>{

  constructor(http: HttpClient) {
       super(http);
       this.resourceEndpoint = '/services';
     }
  getServicesByCategoryId(category: string): Observable<Service[]> {
      return this.http.get<Service[]>(`${this.basePath}${this.resourceEndpoint}/category`, {
        params: { category }
      });
    }
}
