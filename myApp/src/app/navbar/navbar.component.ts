import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

    navbarData: any = {};

    constructor(private navbarService: NavbarService) {}

    ngOnInit(): void {
      this.loadNavbarData();
    }

    loadNavbarData() {
      this.navbarService.getNavbar().subscribe(data => {
        if (data.length > 0) {
          this.navbarData = data[0];
        }
      });
    }
}
