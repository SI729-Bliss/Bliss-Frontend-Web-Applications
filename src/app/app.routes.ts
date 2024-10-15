import { Routes } from '@angular/router';

import { HomeComponent } from './customers/home-client/pages/home/home.component';
import { PageNotFoundComponent } from './public/pages/page-not-found/page-not-found.component';

export const routes: Routes = [
    { path: 'catalog', component: HomeComponent },
    { path: '', redirectTo: 'catalog', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
  ];
