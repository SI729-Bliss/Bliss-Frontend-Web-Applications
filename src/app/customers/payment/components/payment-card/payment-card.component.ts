import { ChangeDetectionStrategy, Component, model,inject,OnInit } from '@angular/core';

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
import { ActivatedRoute } from '@angular/router';

import { Payment } from '../../model/payment.entity';
import { PaymentsService } from '../../services/payments.service';
import {AuthenticationService} from "../../../../iam/services/authentication.service";

@Component({
  selector: 'app-payment-card',
  standalone: true,
  imports: [CommonModule,MatButtonModule,FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatListModule, MatDividerModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule,MatRadioModule],
  templateUrl: './payment-card.component.html',
  styleUrl: './payment-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentCardComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  payment: Payment = new Payment();
  predefinedTotalAmount = 60;
  services = [
    { detail: 'Detalle servicio 1', price: 50 },
    { detail: 'Detalle servicio 2', price: 5 },
    { detail: 'Detalle servicio 3', price: 5 }
  ];

  constructor(private paymentService: PaymentsService,
    private route: ActivatedRoute,
     private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.predefinedTotalAmount = +params['totalAmount'] || this.predefinedTotalAmount;
      this.payment.reservationId = +params['reservationId'] || 0; // Obtener reservationId
    });
  }

  openDialog() {
    this.dialog.open(ConfirmationDialogComponent);
  }

  submitPayment() {
    const activeUser = this.authenticationService.getCurrentUserId;
    this.openDialog();
    this.payment.customerId = activeUser;
    this.payment.amount = this.predefinedTotalAmount;
    this.payment.status = 'PENDING';
    this.paymentService.create(this.payment).subscribe(response => {
      console.log('Payment processed:', response);
    });
  }
}
