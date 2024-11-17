export class Review {
  id: number;
  stylistId: number;
  customerName: string;
  rating: number;
  comment: string;

  constructor() {
    this.id = 0;
    this.stylistId = 0;
    this.customerName = '';
    this.rating = 0;
    this.comment = '';
  }
}
