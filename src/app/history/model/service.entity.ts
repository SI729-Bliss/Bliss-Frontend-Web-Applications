// src/app/history/model/service.entity.ts
export class Service {
  id: number;
  name: string;
  description: string;
  basePrice: number;
  categoryId: number;
  beautySalonId: number;
  image: string;

  constructor() {
    this.id = 0;
    this.name = '';
    this.description = '';
    this.basePrice = 0;
    this.categoryId = 0;
    this.beautySalonId = 0;
    this.image = '';
  }
}
