import { Injectable } from '@angular/core';

import { BaseService } from "../../../shared/services/base.service";
import { HttpClient } from "@angular/common/http";
import {Payment} from "../model/payment.entity";


@Injectable({
  providedIn: 'root'
})
export class PaymentsService extends BaseService<Payment>{

  constructor(http: HttpClient) {
         super(http);
         this.resourceEndpoint = '/payments';
       }
}
