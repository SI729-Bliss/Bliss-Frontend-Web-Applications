import { Injectable } from '@angular/core';

import { BaseService } from "../../../shared/services/base.service";
import { HttpClient } from "@angular/common/http";
import { Entservice } from "../model/entservice.entity";
import {catchError, Observable, retry} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EntsevicesService extends BaseService<Entservice>{

  salonContextId: number;

  constructor(http: HttpClient, private httpForEnt: HttpClient) {
    super(http);
    this.resourceEndpoint = '/services';
    this.salonContextId = 0;
  }

  getSalonContextId(): number {
    return this.salonContextId;
  }

  getAllServicesBySalonId(): Observable<Entservice> {
    return this.httpForEnt.get<Entservice>(`${this.basePath}${this.resourceEndpoint}?beauty_salon_id=${ this.salonContextId }`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
