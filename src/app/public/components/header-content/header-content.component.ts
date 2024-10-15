import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LanguageSwitcherComponent } from "../language-switcher/language-switcher.component";
import { TranslateModule } from "@ngx-translate/core";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-header-content',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, LanguageSwitcherComponent, TranslateModule, NgIf],
  templateUrl: './header-content.component.html',
  styleUrl: './header-content.component.css'
})
export class HeaderContentComponent {
  @Input() isSidenavVisible!: boolean;
  @Output() toggleSidenavEvent = new EventEmitter<void>();

  toggleSidenav() {
    this.toggleSidenavEvent.emit();
  }
}
