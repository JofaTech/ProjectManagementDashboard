import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onLogin(): void {
    console.log('Login clicked!');
    console.log('Email: ', this.email);
    console.log('Password: ', this.password);

    // We can use the above email/password and send it to the backend for verification

    this.router.navigate(['/select-company']);
  }
}
