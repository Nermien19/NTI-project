// src/app/admin/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  homeData: any = { greetings: '', name: '', jobTitle: '', nationality: '', description: '' };
  homeList: any[] = [];

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.loadHomeSections();
  }

  loadHomeSections() {
    this.homeService.getHome().subscribe(data => {
      this.homeList = data;
    });
  }

  saveHome() {
    if (this.homeData._id) {
      this.homeService.updateHome(this.homeData._id, this.homeData).subscribe(() => {
        this.loadHomeSections();
        this.clearForm();
      });
    } else {
      this.homeService.addHome(this.homeData).subscribe(() => {
        this.loadHomeSections();
        this.clearForm();
      });
    }
  }

  editHome(home: any) {
    this.homeData = { ...home };
  }

  deleteHome() {
    if (this.homeData._id) {
      this.homeService.deleteHome(this.homeData._id).subscribe(() => {
        this.loadHomeSections();
        this.clearForm();
      });
    }
  }

  clearForm() {
    this.homeData = { greetings: '', name: '', jobTitle: '', nationality: '', description: '' };
  }
}
