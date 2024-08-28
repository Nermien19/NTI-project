// src/app/components/login/login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        this.authService.saveToken(response.token);
        this.router.navigate(['/admin']); // Navigate to admin panel
      },
      (error) => {
        this.errorMessage = 'Invalid credentials. Please try again.';
      }
    );
  }

  onSubmit() {
    const loginData = { username: this.username, password: this.password };

    this.authService.login(this.username, this.password).subscribe(
      (response: any) => {
        this.authService.saveToken(response.token);
        this.router.navigate(['/admin-dashboard']); // Redirect to the admin dashboard
      },
      (error) => {
        this.errorMessage = 'Invalid username or password';
      }
    );
}

}
