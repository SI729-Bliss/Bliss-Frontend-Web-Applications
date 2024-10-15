import {RouterModule, Routes} from '@angular/router';
import { HomeComponent } from "./public/pages/home/home.component";
import { PageNotFoundComponent } from "./public/pages/page-not-found/page-not-found.component";
import {ServicesHistoryComponent} from "./history/pages/services-history/services-history.component";
import {ReviewPageComponent} from "./review/pages/review-page/review-page.component";
import {NgModule} from "@angular/core";

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'my-services', component: ServicesHistoryComponent },
  { path: 'review-page/:id', component: ReviewPageComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
