import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';

import { CommonModule } from '@angular/common';
import { ServiceCardComponent } from '../../components/service-card/service-card.component';
import { PopularSpecialistCardComponent } from '../../components/popular-specialist-card/popular-specialist-card.component';
import { BottomFilterComponent } from '../../components/bottom-filter/bottom-filter.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ServiceCardComponent,PopularSpecialistCardComponent, BottomFilterComponent,MatFormFieldModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
