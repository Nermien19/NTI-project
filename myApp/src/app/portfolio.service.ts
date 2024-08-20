import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface PortfolioData {
  greetings: string;
  name: string;
  jobTitle: string;
  nationality: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

 // Initial portfolio data
 private portfolioData: PortfolioData = {
  greetings: 'Hello',
  name: 'John Doe',
  jobTitle: 'Software Engineer',
  nationality: 'American',
  description: 'A passionate developer with experience in building full-stack web applications.'
};

// BehaviorSubject to allow components to subscribe and react to changes
private portfolioSubject = new BehaviorSubject<PortfolioData>(this.portfolioData);
portfolioData$ = this.portfolioSubject.asObservable();

getCurrentPortfolioData(): PortfolioData {
  return this.portfolioSubject.getValue();
}
// Method to update the data
updatePortfolioData(newData: PortfolioData) {
  this.portfolioSubject.next(newData);
}
}
