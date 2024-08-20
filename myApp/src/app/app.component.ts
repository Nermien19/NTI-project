import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'myApp';
  isAdminRoute = false; // Add the isAdminRoute property

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkAdminRoute(event.urlAfterRedirects);
      }
    });
  }

  checkAdminRoute(url: string) {
    this.isAdminRoute = url.startsWith('/admin');
  }
}
