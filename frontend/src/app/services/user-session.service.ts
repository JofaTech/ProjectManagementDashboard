import { Injectable } from '@angular/core';
import { BasicUserDto } from './basic-user.dto';
import { UrlSerializer } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {

  private user: BasicUserDto | null = null;

  constructor() { }

  setUser(user: BasicUserDto): void {
    this.user = user;
  }

  getUser(): BasicUserDto | null {
    return this.user;
  }

  isLoggedIn(): boolean {
    return this.user != null;
  }

  isAdmin(): boolean {
    if (this.user && this.user.admin) {
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    this.user = null;
  }

}
