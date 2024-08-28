import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // email: string = '';
  // password: string = '';
  // errorMessage: string = '';

  // constructor(private http: HttpClient, private router: Router) {}

  // onSubmit() {
  //   const loginData = { email: this.email, password: this.password };

  //   this.http.post('/api/login', loginData).subscribe(
  //     (response: any) => {
  //       localStorage.setItem('token', response.token);
  //       this.router.navigate(['/admin-dashboard']); // Redirect to the admin dashboard
  //     },
  //     (error) => {
  //       this.errorMessage = 'Invalid email or password';
  //     }
  //   );
  // }
}
