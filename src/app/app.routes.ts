import { RouterModule,Routes } from '@angular/router';
import { ReviewManagementComponent } from "./review/pages/review-management/review-management.component";
import { ServicesHistoryComponent } from "./review/pages/services-history/services-history.component";
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: 'myservices', component: ServicesHistoryComponent },
  { path: 'review', component: ReviewManagementComponent },
  { path: '', redirectTo: 'review', pathMatch: 'full' },  // Ruta por defecto
  { path: '**', redirectTo: 'review' }  // Redirige a 'myservices' si la ruta no existe
];
