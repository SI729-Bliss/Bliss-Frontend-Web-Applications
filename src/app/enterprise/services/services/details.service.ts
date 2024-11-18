import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base.service";
import {Detail} from "../model/detail.entity";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DetailsService extends BaseService<Detail>{

  constructor(http: HttpClient, private httpForEnt: HttpClient) {
    super(http);
    this.resourceEndpoint = '/services/details';
  }
}
