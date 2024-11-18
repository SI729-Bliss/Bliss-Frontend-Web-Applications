import { Component, inject,onInit } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { PaymentsService } from '../../services/payments.service';
import { Payment } from '../../model/payment.entity';

@Component({
  selector: 'app-dialog-payment-reservation',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent],
  templateUrl: './dialog-payment-reservation.component.html',
  styleUrl: './dialog-payment-reservation.component.css'
})
export class DialogPaymentReservationComponent implements OnInit{

  payment: Payment | null = null;
    reservationId: number;

    constructor(
      @inject(MAT_DIALOG_DATA) public data: any,
      private paymentsService: PaymentsService
    ) {
      this.reservationId = data.reservationId;
    }

    ngOnInit(): void {
      this.paymentsService.getPaymentByReservationId(this.reservationId).subscribe(
        (payment) => {
          this.payment = payment;
        },
        (error) => {
          console.error('Error fetching payment:', error);
        }
      );
    }
}
