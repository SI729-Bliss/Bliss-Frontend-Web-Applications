import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import { OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from "@angular/cdk/layout";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import { LanguageSwitcherComponent } from "./public/components/language-switcher/language-switcher.component";
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatAnchor} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardSubtitle
} from "@angular/material/card";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatToolbarModule, RouterOutlet, RouterLink, LanguageSwitcherComponent, MatAnchor, MatIcon,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardFooter,
    MatCardHeader,
    MatCardSubtitle, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'webAplication';
  ngOnInit(): void {
  }
}
