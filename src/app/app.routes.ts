import { Routes} from '@angular/router';
/*Catalog Client*/
import { HomeComponent } from './customers/home-client/pages/home/home.component';
/*Page not found*/
import { PageNotFoundComponent } from "./public/pages/page-not-found/page-not-found.component";
/*Reservations*/
import { ReservationComponent } from "./customers/appointment/pages/reservation/reservation.component";
import { ServicesSearchingComponent } from "./customers/home-client/pages/services-searching/services-searching.component";
/*Services history*/
import {ServicesHistoryComponent} from "./customers/history/pages/services-history/services-history.component";
/*Review client*/
import {ReviewPageComponent} from "./customers/review/pages/review-page/review-page.component";
/*Reservation/Booking*/
/*Authentication*/
import {authenticationGuard} from "./iam/services/authentication.guard";
import {SignInComponent} from "./iam/pages/sign-in/sign-in.component";
import {SignUpComponent} from "./iam/pages/sign-up/sign-up.component";
/*Future services Client*/

import { HomeEnterpriseComponent } from "./enterprise/services/pages/home-enterprise/home-enterprise.component";
import { ServicesManagementComponent } from "./enterprise/services/pages/services-management/services-management.component";
/*Profile*/
import { CustomerCreateAndEditComponent } from './customers/profiles/components/customer-create-and-edit/customer-create-and-edit.component';
import { CompanyCreateAndEditComponent } from './enterprise/profiles/components/company-create-and-edit/company-create-and-edit.component';
/*Payment Client*/
import { PaymentComponent } from './customers/payment/pages/payment/payment.component';
export const routes: Routes = [

  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent},
  /*Client*/
  { path: 'catalog', component: HomeComponent , canActivate: [authenticationGuard]},
  { path: 'services-history', component: ServicesHistoryComponent  , canActivate: [authenticationGuard]},
  { path: 'booking',component:ReservationComponent , canActivate: [authenticationGuard]},
  {path: 'searching-services', component: ServicesSearchingComponent , canActivate: [authenticationGuard]},

  { path: 'review-page/:id', component: ReviewPageComponent , canActivate: [authenticationGuard] },
  { path: 'review-page', component: ReviewPageComponent , canActivate: [authenticationGuard] },
  { path: 'customerProfile', component: CustomerCreateAndEditComponent},
  {path: 'payment', component:PaymentComponent},
  /*Enterprise*/
  { path: 'my-services', component: HomeEnterpriseComponent , canActivate: [authenticationGuard] },
  { path: 'services', component: ServicesManagementComponent  , canActivate: [authenticationGuard]},
  { path: 'service-details/:id', component: ServicesManagementComponent , canActivate: [authenticationGuard] },
  { path: 'companyProfile', component: CompanyCreateAndEditComponent , canActivate: [authenticationGuard] },

  { path: '', redirectTo: 'catalog', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

