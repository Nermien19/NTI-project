import { Component, OnInit } from '@angular/core';
import { PortfolioData, PortfolioService } from '../portfolio.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  portfolioData!: PortfolioData;

  constructor(private portfolioService: PortfolioService) { }

  ngOnInit(): void {
    this.portfolioService.portfolioData$.subscribe(data => {
      this.portfolioData = data;
    });
  }

}
