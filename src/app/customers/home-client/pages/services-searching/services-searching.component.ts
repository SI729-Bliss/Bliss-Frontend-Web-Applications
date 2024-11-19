import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from '../../services/services.service';
import { Service } from '../../model/service.entity';
import { FilteredCardComponent } from '../../components/filtered-card/filtered-card.component';
import { Location } from '@angular/common';
@Component({
  selector: 'app-services-searching',
  standalone: true,
  imports: [FilteredCardComponent, CommonModule],
  templateUrl: './services-searching.component.html',
  styleUrl: './services-searching.component.css'
})
export class ServicesSearchingComponent  implements OnInit {
  selectedCategory: string = '';

    constructor(
      private route: ActivatedRoute,
      private servicesService: ServicesService,
      private location: Location
    ) {}

    ngOnInit() {
      this.route.queryParams.subscribe(params => {
        this.selectedCategory = params['category'] || '';
      });
    }
    goBack(): void {
        this.location.back();
      }
}
