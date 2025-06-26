import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { UserSessionService} from '../services/user-session.service';
import { CredentialsDto } from '../services/credentials.dto';
import { BasicUserDto } from '../services/basic-user.dto';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  email: string = '';
  password: string = '';
  username: string = '';
  private API_URL = 'http://localhost:8080';

  constructor(private router: Router, private http: HttpClient, private userSession: UserSessionService) {}

  onLogin(): void {
    console.log('Login clicked!');
    console.log('Email: ', this.email);
    console.log('Password: ', this.password);

    // We can use the above email/password and send it to the backend for verification

    const credentials: CredentialsDto = {
      email: this.email,
      username: this.username,
      password: this.password
    }

    this.http.post<BasicUserDto>(`${this.API_URL}/users/login`, credentials).subscribe({
      next: (user) =>{
        this.userSession.setUser(user)
        if (user.isAdmin){
          this.router.navigate(['/admin-dashboard']);
        }else{
          this.router.navigate(['/select-company']);
        }

      },
      error: (err) =>{
        console.log('login failed', err)
        alert('invalid email or password, try again')
      }
    })

    
  }
}
