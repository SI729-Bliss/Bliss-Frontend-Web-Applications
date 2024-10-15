import { Component } from '@angular/core';

import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LanguageSwitcherComponent } from "../language-switcher/language-switcher.component";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: 'app-header-content',
  standalone: true,
  imports: [RouterLink, MatToolbarModule, MatButtonModule, MatIconModule, LanguageSwitcherComponent, TranslateModule],
  templateUrl: './header-content.component.html',
  styleUrl: './header-content.component.css'
})
export class HeaderContentComponent {
  optionsEnt = [
    { path: '/home', title: 'Home'},
    { path: '/my-services', title: 'My Services'},
    { path: '/my-schedule', title: 'Schedule'},
  ];
  optionsCli = [
    { path: '/catalog', title: 'Catalog'},
    { path: '/my-reservations', title: 'My Reservations'},
    { path: '/my-services', title: 'Services History'}, // Updated path
  ];
  options = [
    /* CLIENT VIEWS */
    { path: '/catalog', title: 'Catalog'},
    { path: '/my-reservations', title: 'My Reservations'},
    { path: '/my-services', title: 'Services History'}, // Updated path

    /* ENTERPRISE VIEWS */
    { path: '/home', title: 'Home'},
    { path: '/my-services', title: 'My Services'},
    { path: '/my-schedule', title: 'Schedule'},
  ];
}
