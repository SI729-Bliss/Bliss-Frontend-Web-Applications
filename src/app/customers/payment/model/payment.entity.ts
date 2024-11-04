export class Payment {
  id: number;
  date: string;
  paymentMethod: string;
  amount: number;
  ticketId: number;
  customerId: number;

  constructor(){
    this.id = 0;
    this.date = '';
    this.paymentMethod = '';
    this.amount = 0;
    this.ticketId = 0;
    this.customerId = 0;}
}
