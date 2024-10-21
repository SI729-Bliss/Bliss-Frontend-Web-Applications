import { HomeComponent } from './customers/home-client/pages/home/home.component';
import { Routes} from '@angular/router';
import { PageNotFoundComponent } from "./public/pages/page-not-found/page-not-found.component";
import {ServicesHistoryComponent} from "./history/pages/services-history/services-history.component";
import {ReviewPageComponent} from "./review/pages/review-page/review-page.component";
import { BookingComponent } from "./enterprise/services/pages/booking/booking.component";
import { CitasListComponent } from "./enterprise/services/components/booking-card/booking-card.component";

import { HomeEnterpriseComponent } from "./enterprise/services/pages/home-enterprise/home-enterprise.component";
import { ServicesManagementComponent } from "./enterprise/services/pages/services-management/services-management.component";
import { CustomerCreateAndEditComponent } from './customers/profiles/components/customer-create-and-edit/customer-create-and-edit.component';
import { CompanyCreateAndEditComponent } from './companies/profiles/components/company-create-and-edit/company-create-and-edit.component';


export const routes: Routes = [

  { path: 'catalog', component: HomeComponent },
  { path: 'my-services', component: ServicesHistoryComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'citas', component: CitasListComponent },
  { path: 'homeEnterprise', component: HomeEnterpriseComponent },

  { path: 'review-page/:id', component: ReviewPageComponent },
  { path: 'review-page', component: ReviewPageComponent },
  { path: 'services', component: ServicesManagementComponent },
  { path: 'service-details/:id', component: ServicesManagementComponent },

  { path: 'customerProfile', component: CustomerCreateAndEditComponent },
  { path: 'companyProfile', component: CompanyCreateAndEditComponent },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

