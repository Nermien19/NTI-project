// // src/app/admin/home/home.component.ts
// import { Component, OnInit } from '@angular/core';
// import { HomeService } from '../../services/home.service';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css']
// })
// export class HomeComponent implements OnInit {
//   homeData: any = { greetings: '', name: '', jobTitle: '', nationality: '', description: '' };
//   homeList: any[] = [];

//   constructor(private homeService: HomeService) {}

//   ngOnInit(): void {
//     this.loadHomeSections();
//   }

//   loadHomeSections() {
//     this.homeService.getHome().subscribe(data => {
//       this.homeList = data;
//     });
//   }

//   saveHome() {
//     if (this.homeData._id) {
//       this.homeService.updateHome(this.homeData._id, this.homeData).subscribe(() => {
//         this.loadHomeSections();
//         this.clearForm();
//       });
//     } else {
//       this.homeService.addHome(this.homeData).subscribe(() => {
//         this.loadHomeSections();
//         this.clearForm();
//       });
//     }
//   }

//   editHome(home: any) {
//     this.homeData = { ...home };
//   }

//   deleteHome() {
//     if (this.homeData._id) {
//       this.homeService.deleteHome(this.homeData._id).subscribe(() => {
//         this.loadHomeSections();
//         this.clearForm();
//       });
//     }
//   }

//   clearForm() {
//     this.homeData = { greetings: '', name: '', jobTitle: '', nationality: '', description: '' };
//   }
// }

import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  homeData: any = { greetings: '', name: '', jobTitle: '', nationality: '', description: '', image: '' };
  homeList: any[] = [];
  selectedFile: File | null = null;

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.loadHomeSections();
  }

  loadHomeSections() {
    this.homeService.getHome().subscribe(data => {
      this.homeList = data;
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  saveHome() {
    const formData = new FormData();
    formData.append('greetings', this.homeData.greetings);
    formData.append('name', this.homeData.name);
    formData.append('jobTitle', this.homeData.jobTitle);
    formData.append('nationality', this.homeData.nationality);
    formData.append('description', this.homeData.description);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    if (this.homeData._id) {
      this.homeService.updateHome(this.homeData._id, formData).subscribe(() => {
        this.loadHomeSections();
        this.clearForm();
      });
    } else {
      this.homeService.addHome(formData).subscribe(() => {
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
    this.homeData = { greetings: '', name: '', jobTitle: '', nationality: '', description: '', image: '' };
    this.selectedFile = null;
  }
}
