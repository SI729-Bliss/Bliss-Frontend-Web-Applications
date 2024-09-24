import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-new-card',
  templateUrl: './newcard.component.html',
  styleUrls: ['./newcard.component.css']
})
export class NewCardComponent {
  @Input() newCard: any;
}
