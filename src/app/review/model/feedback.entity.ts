
export class Feedback {
  id: number;
  punctuation: number;
  comment: string;
  created_date: string;
  reservation_id: number;
  reservation_day: string;
  beauty_salon_id: number;
  images: string[];
  constructor(
    id: number = 0,
    punctuation: number = 0,
    comment: string = "",
    created_date: string = new Date().toISOString().split("T")[0], // Fecha actual en formato ISO
    reservation_id: number = 0,
    reservation_day: string = "",
    beauty_salon_id: number = 0,
    images: string[] = []
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
