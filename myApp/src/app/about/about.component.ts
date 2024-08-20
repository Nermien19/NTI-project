import { Component, OnInit } from '@angular/core';
import { AboutService } from '../services/about.service';
// import { AboutService } from '../services/about.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
 aboutData: any = { title: '', subtitle: '', description: '', image: '' };

  constructor(private aboutService: AboutService) {}

  ngOnInit(): void {
    this.loadAboutData();
  }

  // Fetch the about data from the backend
  loadAboutData() {
    this.aboutService.getAbout().subscribe(data => {
      if (data.length > 0) {
        this.aboutData = data[0]; // Assuming there's always one about document
      }
    });
  }
}
