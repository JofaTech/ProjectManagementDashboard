import { Component } from '@angular/core';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css']
})
export class UsersPageComponent {

  // Dummy data for users:
  users = [
    { name: 'Chris Purnell', email: 'yocizzle@gmail.com', active: true, admin: true, status: 'JOINED' },
    { name: 'Kenny Worth', email: 'kmoney@gmail.com', active: true, admin: true, status: 'JOINED' },
    { name: 'Will Marttala', email: 'wamizzle@gmail.com', active: false, admin: false, status: 'PENDING' },
    { name: 'Helena Makendengue', email: 'hmasizzle@gmail.com', active: false, admin: false, status: 'PENDING' },
  ];

  showUserOverlay = false;

  openAddUser() {
    this.showUserOverlay = true;
  }

  closeAddUser() {
    this.showUserOverlay = false;
  }

}
