import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent  {
  navbarData: any = { home: '', about: '', portfolio: '', skills: '', contact: '' };
  selectedLogo: File | null = null;
  selectedCV: File | null = null;

  constructor(private navbarService: NavbarService) {}

  onLogoSelected(event: any) {
    this.selectedLogo = event.target.files[0] || null;
  }

  onCVSelected(event: any) {
    this.selectedCV = event.target.files[0] || null;
  }

  saveNavbar() {
    const formData = new FormData();

    if (this.selectedLogo) {
      formData.append('logo', this.selectedLogo);
    }
    if (this.selectedCV) {
      formData.append('cv', this.selectedCV);
    }

    // Append the navbar links data
    formData.append('home', this.navbarData.home);
    formData.append('about', this.navbarData.about);
    formData.append('portfolio', this.navbarData.portfolio);
    formData.append('skills', this.navbarData.skills);
    formData.append('contact', this.navbarData.contact);

    // Send the form data to the server
    this.navbarService.updateNavbar(formData).subscribe(response => {
      console.log('Navbar updated successfully:', response);
    }, error => {
      console.error('Error updating navbar:', error);
    });
  }
}
