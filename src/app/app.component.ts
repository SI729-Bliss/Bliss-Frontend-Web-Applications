import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderContentComponent } from './public/components/header-content/header-content.component';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderContentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Bliss-Frontend-Web-Application';

  constructor(translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }
}
