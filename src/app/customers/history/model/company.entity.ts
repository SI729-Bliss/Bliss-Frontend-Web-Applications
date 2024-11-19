export class Company {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  rating: number;

  constructor() {
    this.id = 0;
    this.name = '';
    this.email = '';
    this.phoneNumber = '';
    this.address = '';
    this.rating = 0;
  }
}
