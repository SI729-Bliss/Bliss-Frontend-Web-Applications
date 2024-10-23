import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScrollControlService {
  constructor(private router: Router) {
    this.router.events.pipe(
      // Filtrar solo los eventos de tipo NavigationEnd
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.controlScroll(event.urlAfterRedirects); // controla scroll segun el path
    });
  }

  private controlScroll(url: string): void {
    //paths donde se eliminara el scroll
    if (url === '/customerProfile' || url === '/companyProfile') {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = 'auto';
    }
  }
}
