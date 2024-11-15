import { ChangeDetectionStrategy, Component, model,inject } from '@angular/core';

import {CommonModule} from '@angular/common';
/*Select component*/
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
/*Divide*/
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
/*Toggle*/
import {MatButtonToggleModule} from '@angular/material/button-toggle';
/*Checkbox*/
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
/*Dialog*/
import {MatButtonModule} from '@angular/material/button';
import { MatDialog,MatDialogActions,MatDialogClose,MatDialogContent,MatDialogTitle} from '@angular/material/dialog';

import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
@Component({
  selector: 'app-payment-card',
  standalone: true,
  imports: [CommonModule,MatButtonModule,FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatListModule, MatDividerModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule,MatRadioModule],
  templateUrl: './payment-card.component.html',
  styleUrl: './payment-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentCardComponent {
  readonly dialog = inject(MatDialog);

services = [
    { detail: 'Detalle servicio 1', price: '50$' },
    { detail: 'Detalle servicio 2', price: '5$' },
    { detail: 'Detalle servicio 3', price: '5$' }
  ];

  openDialog(){
    this.dialog.open(ConfirmationDialogComponent);
  }
}
