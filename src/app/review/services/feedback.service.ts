import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BaseService } from "../../shared/services/base.service";
import { HttpClient } from "@angular/common/http";
import { Feedback } from "../model/feedback.entity";
@Injectable({
  providedIn: 'root'
})
export class FeedbackService extends BaseService<Feedback> {

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/review';
  }
}
