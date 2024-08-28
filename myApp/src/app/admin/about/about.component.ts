import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AboutService } from '../../services/about.service';
// import { AboutService } from '../../services/about.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent  implements OnInit {
  // aboutData: any = { title: '', subtitle: '', description: '', image: '' };
  // aboutList: any[] = [];

  // constructor(private aboutService: AboutService) {}

  // ngOnInit(): void {
  //   this.loadAboutSections();
  // }

  // loadAboutSections() {
  //   this.aboutService.getAbout().subscribe(data => {
  //     this.aboutList = data;
  //   });
  // }

  // saveAbout() {
  //   if (this.aboutData._id) {
  //     this.aboutService.updateAbout(this.aboutData._id, this.aboutData).subscribe(() => {
  //       this.loadAboutSections();
  //       this.clearForm();
  //     });
  //   } else {
  //     this.aboutService.addAbout(this.aboutData).subscribe(() => {
  //       this.loadAboutSections();
  //       this.clearForm();
  //     });
  //   }
  // }

  // editAbout(about: any) {
  //   this.aboutData = { ...about };
  // }

  // deleteAbout() {
  //   if (this.aboutData._id) {
  //     this.aboutService.deleteAbout(this.aboutData._id).subscribe(() => {
  //       this.loadAboutSections();
  //       this.clearForm();
  //     });
  //   }
  // }

  // clearForm() {
  //   this.aboutData = { title: '', subtitle: '', description: '', image: '' };
  // }


  aboutData: any = { title: '', subtitle: '', description: '', image: '' };
  aboutList: any[] = [];
  selectedFile: File | null = null;

  constructor(private aboutService: AboutService) {}

  ngOnInit(): void {
    this.loadAboutSections();
  }

  loadAboutSections() {
    this.aboutService.getAbout().subscribe(data => {
      this.aboutList = data;
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  saveAbout() {
    const formData = new FormData();
    formData.append('title', this.aboutData.title);
    formData.append('subtitle', this.aboutData.subtitle);
    formData.append('description', this.aboutData.description);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    if (this.aboutData._id) {
      this.aboutService.updateAbout(this.aboutData._id, formData).subscribe(() => {
        this.loadAboutSections();
        this.clearForm();
      });
    } else {
      this.aboutService.addAbout(formData).subscribe(() => {
        this.loadAboutSections();
        this.clearForm();
      });
    }
  }

  editAbout(about: any) {
    this.aboutData = { ...about };
  }

  deleteAbout() {
    if (this.aboutData._id) {
      this.aboutService.deleteAbout(this.aboutData._id).subscribe(() => {
        this.loadAboutSections();
        this.clearForm();
      });
    }
  }

  clearForm() {
    this.aboutData = { title: '', subtitle: '', description: '', image: '' };
    this.selectedFile = null;
  }
}
