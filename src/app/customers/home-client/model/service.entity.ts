export class Service {
  id:number;
  name:string;
  category:string;
  imageUrl: string;
  description:string;
  basePrice:number;
  salonId:string;
  sales:number;

  constructor(){
    this.id = 0;
    this.name ='' ;
    this.category = '';
    this.imageUrl = '';
    this.description = '';
    this.basePrice =0 ;
    this.sales = 0;
    this.salonId = '';
    }
}
