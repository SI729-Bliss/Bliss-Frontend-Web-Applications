import {RouterModule, Routes} from '@angular/router';
import { HomeComponent } from "./public/pages/home/home.component";
import { PageNotFoundComponent } from "./public/pages/page-not-found/page-not-found.component";
import {ServicesHistoryComponent} from "./history/pages/services-history/services-history.component";
import {ReviewPageComponent} from "./review/pages/review-page/review-page.component";
import {NgModule} from "@angular/core";
import { BookingComponent } from "./enterprise/services/pages/booking/booking.component";
import { CitasListComponent } from "./enterprise/services/components/booking-card/booking-card.component";

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'my-services', component: ServicesHistoryComponent },
  { path: 'review-page/:id', component: ReviewPageComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'booking', component: BookingComponent },
  { path: 'citas', component: CitasListComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

