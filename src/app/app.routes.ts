import { Routes} from '@angular/router';
/*Catalog Client*/
import { HomeComponent } from './customers/home-client/pages/home/home.component';
/*Page not found*/
import { PageNotFoundComponent } from "./public/pages/page-not-found/page-not-found.component";
/*Services history*/
import {ServicesHistoryComponent} from "./customers/history/pages/services-history/services-history.component";
/*Review client*/
import {ReviewPageComponent} from "./customers/review/pages/review-page/review-page.component";
/*Reservation/Booking*/
import { BookingComponent } from "./enterprise/services/pages/booking/booking.component";
/*Future services Client*/
import { CitasListComponent } from "./enterprise/services/components/booking-card/booking-card.component";

import { HomeEnterpriseComponent } from "./enterprise/services/pages/home-enterprise/home-enterprise.component";
import { ServicesManagementComponent } from "./enterprise/services/pages/services-management/services-management.component";
/*Profile*/
import { CustomerCreateAndEditComponent } from './customers/profiles/components/customer-create-and-edit/customer-create-and-edit.component';
import { CompanyCreateAndEditComponent } from './enterprise/profiles/components/company-create-and-edit/company-create-and-edit.component';
/*Payment Client*/
import { PaymentComponent } from './customers/payment/pages/payment/payment.component';
export const routes: Routes = [
  /*Client*/
  { path: 'catalog', component: HomeComponent },
  { path: 'services-history', component: ServicesHistoryComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'my-reservations', component: CitasListComponent },
  { path: 'review-page/:id', component: ReviewPageComponent },
  { path: 'review-page', component: ReviewPageComponent },
  { path: 'customerProfile', component: CustomerCreateAndEditComponent },
  {path: 'payment', component:PaymentComponent},
  /*Enterprise*/
  { path: 'my-services', component: HomeEnterpriseComponent },
  { path: 'services', component: ServicesManagementComponent },
  { path: 'service-details/:id', component: ServicesManagementComponent },
  { path: 'companyProfile', component: CompanyCreateAndEditComponent },

  { path: '', redirectTo: 'customerProfile', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

