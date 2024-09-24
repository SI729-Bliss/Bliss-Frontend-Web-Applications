import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './public/pages/page-not-found/page-not-found.component';
import { CustomerCreateAndEditComponent } from './customers/profiles/components/customer-create-and-edit/customer-create-and-edit.component';
import { CompanyCreateAndEditComponent } from './companies/profiles/components/company-create-and-edit/company-create-and-edit.component';

export const routes: Routes = [
  { path: 'customer', component: CustomerCreateAndEditComponent },
  { path: 'company', component: CompanyCreateAndEditComponent },
  { path: '', redirectTo: 'customer', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
