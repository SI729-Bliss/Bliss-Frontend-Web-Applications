import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { NewCardComponent } from './newcard/newcard.component';

@NgModule({
  declarations: [CardComponent, NewCardComponent], // Declarar el nuevo componente
  imports: [CommonModule],
  exports: [CardComponent, NewCardComponent]
})
export class CardModule {}
