import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-bottom-filter',
  standalone: true,
  imports: [],
  templateUrl: './bottom-filter.component.html',
  styleUrl: './bottom-filter.component.css'
})
export class BottomFilterComponent {
  constructor(private router: Router) {}

    filterByCategory(category: string) {
      this.router.navigate(['/services-search'], { queryParams: { category } });
    }
}
