import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  CustomerCreateAndEditComponent
} from "./customers/profiles/components/customer-create-and-edit/customer-create-and-edit.component";
import {HeaderContentComponent} from "./public/components/header-content/header-content.component";
import { TranslateService } from "@ngx-translate/core";

import { OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from "@angular/material/divider";
import { MatListModule } from "@angular/material/list";
import { BreakpointObserver } from "@angular/cdk/layout";
import {LanguageSwitcherComponent} from "./public/components/language-switcher/language-switcher.component";



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatToolbarModule, MatButtonModule, MatIconModule,
    MatSidenavModule, MatDividerModule, MatListModule, LanguageSwitcherComponent, HeaderContentComponent, CustomerCreateAndEditComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Bliss-Frontend-Web-Application';

  @ViewChild(MatSidenav, {static: true}) sidenav!: MatSidenav;
  options = [
    { icon: 'home', path: '/home', title: 'Home'},
    { icon: 'person', path: '/customer', title: 'Customers'},
    { icon: 'info', path:'/company', title: 'Companies'},
  ];

  constructor(private translate: TranslateService, private observer: BreakpointObserver) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit(): void {
    this.observer.observe(['(max-width: 1280px)'])
      .subscribe((response) => {
        if (response.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
  }
}
