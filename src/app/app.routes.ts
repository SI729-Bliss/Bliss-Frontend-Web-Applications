import {RouterModule, Routes} from '@angular/router';
import { HomeComponent } from "./public/pages/home/home.component";
import { PageNotFoundComponent } from "./public/pages/page-not-found/page-not-found.component";
import {ServicesHistoryComponent} from "./history/pages/services-history/services-history.component";
import {ReviewPageComponent} from "./review/pages/review-page/review-page.component";
import {NgModule} from "@angular/core";
import { BookingComponent } from "./enterprise/services/pages/booking/booking.component";
import { CitasListComponent } from "./enterprise/services/components/booking-card/booking-card.component";

import { HomeEnterpriseComponent } from "./enterprise/services/pages/home-enterprise/home-enterprise.component";
import { ServicesManagementComponent } from "./enterprise/services/pages/services-management/services-management.component";

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'my-services', component: ServicesHistoryComponent },
  { path: 'review-page/:id', component: ReviewPageComponent },
  { path: 'review-page', component: ReviewPageComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'booking', component: BookingComponent },
  { path: 'citas', component: CitasListComponent },
  { path: '**', component: PageNotFoundComponent },

  { path: 'homeEnterprise', component: HomeEnterpriseComponent },
  { path: 'services', component: ServicesManagementComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
