import { Routes } from '@angular/router';

// Imports of enterprise services

import { HomeEnterpriseComponent } from "./enterprise/services/pages/home-enterprise/home-enterprise.component";
import { ServicesManagementComponent } from "./enterprise/services/pages/services-management/services-management.component";


export const routes: Routes = [
  { path: 'home', component: HomeEnterpriseComponent },
  { path: 'services', component: ServicesManagementComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
