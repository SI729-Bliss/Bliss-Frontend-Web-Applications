import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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
import { OnInit, ViewChild } from '@angular/core';
import { TranslateLoader, TranslateModule, TranslateService } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient } from "@angular/common/http";
import { BreakpointObserver } from "@angular/cdk/layout";
import { LanguageSwitcherComponent } from "./public/components/language-switcher/language-switcher.component";
import { HeaderContentComponent } from "./public/components/header-content/header-content.component";
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
  title: string = 'Bliss-Frontend-Web-Application';
  @ViewChild(MatSidenav, { static: true }) sidenav!: MatSidenav;
  opened = true;
  isSidenavVisible = false;
  options = [
    { icon: 'home', path: '/booking', title: 'Booking', class: 'booking-link' },
    { icon: 'info', path: '/citas', title: 'List', class: 'citas-link' },
  ];

  constructor(translate: TranslateService, private observer: BreakpointObserver) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit(): void {
    this.observer.observe(['(max-width: 1280px)'])
      .subscribe((response) => {
        this.isSidenavVisible = !response.matches;
        if (response.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }
}
