export class Service {
  id: any
  language: string;
  rating: number;
  name: string;
  description: string;
  sales: number;
  basePrice: string;
  image: string;

  constructor() {
    this.language = '';
    this.rating = 0;
    this.name = '';
    this.description = '';
    this.sales = 0;
    this.basePrice = '';
    this.image = '';
  }
}
