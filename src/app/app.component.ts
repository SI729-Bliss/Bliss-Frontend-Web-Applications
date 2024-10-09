import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomerCreateAndEditComponent } from "./customers/profiles/components/customer-create-and-edit/customer-create-and-edit.component";
import { HeaderContentComponent } from "./public/components/header-content/header-content.component";
import { TranslateService } from "@ngx-translate/core";
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LanguageSwitcherComponent } from "./public/components/language-switcher/language-switcher.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    LanguageSwitcherComponent,
    HeaderContentComponent,
    CustomerCreateAndEditComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Bliss-Frontend-Web-Application';

  options = [
    { icon: 'person', path: '/customer', title: 'Customers' },
    { icon: 'person', path: '/company', title: 'Companies' }
  ];

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit(): void {
    // Lógica de inicialización adicional si es necesaria
  }
}
