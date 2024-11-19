export class Service {
  id: number;
  name: string;
  categoryId: number;
  imageUrl: string;
  description: string;
  basePrice: number;
  salonId: number;

  constructor() {
    this.id = 0;
    this.name = '';
    this.categoryId = 0;
    this.imageUrl = '';
    this.description = '';
    this.basePrice = 0;
    this.salonId = 0;
  }
}
