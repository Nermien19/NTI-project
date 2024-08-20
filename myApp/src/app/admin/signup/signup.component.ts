import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onSignup() {
    // Perform signup logic here
    // After successful signup, navigate to the login page
    this.router.navigate(['/admin/home']);
  }
}
