import { ChangeDetectionStrategy, Component, model } from '@angular/core';

/*Select component*/
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
/*Divide*/
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
/*Slide*/
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
/*Checkbox*/
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';

import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-payment-card',
  standalone: true,
  imports: [MatButtonModule,FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatListModule, MatDividerModule, MatSlideToggleModule, MatCardModule, MatCheckboxModule,MatRadioModule],
  templateUrl: './payment-card.component.html',
  styleUrl: './payment-card.component.css'
})
export class PaymentCardComponent {
}
