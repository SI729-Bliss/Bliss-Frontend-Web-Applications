export class Reservation {
  id: number;
  customerId: number;
  serviceId: number;
  companyId: number;
  bookingDate: string;
  bookingTime: string;
  bookingStatus: boolean;
  message?: string;
  requirements?: string;

  constructor() {
    this.id = 0;
    this.customerId = 0;
    this.serviceId = 0;
    this.companyId = 0;
    this.bookingDate = '';
    this.bookingTime = '';
    this.bookingStatus = false;
    this.message = '';
    this.requirements = '';
  }
}
