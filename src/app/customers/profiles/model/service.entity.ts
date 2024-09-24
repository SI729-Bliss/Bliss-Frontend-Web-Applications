export class Service {
  language: string;
  stars: number;
  serviceCategory: string;
  description: string;
  price: string;
  image: string;

  constructor() {
    this.language = '';
    this.stars = 0;
    this.serviceCategory = '';
    this.description = '';
    this.price = '';
    this.image = '';
  }
}
