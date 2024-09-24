import { Injectable } from '@angular/core';

import { BaseService } from "../../../shared/services/base.service";
import { HttpClient } from "@angular/common/http";
import { Entservice } from "../model/entservice.entity";

@Injectable({
  providedIn: 'root'
})
export class EntsevicesService extends BaseService<Entservice>{

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/services';
  }
}
