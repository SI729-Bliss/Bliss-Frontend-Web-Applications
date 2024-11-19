import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base.service";
import {Detail} from "../model/detail.entity";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DetailsService extends BaseService<Detail>{

  constructor(http: HttpClient, private httpForDet: HttpClient) {
    super(http);
    this.resourceEndpoint = '/services/details';
  }

  getAllDetailsByService(id: number): Observable<Detail> {
    return this.httpForDet.get<Detail>(`${this.basePath}${this.resourceEndpoint}/findByService?serviceId=${ id }`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }
}
