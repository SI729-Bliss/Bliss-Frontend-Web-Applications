export class Service {
  id:number;
  name:string;
  description:string;
  basePrice:number;
  categoryId:number;
  beautySalon:string;
  sales:number;
  rating:number;
  image: string;
  constructor(){
    this.id = 0;
    this.name ='' ;
    this.description = '';
    this.basePrice =0 ;
    this.categoryId = 0;
    this.sales = 0;
    this.rating = 0;
    this.beautySalon = '';
    this.image = '';
    }
}
