export class Reservation {
  id: number;
  customerId: number;
  serviceId: number;
  beautySalonId: number;
  reservationDate: string;
  status: string;

  constructor() {
    this.id = 0;
    this.customerId = 0;
    this.serviceId = 0;
    this.beautySalonId = 0;
    this.reservationDate = '';
    this.status = '';
  }
}
