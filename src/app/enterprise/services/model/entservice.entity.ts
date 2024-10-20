export class Entservice {
  id: number;
  name: string;
  categoryId: string;
  imageUrl: string;
  description: string;
  basePrice: number;
  beauty_salon_id: number;

  constructor() {
    this.id = 0;
    this.name = "";
    this.categoryId = "";
    this.imageUrl = "";
    this.description = "";
    this.basePrice = 0;
    this.beauty_salon_id = 0;
  }
}
