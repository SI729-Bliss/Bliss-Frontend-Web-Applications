import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LanguageSwitcherComponent } from "../language-switcher/language-switcher.component";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {BreakpointObserver} from "@angular/cdk/layout";
import {
  AuthenticationSectionComponent
} from "../../../iam/components/authentication-section/authentication-section.component";



@Component({
  selector: 'app-header-content',
  standalone: true,
  imports: [
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    LanguageSwitcherComponent,
    TranslateModule,
    AuthenticationSectionComponent,
  ],
  templateUrl: './header-content.component.html',
  styleUrl: './header-content.component.css'
})


export class HeaderContentComponent implements OnInit{

  options: any[] = [];
  constructor(private translate: TranslateService, private observer: BreakpointObserver) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit(): void {
    // Cargar las traducciones de forma asíncrona
    this.loadTranslations();

    // Escuchar cambios de idioma para actualizar las traducciones dinámicamente
    this.translate.onLangChange.subscribe(() => {
      this.loadTranslations();
    });
  }
  loadTranslations(): void {
    this.translate.get([
      'BLISS',
      'Catalog',
      'Services History',
      'CustomerPr',
      'CompanyPr',
      'Booking',
      'ServiceM',
      'My Services',
    ]).subscribe(translations => {
      this.options = [
        { icon: 'info', path: '/catalog', title: translations['Catalog'] },
        { icon: 'info', path: '/services-history', title: translations['Services History'] },
        { icon: 'person', path: '/customerProfile', title: translations['CustomerPr'] },

        { icon: 'person', path: '/companyProfile', title: translations['CompanyPr'] },
        { icon: 'info', path: '/my-services', title: translations['My Services'] },
      ];
    });
  }
}
