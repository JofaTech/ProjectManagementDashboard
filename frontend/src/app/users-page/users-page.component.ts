import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { FullUserDto } from '../services/full-user.dto';
import { UserRequestDto } from '../services/user-request.dto';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css']
})
export class UsersPageComponent implements OnInit {

  users: FullUserDto[] = [];
  companyId = 6; // TODO: this needs to be changed 

  showUserOverlay = false;

  userForm!: FormGroup;
  dropdownOpen = false;

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.fetchUsers();
    this.initForm();
  }

  fetchUsers() {
    this.userService.getUsersByCompanyId(this.companyId).subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        console.error('Error fetching users: ', err);
      }
    });
  }

  initForm() {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      adminRole: [null, Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
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
    console.log('Submit called');
    console.log('Form Valid:', this.userForm.valid);
    console.log('Form Value:', this.userForm.value);

    if (this.userForm.valid) {
      const userReq: UserRequestDto = {
        credentials: {
          email: this.userForm.value.email,
          password: this.userForm.value.password
        },
        profile: {
          firstName: this.userForm.value.firstName,
          lastName: this.userForm.value.lastName,
          email: this.userForm.value.email,
          phone: this.userForm.value.phone
        },
        admin: this.userForm.value.adminRole
      };

      this.userService.addUserToCompany(this.companyId, userReq).subscribe({
        next: (newUser) => {
          this.users.push(newUser);
          this.closeAddUser();
          this.userForm.reset();
        },
        error: (err) => {
          console.error('Failed to create user: ', err);
        }
      });
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
