import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import {
  ReviewCreateAndEditComponent,
} from './review/components/review-create-and-edit/review-create-and-edit.component';
import {ReviewListComponent} from "./review/components/review-list/review-list.component";

export const routes: Routes = [
  { path: '', component: ReviewCreateAndEditComponent },
  { path: 'reviews', component: ReviewListComponent },
];
