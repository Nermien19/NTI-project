import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../services/portfolio.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent implements OnInit {
  portfolioData: any;

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.loadPortfolio();
  }

  loadPortfolio() {
    this.portfolioService.getPortfolio().subscribe(data => {
      this.portfolioData = data[0];
    });
  }
}
