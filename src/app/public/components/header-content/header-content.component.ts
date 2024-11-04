import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LanguageSwitcherComponent } from "../language-switcher/language-switcher.component";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {BreakpointObserver} from "@angular/cdk/layout";



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
      'bc.hello',
      'List',
      'Catalog',
      'Services History',
      'Customer',
      'Company',
      'Booking',
      'ServiceM',
      'He',
    ]).subscribe(translations => {
      this.options = [
        { icon: 'home', path: '/booking', title: translations['Booking'] },
        { icon: 'info', path: '/citas', title: translations['List'] },
        { icon: 'info', path: '/catalog', title: translations['Catalog'] },
        { icon: 'info', path: '/my-services', title: translations['Services History'] },
        { icon: 'person', path: '/customerProfile', title: translations['Customer'] },
        { icon: 'person', path: '/companyProfile', title: translations['Company'] },
        { icon: 'info', path: '/services', title: translations['ServiceM'] },
        { icon: 'info', path: '/homeEnterprise', title: translations['He'] },
      ];
    });
  }
}
