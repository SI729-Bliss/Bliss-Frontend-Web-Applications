import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { BaseService } from "../../../shared/services/base.service";
import { HttpClient } from "@angular/common/http";
import { Entservice } from "../model/entservice.entity";
import {catchError, Observable, retry} from "rxjs";

import {AuthenticationService} from "../../../iam/services/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class EntsevicesService extends BaseService<Entservice>{

  salonContextId: number;

  constructor(http: HttpClient, private httpForEnt: HttpClient, private authentication: AuthenticationService) {
    super(http);
    this.resourceEndpoint = '/services';
    this.salonContextId = 0;
  }

  getSalonContextId() {
    this.authentication.currentUserId.subscribe((response: any) => {
      console.log(response);
      this.salonContextId = response;
    })
    //console.log("id" + this.salonContextId)
  }

  getAllServicesBySalonId(): Observable<Entservice> {
    //console.log("id in get " + this.salonContextId)
    return this.httpForEnt.get<Entservice>(`${this.basePath}${this.resourceEndpoint}/findBySalon?BeautySalonId=${ this.salonContextId }`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
