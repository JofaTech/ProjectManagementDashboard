import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css']
})
export class UsersPageComponent implements OnInit {

  // Dummy data for users:
  users = [
    { name: 'Chris Purnell', email: 'yocizzle@gmail.com', active: true, admin: true, status: 'JOINED' },
    { name: 'Kenny Worth', email: 'kmoney@gmail.com', active: true, admin: true, status: 'JOINED' },
    { name: 'Will Marttala', email: 'wamizzle@gmail.com', active: false, admin: false, status: 'PENDING' },
    { name: 'Helena Makendengue', email: 'hmasizzle@gmail.com', active: false, admin: false, status: 'PENDING' },
  ];

  showUserOverlay = false;

  userForm!: FormGroup;
  dropdownOpen = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      adminRole: [null, Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator = (form: FormGroup) => {
    const pw = form.get('password')!.value;
    const cpw = form.get('confirmPassword')!.value;
    return pw === cpw ? null : { passwordMismatch: true };
  };

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectRole(value: boolean) {
    this.userForm.patchValue({ adminRole: value });
    this.dropdownOpen = false;
  }

  submitNewUser() {
    if (this.userForm.valid) {
      console.log('User data to submit:', this.userForm.value);
      // TODO: connect to backend here later
      this.closeAddUser();
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  // Methods for displaying Modal
  openAddUser() {
    this.showUserOverlay = true;
  }

  closeAddUser() {
    this.showUserOverlay = false;
  }

}
