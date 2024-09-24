import { Routes } from '@angular/router';
import { BookingComponent } from './customers/home-client/pages/booking/booking.component';
import { DetailsComponent } from './customers/home-client/pages/booking/details/details.component';
import { AppComponent } from './app.component';


export const routes: Routes = [
  { path: '', component: AppComponent, children: [
      { path: '', component: BookingComponent },
      { path: 'details/:title', component: DetailsComponent }
    ]}
];
