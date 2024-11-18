export class Entservice {
  id: number;
  name: string;
  categoryId: string;
  imageUrl: string;
  description: string;
  basePrice: number;
  salonId: number;

  constructor() {
    this.id = 0;
    this.name = "";
    this.categoryId = "";
    this.imageUrl = "";
    this.description = "";
    this.basePrice = 0;
    this.salonId = 0;
  }
}
