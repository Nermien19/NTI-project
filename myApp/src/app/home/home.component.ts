// src/app/portfolio/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  homeData: any = {};

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.loadHomeData();
  }

  loadHomeData() {
    this.homeService.getHome().subscribe(data => {
      this.homeData = data.length ? data[0] : {};
    });
  }
}
