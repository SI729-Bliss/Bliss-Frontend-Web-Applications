export class Service {
  id: number;
  customerId: number;
  serviceId: number;
  companyId: number;
  bookingDate: Date;
  bookingTime: {
    hour: number;
    minute: number;
  };
  bookingStatus: boolean;
  requirements: string[];
  totalAmount: number;

  constructor() {
    this.id = 0;
    this.customerId = 0;
    this.serviceId = 0;
    this.companyId = 0;
    this.bookingDate = new Date();
    this.bookingTime = {
      hour: 0,
      minute: 0,
    };
    this.bookingStatus = false;
    this.requirements = [];
    this.totalAmount = 0;
  }
}
