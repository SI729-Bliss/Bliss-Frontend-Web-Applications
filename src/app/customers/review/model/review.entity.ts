// review.entity.ts
export class Review {
  id: number;
  punctuation: number;
  comment: string;
  createdDate: string;
  reservationId: number;
  customerId: number;
  images: string[]; // Add this line

  constructor() {
    this.id = 0;
    this.punctuation = 0;
    this.comment = '';
    this.createdDate = '';
    this.reservationId = 0;
    this.customerId = 0;
    this.images = []; // Initialize the array
  }
}
