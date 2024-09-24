import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from './card/card.module';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, TranslateModule, CardModule],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent {
  popularTags: string[] = ['Manicure', 'Eyeshadow', 'Curly'];
  price: number = 50;

  cards = [
    { title: "Vera's Salon", description: 'We focus on ergonomics and meeting you where you work. it`s only a keystroke away.' },
    { title: 'My Lucky', description: 'We focus on ergonomics and meeting you where you work. it`s only a keystroke away.' },
  ];

  newCards = [
    { title: 'SOHO', subtitle:"Simple gel nail",  description: 'Our haircut service offers a personalized experience taoiloned to your style and preferences' },
    { title: 'HoneyMoon', subtitle:"Botox Treat",  description: 'We focus on ergonomics and meeting you where you work. It`s only a keystroke away' },
  ];

  removeTag(tag: string) {
    this.popularTags = this.popularTags.filter(t => t !== tag);
  }

  updatePrice(event: any) {
    this.price = event.target.value;
  }
}
