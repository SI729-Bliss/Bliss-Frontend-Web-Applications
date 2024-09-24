import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() card: any;
  @Input() newCards: any[] = [];

  constructor(private router: Router) {}

  navigateToDetails() {
    this.router.navigate(['/details', this.card.title]);
  }
}
