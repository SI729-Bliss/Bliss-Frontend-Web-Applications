import { Reservation } from './reservation.entity';
import { Service } from './service.entity';
import { BeautySalon } from './beautySalon.entity';

export class ExtendedReservation extends Reservation {
  service: Service;
  beautySalon: BeautySalon;

  constructor() {
    super();
    this.service = new Service();
    this.beautySalon = new BeautySalon();
  }
}
