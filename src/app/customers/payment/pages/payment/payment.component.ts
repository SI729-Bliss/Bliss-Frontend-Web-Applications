import { Component } from '@angular/core';
import { PaymentCardComponent } from '../../components/payment-card/payment-card.component';
@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [PaymentCardComponent],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {

}
