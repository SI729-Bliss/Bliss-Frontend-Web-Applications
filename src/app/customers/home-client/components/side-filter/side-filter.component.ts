import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-filter',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './side-filter.component.html',
  styleUrl: './side-filter.component.css'
})
export class SideFilterComponent {
  constructor(private router: Router) {}
    filterByCategory(category: string) {
          this.router.navigate(['/searching-services'], { queryParams: { category } });
        }

      toggleDropdown(key: string): void {
          this.dropdownStates[key] = !this.dropdownStates[key];
        }
  dropdownStates: { [key: string]: boolean } = {
      hair: false,
      nails: false,
      makeup: false,
      salon: false,
      category: false
    };
}
