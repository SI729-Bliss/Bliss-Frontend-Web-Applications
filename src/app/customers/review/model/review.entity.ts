// review.entity.ts
export class Review {
  id: number;
  createdAt: string;
  updatedAt: string;
  reservationId: number;
  punctuation: number;
  comment: string;
  reservationInfo: {
    serviceId: number;
    companyId: number;
  };
  imageUrls: string[];

  constructor() {
    this.id = 0;
    this.createdAt = '';
    this.updatedAt = '';
    this.reservationId = 0;
    this.punctuation = 0;
    this.comment = '';
    this.reservationInfo = {
      serviceId: 0,
      companyId: 0
    };
    this.imageUrls = [];
  }
}
