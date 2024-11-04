// src/app/history/model/beauty_salon.entity.ts
export class BeautySalon {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;

  constructor() {
    this.id = 0;
    this.name = '';
    this.email = '';
    this.phone = '';
    this.address = '';
    this.password = '';
  }
}
