import {Time} from "@angular/common";

export class Booking {
  id: number;
  customerId: number;
  serviceId: number;
  companyId: number;
  totalAmount: number;
  bookingDate: Date;
  bookingStatus: boolean;
  requirements: string[];

  constructor() {
    this.id = 0;
    this.customerId = 0;
    this.serviceId = 0;
    this.companyId = 0;
    this.totalAmount = 0;
    this.bookingDate = new Date();
    this.bookingStatus = false;
    this.requirements = [];
  }
}
