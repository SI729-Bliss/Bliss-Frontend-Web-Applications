import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { OnInit, ViewChild } from '@angular/core';
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import { LanguageSwitcherComponent } from "./public/components/language-switcher/language-switcher.component";
import {BreakpointObserver} from "@angular/cdk/layout";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {HttpClient} from "@angular/common/http";
import {HeaderContentComponent} from "./public/components/header-content/header-content.component";
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatGridListModule,
    MatBadgeModule,
    MatMenuModule, TranslateModule, HeaderContentComponent],

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

  constructor(private translate: TranslateService, private observer: BreakpointObserver) {
  title = 'Bliss-Frontend-Web-Application';

    translate.setDefaultLang('en');
    translate.use('en');
  }
}
