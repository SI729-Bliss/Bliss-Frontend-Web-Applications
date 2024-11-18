export class Payment {
  id: number;
  date: string;
  amount: number;
  paymentMethod: string;
  status: string;
  invoiceType: string;
  reservationId: number;
  customerId: number;

  constructor(){
    this.id = 0;
    this.date = '';
    this.amount = 0;
    this.paymentMethod = '';
    this.status = '';
    this.invoiceType = '';
    this.reservationId = 0;
    this.customerId = 0;
  }
}
