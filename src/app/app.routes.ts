import { Routes } from '@angular/router';

import { BookingComponent } from "./enterprise/services/pages/booking/booking.component";
import { CitasListComponent } from "./enterprise/services/components/booking-card/booking-card.component";

export const routes: Routes = [
  { path: 'booking', component: BookingComponent },
  { path: 'citas', component: CitasListComponent },
  { path: '', redirectTo: 'booking', pathMatch: 'full' },
];
