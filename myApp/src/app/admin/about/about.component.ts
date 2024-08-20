import { Component, OnInit } from '@angular/core';
import { AboutService } from '../../services/about.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent  implements OnInit {
  aboutData: any = { title: '', description: '', imageUrl: '' };

  constructor(private aboutService: AboutService  , private router: Router) {}

  ngOnInit(): void {
    this.aboutService.getAbout().subscribe(data => {
      this.aboutData = data[0];
    });
  }

  saveAbout() {
    this.aboutService.updateAbout(this.aboutData._id, this.aboutData).subscribe(response => {
      console.log('About section updated successfully!');
    });
  }
}{

}
