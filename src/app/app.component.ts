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
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatDividerModule } from "@angular/material/divider";
import { MatListModule } from "@angular/material/list";
import { TranslateLoader, TranslateModule, TranslateService } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient } from "@angular/common/http";
import { LanguageSwitcherComponent } from "./public/components/language-switcher/language-switcher.component";
import { RouterLink } from "@angular/router";
import { NgClass, NgForOf } from "@angular/common";
import {ScrollControlService} from "./shared/services/style.service";
import { AuthenticationSectionComponent } from "./iam/components/authentication-section/authentication-section.component";

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule, MatCardModule, MatIconModule, MatGridListModule,
    MatBadgeModule, MatMenuModule, MatSidenavModule, MatDividerModule, MatListModule, TranslateModule,
    HeaderContentComponent, LanguageSwitcherComponent, NgForOf, NgClass, RouterLink, AuthenticationSectionComponent],
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

export class AppComponent {
  title = 'Bliss-Frontend-Web-Application';
  constructor(private scrollControlService: ScrollControlService) {} // Inyecta el servicio

}

