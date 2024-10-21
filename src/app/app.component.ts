import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderContentComponent } from './public/components/header-content/header-content.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenav, MatSidenavModule } from "@angular/material/sidenav";
import { MatDividerModule } from "@angular/material/divider";
import { MatListModule } from "@angular/material/list";
import { ViewChild } from '@angular/core';
import { TranslateLoader, TranslateModule, TranslateService } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient } from "@angular/common/http";
import { BreakpointObserver } from "@angular/cdk/layout";
import { LanguageSwitcherComponent } from "./public/components/language-switcher/language-switcher.component";
import { BookingComponent } from "./enterprise/services/pages/booking/booking.component";
import { RouterLink } from "@angular/router";
import { NgClass, NgForOf } from "@angular/common";

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule, MatCardModule, MatIconModule, MatGridListModule,
    MatBadgeModule, MatMenuModule, MatSidenavModule, MatDividerModule, MatListModule, TranslateModule,
    HeaderContentComponent, LanguageSwitcherComponent, BookingComponent, NgForOf, NgClass, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [
    {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
    }
  ]
})

export class AppComponent implements OnInit {
  title = 'Bliss-Frontend-Web-Application';

  options = [
    { icon: 'person', path: '/customer', title: 'Customers' },
    { icon: 'person', path: '/company', title: 'Companies' },
    { icon: 'home', path: '/booking', title: 'Booking', class: 'booking-link' },
    { icon: 'info', path: '/citas', title: 'List', class: 'citas-link' },
    { icon: 'info', path: '/catalog', title: 'Catalog'},
    { icon: 'home', path: '/booking', title: 'Booking', class: 'booking-link' },
    { icon: 'info', path: '/citas', title: 'List', class: 'citas-link' },
    { icon: 'info', path: '/catalog', title: 'Catalog'}
  ];

  constructor(private translate: TranslateService, private observer: BreakpointObserver) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit(): void {
    // Lógica de inicialización adicional si es necesaria
  }
}
