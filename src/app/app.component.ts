import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderContentComponent } from './public/components/header-content/header-content.component';

import { OnInit, ViewChild } from "@angular/core";
import { RouterLink } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenav, MatSidenavModule } from "@angular/material/sidenav";
import { MatDividerModule } from "@angular/material/divider";
import { MatListModule } from "@angular/material/list";
import { BreakpointObserver } from "@angular/cdk/layout";
import { TranslateService } from "@ngx-translate/core";
import { LanguageSwitcherComponent } from "./public/components/language-switcher/language-switcher.component";
import { BookingComponent } from "./enterprise/services/pages/booking/booking.component";
import {NgForOf} from "@angular/common";



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderContentComponent, RouterLink, MatToolbarModule, MatButtonModule, MatIconModule,
    MatSidenavModule, MatDividerModule, MatListModule, LanguageSwitcherComponent, BookingComponent, NgForOf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  title = 'Bliss-Frontend-Web-Application';
  @ViewChild('sidenav', { static: true }) sidenav!: MatSidenav;
  opened = true;
  isSidenavVisible = false;
  options = [
    { icon: 'home', path: '/booking', title: 'Booking' },
    { icon: 'info', path: '/citas', title: 'List' },
  ];

  constructor(private translate: TranslateService, private observer: BreakpointObserver) {
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
