export class Review {
  id: number;
  punctuation: number;
  comment: string;
  created_date: string;
  reservation_id: number;
  reservation_day: string;
  beauty_salon_id: number;
  images: string[];

  constructor(
    id: number,
    punctuation: number,
    comment: string,
    created_date: string,
    reservation_id: number,
    reservation_day: string,
    beauty_salon_id: number,
    images: string[]
  ) {
    this.id = id;
    this.punctuation = punctuation;
    this.comment = comment;
    this.created_date = created_date;
    this.reservation_id = reservation_id;
    this.reservation_day = reservation_day;
    this.beauty_salon_id = beauty_salon_id;
    this.images = images;
  }
}
